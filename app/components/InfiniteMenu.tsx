import { FC, useRef, useState, useEffect, MutableRefObject } from 'react';
import { mat4, quat, vec2, vec3, vec4 } from 'gl-matrix';
import { useRouter } from 'next/navigation';

const discVertShaderSource = `#version 300 es

uniform mat4 uWorldMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform vec3 uCameraPosition;
uniform vec4 uRotationAxisVelocity;

in vec3 aModelPosition;
in vec3 aModelNormal;
in vec2 aModelUvs;
in mat4 aInstanceMatrix;

out vec2 vUvs;
out float vAlpha;
flat out int vInstanceId;

#define PI 3.141593

void main() {
    vec4 worldPosition = uWorldMatrix * aInstanceMatrix * vec4(aModelPosition, 1.);

    vec3 centerPos = (uWorldMatrix * aInstanceMatrix * vec4(0., 0., 0., 1.)).xyz;
    float radius = length(centerPos.xyz);

    if (gl_VertexID > 0) {
        vec3 rotationAxis = uRotationAxisVelocity.xyz;
        float rotationVelocity = min(.15, uRotationAxisVelocity.w * 15.);
        vec3 stretchDir = normalize(cross(centerPos, rotationAxis));
        vec3 relativeVertexPos = normalize(worldPosition.xyz - centerPos);
        float strength = dot(stretchDir, relativeVertexPos);
        float invAbsStrength = min(0., abs(strength) - 1.);
        strength = rotationVelocity * sign(strength) * abs(invAbsStrength * invAbsStrength * invAbsStrength + 1.);
        worldPosition.xyz += stretchDir * strength;
    }

    worldPosition.xyz = radius * normalize(worldPosition.xyz);

    gl_Position = uProjectionMatrix * uViewMatrix * worldPosition;

    vAlpha = smoothstep(0.5, 1., normalize(worldPosition.xyz).z) * .9 + .1;
    vUvs = aModelUvs;
    vInstanceId = gl_InstanceID;
}
`;

const discFragShaderSource = `#version 300 es
precision highp float;

uniform sampler2D uTex;
uniform sampler2D uTextTex;
uniform int uItemCount;
uniform int uAtlasSize;
uniform bool uShowText;

out vec4 outColor;

in vec2 vUvs;
in float vAlpha;
flat in int vInstanceId;

void main() {
    int itemIndex = vInstanceId % uItemCount;
    int cellsPerRow = uAtlasSize;
    int maxCells = cellsPerRow * cellsPerRow;
    itemIndex = min(itemIndex, maxCells - 1); // Clamp to last cell if overflow
    int cellX = itemIndex % cellsPerRow;
    int cellY = itemIndex / cellsPerRow;
    vec2 cellSize = vec2(1.0) / vec2(float(cellsPerRow));
    vec2 cellOffset = vec2(float(cellX), float(cellY)) * cellSize;

    ivec2 texSize = textureSize(uTex, 0);
    float imageAspect = float(texSize.x) / float(texSize.y);
    float containerAspect = 1.0;
    
    float scale = max(imageAspect / containerAspect, 
                     containerAspect / imageAspect);
    
    vec2 st = vec2(vUvs.x, 1.0 - vUvs.y);
    st = (st - 0.5) * scale + 0.5;
    
    st = clamp(st, 0.0, 1.0);
    st = st * cellSize + cellOffset;
    
    vec4 imageColor = texture(uTex, st);
    
    // Add text overlay if enabled
    if (uShowText) {
        // Create a circular mask for the text that covers the whole bubble
        vec2 center = vec2(0.5, 0.5);
        vec2 uv = vUvs - center;
        float dist = length(uv);
        float circleMask = smoothstep(0.7, 0.6, dist);
        
        if (circleMask > 0.0) {
            // Use the same atlas coordinates for text texture, but flip Y coordinate
            vec2 textSt = vec2(vUvs.x, 1.0 - vUvs.y) * cellSize + cellOffset;
            vec4 textColor = texture(uTextTex, textSt);
            
            // Blend text over image with circular mask
            if (textColor.a > 0.1) {
                imageColor = mix(imageColor, textColor, textColor.a * circleMask * 0.8);
            }
        }
    }
    
    outColor = imageColor;
    outColor.a *= vAlpha;
}
`;

class Face {
	public a: number;
	public b: number;
	public c: number;

	constructor(a: number, b: number, c: number) {
		this.a = a;
		this.b = b;
		this.c = c;
	}
}

class Vertex {
	public position: vec3;
	public normal: vec3;
	public uv: vec2;

	constructor(x: number, y: number, z: number) {
		this.position = vec3.fromValues(x, y, z);
		this.normal = vec3.create();
		this.uv = vec2.create();
	}
}

class Geometry {
	public vertices: Vertex[];
	public faces: Face[];

	constructor() {
		this.vertices = [];
		this.faces = [];
	}

	public addVertex(...args: number[]): this {
		for (let i = 0; i < args.length; i += 3) {
			this.vertices.push(new Vertex(args[i], args[i + 1], args[i + 2]));
		}
		return this;
	}

	public addFace(...args: number[]): this {
		for (let i = 0; i < args.length; i += 3) {
			this.faces.push(new Face(args[i], args[i + 1], args[i + 2]));
		}
		return this;
	}

	public get lastVertex(): Vertex {
		return this.vertices[this.vertices.length - 1];
	}

	public subdivide(divisions = 1): this {
		const midPointCache: Record<string, number> = {};
		let f = this.faces;

		for (let div = 0; div < divisions; ++div) {
			const newFaces = new Array<Face>(f.length * 4);

			f.forEach((face, ndx) => {
				const mAB = this.getMidPoint(face.a, face.b, midPointCache);
				const mBC = this.getMidPoint(face.b, face.c, midPointCache);
				const mCA = this.getMidPoint(face.c, face.a, midPointCache);

				const i = ndx * 4;
				newFaces[i + 0] = new Face(face.a, mAB, mCA);
				newFaces[i + 1] = new Face(face.b, mBC, mAB);
				newFaces[i + 2] = new Face(face.c, mCA, mBC);
				newFaces[i + 3] = new Face(mAB, mBC, mCA);
			});

			f = newFaces;
		}

		this.faces = f;
		return this;
	}

	public spherize(radius = 1): this {
		this.vertices.forEach((vertex) => {
			vec3.normalize(vertex.normal, vertex.position);
			vec3.scale(vertex.position, vertex.normal, radius);
		});
		return this;
	}

	public get data(): {
		vertices: Float32Array;
		indices: Uint16Array;
		normals: Float32Array;
		uvs: Float32Array;
	} {
		return {
			vertices: this.vertexData,
			indices: this.indexData,
			normals: this.normalData,
			uvs: this.uvData,
		};
	}

	public get vertexData(): Float32Array {
		return new Float32Array(this.vertices.flatMap((v) => Array.from(v.position)));
	}

	public get normalData(): Float32Array {
		return new Float32Array(this.vertices.flatMap((v) => Array.from(v.normal)));
	}

	public get uvData(): Float32Array {
		return new Float32Array(this.vertices.flatMap((v) => Array.from(v.uv)));
	}

	public get indexData(): Uint16Array {
		return new Uint16Array(this.faces.flatMap((f) => [f.a, f.b, f.c]));
	}

	public getMidPoint(ndxA: number, ndxB: number, cache: Record<string, number>): number {
		const cacheKey = ndxA < ndxB ? `k_${ndxB}_${ndxA}` : `k_${ndxA}_${ndxB}`;
		if (Object.prototype.hasOwnProperty.call(cache, cacheKey)) {
			return cache[cacheKey];
		}
		const a = this.vertices[ndxA].position;
		const b = this.vertices[ndxB].position;
		const ndx = this.vertices.length;
		cache[cacheKey] = ndx;
		this.addVertex((a[0] + b[0]) * 0.5, (a[1] + b[1]) * 0.5, (a[2] + b[2]) * 0.5);
		return ndx;
	}
}

class IcosahedronGeometry extends Geometry {
	constructor() {
		super();
		const t = Math.sqrt(5) * 0.5 + 0.5;
		this.addVertex(
			-1,
			t,
			0,
			1,
			t,
			0,
			-1,
			-t,
			0,
			1,
			-t,
			0,
			0,
			-1,
			t,
			0,
			1,
			t,
			0,
			-1,
			-t,
			0,
			1,
			-t,
			t,
			0,
			-1,
			t,
			0,
			1,
			-t,
			0,
			-1,
			-t,
			0,
			1
		).addFace(
			0,
			11,
			5,
			0,
			5,
			1,
			0,
			1,
			7,
			0,
			7,
			10,
			0,
			10,
			11,
			1,
			5,
			9,
			5,
			11,
			4,
			11,
			10,
			2,
			10,
			7,
			6,
			7,
			1,
			8,
			3,
			9,
			4,
			3,
			4,
			2,
			3,
			2,
			6,
			3,
			6,
			8,
			3,
			8,
			9,
			4,
			9,
			5,
			2,
			4,
			11,
			6,
			2,
			10,
			8,
			6,
			7,
			9,
			8,
			1
		);
	}
}

class DiscGeometry extends Geometry {
	constructor(steps = 4, radius = 1) {
		super();
		const safeSteps = Math.max(4, steps);
		const alpha = (2 * Math.PI) / safeSteps;

		this.addVertex(0, 0, 0);
		this.lastVertex.uv[0] = 0.5;
		this.lastVertex.uv[1] = 0.5;

		for (let i = 0; i < safeSteps; ++i) {
			const x = Math.cos(alpha * i);
			const y = Math.sin(alpha * i);
			this.addVertex(radius * x, radius * y, 0);
			this.lastVertex.uv[0] = x * 0.5 + 0.5;
			this.lastVertex.uv[1] = y * 0.5 + 0.5;

			if (i > 0) {
				this.addFace(0, i, i + 1);
			}
		}
		this.addFace(0, safeSteps, 1);
	}
}

function createShader(
	gl: WebGL2RenderingContext,
	type: number,
	source: string
): WebGLShader | null {
	const shader = gl.createShader(type);
	if (!shader) return null;
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

	if (success) {
		return shader;
	}

	console.error(gl.getShaderInfoLog(shader));
	gl.deleteShader(shader);
	return null;
}

function createProgram(
	gl: WebGL2RenderingContext,
	shaderSources: [string, string],
	transformFeedbackVaryings?: string[] | null,
	attribLocations?: Record<string, number>
): WebGLProgram | null {
	const program = gl.createProgram();
	if (!program) return null;

	[gl.VERTEX_SHADER, gl.FRAGMENT_SHADER].forEach((type, ndx) => {
		const shader = createShader(gl, type, shaderSources[ndx]);
		if (shader) {
			gl.attachShader(program, shader);
		}
	});

	if (transformFeedbackVaryings) {
		gl.transformFeedbackVaryings(program, transformFeedbackVaryings, gl.SEPARATE_ATTRIBS);
	}

	if (attribLocations) {
		for (const attrib in attribLocations) {
			if (Object.prototype.hasOwnProperty.call(attribLocations, attrib)) {
				gl.bindAttribLocation(program, attribLocations[attrib], attrib);
			}
		}
	}

	gl.linkProgram(program);
	const success = gl.getProgramParameter(program, gl.LINK_STATUS);

	if (success) {
		return program;
	}

	console.error(gl.getProgramInfoLog(program));
	gl.deleteProgram(program);
	return null;
}

function makeVertexArray(
	gl: WebGL2RenderingContext,
	bufLocNumElmPairs: Array<[WebGLBuffer, number, number]>,
	indices?: Uint16Array
): WebGLVertexArrayObject | null {
	const va = gl.createVertexArray();
	if (!va) return null;

	gl.bindVertexArray(va);

	for (const [buffer, loc, numElem] of bufLocNumElmPairs) {
		if (loc === -1) continue;
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.enableVertexAttribArray(loc);
		gl.vertexAttribPointer(loc, numElem, gl.FLOAT, false, 0, 0);
	}

	if (indices) {
		const indexBuffer = gl.createBuffer();
		if (indexBuffer) {
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
		}
	}

	gl.bindVertexArray(null);
	return va;
}

function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement): boolean {
	const dpr = Math.min(2, window.devicePixelRatio || 1);
	const displayWidth = Math.round(canvas.clientWidth * dpr);
	const displayHeight = Math.round(canvas.clientHeight * dpr);
	const needResize = canvas.width !== displayWidth || canvas.height !== displayHeight;
	if (needResize) {
		canvas.width = displayWidth;
		canvas.height = displayHeight;
	}
	return needResize;
}

function makeBuffer(
	gl: WebGL2RenderingContext,
	sizeOrData: number | ArrayBufferView,
	usage: number
): WebGLBuffer {
	const buf = gl.createBuffer();
	if (!buf) {
		throw new Error('Failed to create WebGL buffer.');
	}
	gl.bindBuffer(gl.ARRAY_BUFFER, buf);

	if (typeof sizeOrData === 'number') {
		gl.bufferData(gl.ARRAY_BUFFER, sizeOrData, usage);
	} else {
		gl.bufferData(gl.ARRAY_BUFFER, sizeOrData, usage);
	}

	gl.bindBuffer(gl.ARRAY_BUFFER, null);
	return buf;
}

function createAndSetupTexture(
	gl: WebGL2RenderingContext,
	minFilter: number,
	magFilter: number,
	wrapS: number,
	wrapT: number
): WebGLTexture {
	const texture = gl.createTexture();
	if (!texture) {
		throw new Error('Failed to create WebGL texture.');
	}
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
	return texture;
}

type UpdateCallback = (deltaTime: number) => void;

class ArcballControl {
	private canvas: HTMLCanvasElement;
	private updateCallback: UpdateCallback;

	public isPointerDown = false;
	public orientation = quat.create();
	public pointerRotation = quat.create();
	public rotationVelocity = 0;
	public rotationAxis = vec3.fromValues(1, 0, 0);

	public snapDirection = vec3.fromValues(0, 0, -1);
	public snapTargetDirection: vec3 | null = null;

	private pointerPos = vec2.create();
	private previousPointerPos = vec2.create();
	private _rotationVelocity = 0;
	private _combinedQuat = quat.create();

	private readonly EPSILON = 0.1;
	private readonly IDENTITY_QUAT = quat.create();

	constructor(canvas: HTMLCanvasElement, updateCallback?: UpdateCallback) {
		this.canvas = canvas;
		this.updateCallback = updateCallback || (() => undefined);

		canvas.addEventListener('pointerdown', (e: PointerEvent) => {
			vec2.set(this.pointerPos, e.clientX, e.clientY);
			vec2.copy(this.previousPointerPos, this.pointerPos);
			this.isPointerDown = true;
		});
		canvas.addEventListener('pointerup', () => {
			this.isPointerDown = false;
		});
		canvas.addEventListener('pointerleave', () => {
			this.isPointerDown = false;
		});
		canvas.addEventListener('pointermove', (e: PointerEvent) => {
			if (this.isPointerDown) {
				vec2.set(this.pointerPos, e.clientX, e.clientY);
			}
		});
		canvas.style.touchAction = 'none';
	}

	public update(deltaTime: number, targetFrameDuration = 16): void {
		const timeScale = deltaTime / targetFrameDuration + 0.00001;
		let angleFactor = timeScale;
		const snapRotation = quat.create();

		if (this.isPointerDown) {
			const INTENSITY = 0.3 * timeScale;
			const ANGLE_AMPLIFICATION = 5 / timeScale;
			const midPointerPos = vec2.sub(vec2.create(), this.pointerPos, this.previousPointerPos);
			vec2.scale(midPointerPos, midPointerPos, INTENSITY);

			if (vec2.sqrLen(midPointerPos) > this.EPSILON) {
				vec2.add(midPointerPos, this.previousPointerPos, midPointerPos);

				const p = this.project(midPointerPos);
				const q = this.project(this.previousPointerPos);
				const a = vec3.normalize(vec3.create(), p);
				const b = vec3.normalize(vec3.create(), q);

				vec2.copy(this.previousPointerPos, midPointerPos);

				angleFactor *= ANGLE_AMPLIFICATION;

				this.quatFromVectors(a, b, this.pointerRotation, angleFactor);
			} else {
				quat.slerp(
					this.pointerRotation,
					this.pointerRotation,
					this.IDENTITY_QUAT,
					INTENSITY
				);
			}
		} else {
			const INTENSITY = 0.1 * timeScale;
			quat.slerp(this.pointerRotation, this.pointerRotation, this.IDENTITY_QUAT, INTENSITY);

			if (this.snapTargetDirection) {
				const SNAPPING_INTENSITY = 0.2;
				const a = this.snapTargetDirection;
				const b = this.snapDirection;
				const sqrDist = vec3.squaredDistance(a, b);
				const distanceFactor = Math.max(0.1, 1 - sqrDist * 10);
				angleFactor *= SNAPPING_INTENSITY * distanceFactor;
				this.quatFromVectors(a, b, snapRotation, angleFactor);
			}
		}

		const combinedQuat = quat.multiply(quat.create(), snapRotation, this.pointerRotation);
		this.orientation = quat.multiply(quat.create(), combinedQuat, this.orientation);
		quat.normalize(this.orientation, this.orientation);

		const RA_INTENSITY = 0.8 * timeScale;
		quat.slerp(this._combinedQuat, this._combinedQuat, combinedQuat, RA_INTENSITY);
		quat.normalize(this._combinedQuat, this._combinedQuat);

		const rad = Math.acos(this._combinedQuat[3]) * 2.0;
		const s = Math.sin(rad / 2.0);
		let rv = 0;
		if (s > 0.000001) {
			rv = rad / (2 * Math.PI);
			this.rotationAxis[0] = this._combinedQuat[0] / s;
			this.rotationAxis[1] = this._combinedQuat[1] / s;
			this.rotationAxis[2] = this._combinedQuat[2] / s;
		}

		const RV_INTENSITY = 0.5 * timeScale;
		this._rotationVelocity += (rv - this._rotationVelocity) * RV_INTENSITY;
		this.rotationVelocity = this._rotationVelocity / timeScale;

		this.updateCallback(deltaTime);
	}

	private quatFromVectors(
		a: vec3,
		b: vec3,
		out: quat,
		angleFactor = 1
	): { q: quat; axis: vec3; angle: number } {
		const axis = vec3.cross(vec3.create(), a, b);
		vec3.normalize(axis, axis);
		const d = Math.max(-1, Math.min(1, vec3.dot(a, b)));
		const angle = Math.acos(d) * angleFactor;
		quat.setAxisAngle(out, axis, angle);
		return { q: out, axis, angle };
	}

	private project(pos: vec2): vec3 {
		const r = 2;
		const w = this.canvas.clientWidth;
		const h = this.canvas.clientHeight;
		const s = Math.max(w, h) - 1;

		const x = (2 * pos[0] - w - 1) / s;
		const y = (2 * pos[1] - h - 1) / s;
		let z = 0;
		const xySq = x * x + y * y;
		const rSq = r * r;

		if (xySq <= rSq / 2.0) {
			z = Math.sqrt(rSq - xySq);
		} else {
			z = rSq / Math.sqrt(xySq);
		}
		return vec3.fromValues(-x, y, z);
	}
}

interface MenuItem {
	image: string;
	link: string;
	title: string;
	description: string;
	technologies?: string[];
	slug?: string;
}

type ActiveItemCallback = (index: number) => void;
type MovementChangeCallback = (isMoving: boolean) => void;
type InitCallback = (instance: InfiniteGridMenu) => void;

interface Camera {
	matrix: mat4;
	near: number;
	far: number;
	fov: number;
	aspect: number;
	position: vec3;
	up: vec3;
	matrices: {
		view: mat4;
		projection: mat4;
		inversProjection: mat4;
	};
}

class InfiniteGridMenu {
	private gl: WebGL2RenderingContext | null = null;
	private discProgram: WebGLProgram | null = null;
	private discVAO: WebGLVertexArrayObject | null = null;
	private discBuffers!: {
		vertices: Float32Array;
		indices: Uint16Array;
		normals: Float32Array;
		uvs: Float32Array;
	};
	private icoGeo!: IcosahedronGeometry;
	private discGeo!: DiscGeometry;
	private worldMatrix = mat4.create();
	private tex: WebGLTexture | null = null;
	private textTex: WebGLTexture | null = null;
	public control!: ArcballControl;

	private discLocations!: {
		aModelPosition: number;
		aModelUvs: number;
		aInstanceMatrix: number;
		uWorldMatrix: WebGLUniformLocation | null;
		uViewMatrix: WebGLUniformLocation | null;
		uProjectionMatrix: WebGLUniformLocation | null;
		uCameraPosition: WebGLUniformLocation | null;
		uScaleFactor: WebGLUniformLocation | null;
		uRotationAxisVelocity: WebGLUniformLocation | null;
		uTex: WebGLUniformLocation | null;
		uTextTex: WebGLUniformLocation | null;
		uFrames: WebGLUniformLocation | null;
		uItemCount: WebGLUniformLocation | null;
		uAtlasSize: WebGLUniformLocation | null;
		uShowText: WebGLUniformLocation | null;
	};

	private viewportSize = vec2.create();
	private drawBufferSize = vec2.create();

	private discInstances!: {
		matricesArray: Float32Array;
		matrices: Float32Array[];
		buffer: WebGLBuffer | null;
	};

	private instancePositions: vec3[] = [];
	private DISC_INSTANCE_COUNT = 0;
	private atlasSize = 1;

	private _time = 0;
	private _deltaTime = 0;
	private _deltaFrames = 0;
	private _frames = 0;

	private movementActive = false;

	private TARGET_FRAME_DURATION = 1000 / 60;
	private SPHERE_RADIUS = 2;

	public camera: Camera = {
		matrix: mat4.create(),
		near: 0.1,
		far: 40,
		fov: Math.PI / 4,
		aspect: 1,
		position: vec3.fromValues(0, 0, 3),
		up: vec3.fromValues(0, 1, 0),
		matrices: {
			view: mat4.create(),
			projection: mat4.create(),
			inversProjection: mat4.create(),
		},
	};

	public smoothRotationVelocity = 0;
	public scaleFactor = 1.0;

	constructor(
		private canvas: HTMLCanvasElement,
		private items: MenuItem[],
		private onActiveItemChange: ActiveItemCallback,
		private onMovementChange: MovementChangeCallback,
		onInit?: InitCallback
	) {
		this.init(onInit);
	}

	public resize(): void {
		const needsResize = resizeCanvasToDisplaySize(this.canvas);
		if (!this.gl) return;
		if (needsResize) {
			this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
		}
		this.updateProjectionMatrix();
	}

	public run(time = 0): void {
		this._deltaTime = Math.min(32, time - this._time);
		this._time = time;
		this._deltaFrames = this._deltaTime / this.TARGET_FRAME_DURATION;
		this._frames += this._deltaFrames;

		this.animate(this._deltaTime);
		this.render();

		requestAnimationFrame((t) => this.run(t));
	}

	private init(onInit?: InitCallback): void {
		const gl = this.canvas.getContext('webgl2', {
			antialias: true,
			alpha: true,
		});
		if (!gl) {
			throw new Error('No WebGL 2 context!');
		}
		this.gl = gl;

		vec2.set(this.viewportSize, this.canvas.clientWidth, this.canvas.clientHeight);
		vec2.clone(this.drawBufferSize);

		this.discProgram = createProgram(gl, [discVertShaderSource, discFragShaderSource], null, {
			aModelPosition: 0,
			aModelNormal: 1,
			aModelUvs: 2,
			aInstanceMatrix: 3,
		});

		this.discLocations = {
			aModelPosition: gl.getAttribLocation(this.discProgram!, 'aModelPosition'),
			aModelUvs: gl.getAttribLocation(this.discProgram!, 'aModelUvs'),
			aInstanceMatrix: gl.getAttribLocation(this.discProgram!, 'aInstanceMatrix'),
			uWorldMatrix: gl.getUniformLocation(this.discProgram!, 'uWorldMatrix'),
			uViewMatrix: gl.getUniformLocation(this.discProgram!, 'uViewMatrix'),
			uProjectionMatrix: gl.getUniformLocation(this.discProgram!, 'uProjectionMatrix'),
			uCameraPosition: gl.getUniformLocation(this.discProgram!, 'uCameraPosition'),
			uScaleFactor: gl.getUniformLocation(this.discProgram!, 'uScaleFactor'),
			uRotationAxisVelocity: gl.getUniformLocation(
				this.discProgram!,
				'uRotationAxisVelocity'
			),
			uTex: gl.getUniformLocation(this.discProgram!, 'uTex'),
			uTextTex: gl.getUniformLocation(this.discProgram!, 'uTextTex'),
			uFrames: gl.getUniformLocation(this.discProgram!, 'uFrames'),
			uItemCount: gl.getUniformLocation(this.discProgram!, 'uItemCount'),
			uAtlasSize: gl.getUniformLocation(this.discProgram!, 'uAtlasSize'),
			uShowText: gl.getUniformLocation(this.discProgram!, 'uShowText'),
		};

		this.discGeo = new DiscGeometry(56, 1);
		this.discBuffers = this.discGeo.data;
		this.discVAO = makeVertexArray(
			gl,
			[
				[
					makeBuffer(gl, this.discBuffers.vertices, gl.STATIC_DRAW),
					this.discLocations.aModelPosition,
					3,
				],
				[
					makeBuffer(gl, this.discBuffers.uvs, gl.STATIC_DRAW),
					this.discLocations.aModelUvs,
					2,
				],
			],
			this.discBuffers.indices
		);

		this.icoGeo = new IcosahedronGeometry();
		this.icoGeo.subdivide(1).spherize(this.SPHERE_RADIUS);
		this.instancePositions = this.icoGeo.vertices.map((v) => v.position);
		this.DISC_INSTANCE_COUNT = this.icoGeo.vertices.length;
		this.initDiscInstances(this.DISC_INSTANCE_COUNT);
		this.initTexture();
		this.control = new ArcballControl(this.canvas, (deltaTime) =>
			this.onControlUpdate(deltaTime)
		);

		this.updateCameraMatrix();
		this.updateProjectionMatrix();

		this.resize();

		if (onInit) {
			onInit(this);
		}
	}

	private initTexture(): void {
		if (!this.gl) return;
		const gl = this.gl;
		this.tex = createAndSetupTexture(
			gl,
			gl.LINEAR,
			gl.LINEAR,
			gl.CLAMP_TO_EDGE,
			gl.CLAMP_TO_EDGE
		);

		this.textTex = createAndSetupTexture(
			gl,
			gl.LINEAR,
			gl.LINEAR,
			gl.CLAMP_TO_EDGE,
			gl.CLAMP_TO_EDGE
		);

		const itemCount = Math.max(1, this.items.length);

		// Limit atlas size to prevent WebGL texture size issues
		// Most devices support up to 2048x2048 textures safely
		const maxAtlasSize = 4; // 4x4 grid = 16 items max per atlas
		this.atlasSize = Math.min(Math.ceil(Math.sqrt(itemCount)), maxAtlasSize);

		const cellSize = 512;
		const maxTextureSize = this.atlasSize * cellSize;

		// Ensure we don't exceed WebGL texture limits
		const maxSupportedSize = Math.min(2048, gl.getParameter(gl.MAX_TEXTURE_SIZE));
		if (maxTextureSize > maxSupportedSize) {
			// Reduce cell size if needed
			const adjustedCellSize = Math.floor(maxSupportedSize / this.atlasSize);
			const cellSize = Math.max(256, adjustedCellSize); // Minimum 256px
		}

		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d')!;
		canvas.width = this.atlasSize * cellSize;
		canvas.height = this.atlasSize * cellSize;

		// Create text texture canvas
		const textCanvas = document.createElement('canvas');
		const textCtx = textCanvas.getContext('2d')!;
		textCanvas.width = this.atlasSize * cellSize;
		textCanvas.height = this.atlasSize * cellSize;

		Promise.all(
			this.items.map(
				(item) =>
					new Promise<HTMLImageElement>((resolve) => {
						const img = new Image();
						img.crossOrigin = 'anonymous';
						img.onload = () => resolve(img);
						img.onerror = () => {
							// Fallback to a default image if loading fails
							const fallbackImg = new Image();
							fallbackImg.onload = () => resolve(fallbackImg);
							fallbackImg.src =
								'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiBmaWxsPSIjMzMzMzMzIi8+Cjx0ZXh0IHg9IjI1NiIgeT0iMjU2IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2U8L3RleHQ+Cjwvc3ZnPgo=';
						};
						img.src = item.image;
					})
			)
		).then((images) => {
			images.forEach((img, i) => {
				const x = (i % this.atlasSize) * cellSize;
				const y = Math.floor(i / this.atlasSize) * cellSize;

				// Calculate aspect ratios for object-cover behavior
				const imgAspect = img.width / img.height;
				const cellAspect = 1; // 1:1 aspect ratio

				let drawWidth, drawHeight, drawX, drawY;

				if (imgAspect > cellAspect) {
					// Image is wider than cell - fit to height, crop width
					drawHeight = cellSize;
					drawWidth = cellSize * imgAspect;
					drawX = x - (drawWidth - cellSize) / 2;
					drawY = y;
				} else {
					// Image is taller than cell - fit to width, crop height
					drawWidth = cellSize;
					drawHeight = cellSize / imgAspect;
					drawX = x;
					drawY = y - (drawHeight - cellSize) / 2;
				}

				// Create a temporary canvas for this cell to handle clipping
				const tempCanvas = document.createElement('canvas');
				const tempCtx = tempCanvas.getContext('2d')!;
				tempCanvas.width = cellSize;
				tempCanvas.height = cellSize;

				// Draw the image with object-cover behavior on temp canvas
				tempCtx.drawImage(img, drawX - x, drawY - y, drawWidth, drawHeight);

				// Add dark overlay for better text readability
				tempCtx.fillStyle = 'rgba(0, 0, 0, 0.4)'; // 40% black overlay
				tempCtx.fillRect(0, 0, cellSize, cellSize);

				// Draw the temp canvas to the main canvas at the correct position
				ctx.drawImage(tempCanvas, x, y);

				// Create text overlay for this cell
				const textTempCanvas = document.createElement('canvas');
				const textTempCtx = textTempCanvas.getContext('2d')!;
				textTempCanvas.width = cellSize;
				textTempCanvas.height = cellSize;

				// Set text style
				textTempCtx.fillStyle = 'rgba(0, 0, 0, 0.7)';
				textTempCtx.fillRect(0, 0, cellSize, cellSize);

				// Add project number text
				textTempCtx.fillStyle = 'rgba(255, 255, 255, 0.9)';
				textTempCtx.font = 'bold 96px Figtree, Arial, sans-serif';
				textTempCtx.textAlign = 'center';
				textTempCtx.textBaseline = 'middle';

				const projectNumber = (i + 1).toString();
				textTempCtx.fillText(projectNumber, cellSize / 2, cellSize / 2);

				// Draw text to text canvas
				textCtx.drawImage(textTempCanvas, x, y);
			});

			gl.bindTexture(gl.TEXTURE_2D, this.tex);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
			gl.generateMipmap(gl.TEXTURE_2D);

			gl.bindTexture(gl.TEXTURE_2D, this.textTex);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textCanvas);
			gl.generateMipmap(gl.TEXTURE_2D);
		});
	}

	private initDiscInstances(count: number): void {
		if (!this.gl || !this.discVAO) return;
		const gl = this.gl;

		const matricesArray = new Float32Array(count * 16);
		const matrices: Float32Array[] = [];
		for (let i = 0; i < count; ++i) {
			const instanceMatrixArray = new Float32Array(matricesArray.buffer, i * 16 * 4, 16);
			mat4.identity(instanceMatrixArray as unknown as mat4);
			matrices.push(instanceMatrixArray);
		}

		this.discInstances = {
			matricesArray,
			matrices,
			buffer: gl.createBuffer(),
		};

		gl.bindVertexArray(this.discVAO);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.discInstances.buffer);
		gl.bufferData(
			gl.ARRAY_BUFFER,
			this.discInstances.matricesArray.byteLength,
			gl.DYNAMIC_DRAW
		);

		const mat4AttribSlotCount = 4;
		const bytesPerMatrix = 16 * 4;
		for (let j = 0; j < mat4AttribSlotCount; ++j) {
			const loc = this.discLocations.aInstanceMatrix + j;
			gl.enableVertexAttribArray(loc);
			gl.vertexAttribPointer(loc, 4, gl.FLOAT, false, bytesPerMatrix, j * 4 * 4);
			gl.vertexAttribDivisor(loc, 1);
		}
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		gl.bindVertexArray(null);
	}

	private animate(deltaTime: number): void {
		if (!this.gl) return;
		this.control.update(deltaTime, this.TARGET_FRAME_DURATION);

		const positions = this.instancePositions.map((p) =>
			vec3.transformQuat(vec3.create(), p, this.control.orientation)
		);
		const scale = 0.25;
		const SCALE_INTENSITY = 0.6;

		positions.forEach((p, ndx) => {
			const s =
				(Math.abs(p[2]) / this.SPHERE_RADIUS) * SCALE_INTENSITY + (1 - SCALE_INTENSITY);
			const finalScale = s * scale;
			const matrix = mat4.create();

			mat4.multiply(
				matrix,
				matrix,
				mat4.fromTranslation(mat4.create(), vec3.negate(vec3.create(), p))
			);
			mat4.multiply(matrix, matrix, mat4.targetTo(mat4.create(), [0, 0, 0], p, [0, 1, 0]));
			mat4.multiply(
				matrix,
				matrix,
				mat4.fromScaling(mat4.create(), [finalScale, finalScale, finalScale])
			);
			mat4.multiply(
				matrix,
				matrix,
				mat4.fromTranslation(mat4.create(), [0, 0, -this.SPHERE_RADIUS])
			);

			mat4.copy(this.discInstances.matrices[ndx], matrix);
		});

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.discInstances.buffer);
		this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, this.discInstances.matricesArray);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

		this.smoothRotationVelocity = this.control.rotationVelocity;
	}

	private render(): void {
		if (!this.gl || !this.discProgram) return;
		const gl = this.gl;

		gl.useProgram(this.discProgram);
		gl.enable(gl.CULL_FACE);
		gl.enable(gl.DEPTH_TEST);
		gl.enable(gl.BLEND);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

		gl.clearColor(0, 0, 0, 0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		gl.uniformMatrix4fv(this.discLocations.uWorldMatrix, false, this.worldMatrix);
		gl.uniformMatrix4fv(this.discLocations.uViewMatrix, false, this.camera.matrices.view);
		gl.uniformMatrix4fv(
			this.discLocations.uProjectionMatrix,
			false,
			this.camera.matrices.projection
		);
		gl.uniform3f(
			this.discLocations.uCameraPosition,
			this.camera.position[0],
			this.camera.position[1],
			this.camera.position[2]
		);
		gl.uniform4f(
			this.discLocations.uRotationAxisVelocity,
			this.control.rotationAxis[0],
			this.control.rotationAxis[1],
			this.control.rotationAxis[2],
			this.smoothRotationVelocity * 1.1
		);

		gl.uniform1i(this.discLocations.uItemCount, this.items.length);
		gl.uniform1i(this.discLocations.uAtlasSize, this.atlasSize);

		gl.uniform1f(this.discLocations.uFrames, this._frames);
		gl.uniform1f(this.discLocations.uScaleFactor, this.scaleFactor);

		// Show text only when moving
		gl.uniform1i(this.discLocations.uShowText, this.movementActive ? 1 : 0);

		gl.uniform1i(this.discLocations.uTex, 0);
		gl.uniform1i(this.discLocations.uTextTex, 1);
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, this.tex);
		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_2D, this.textTex);

		gl.bindVertexArray(this.discVAO);
		gl.drawElementsInstanced(
			gl.TRIANGLES,
			this.discBuffers.indices.length,
			gl.UNSIGNED_SHORT,
			0,
			this.DISC_INSTANCE_COUNT
		);
		gl.bindVertexArray(null);
	}

	private updateCameraMatrix(): void {
		mat4.targetTo(this.camera.matrix, this.camera.position, [0, 0, 0], this.camera.up);
		mat4.invert(this.camera.matrices.view, this.camera.matrix);
	}

	private updateProjectionMatrix(): void {
		if (!this.gl) return;
		const canvasEl = this.gl.canvas as HTMLCanvasElement;
		this.camera.aspect = canvasEl.clientWidth / canvasEl.clientHeight;
		const height = this.SPHERE_RADIUS * 0.35;
		const distance = this.camera.position[2];
		if (this.camera.aspect > 1) {
			this.camera.fov = 2 * Math.atan(height / distance);
		} else {
			this.camera.fov = 2 * Math.atan(height / this.camera.aspect / distance);
		}
		mat4.perspective(
			this.camera.matrices.projection,
			this.camera.fov,
			this.camera.aspect,
			this.camera.near,
			this.camera.far
		);
		mat4.invert(this.camera.matrices.inversProjection, this.camera.matrices.projection);
	}

	private onControlUpdate(deltaTime: number): void {
		const timeScale = deltaTime / this.TARGET_FRAME_DURATION + 0.0001;
		let damping = 5 / timeScale;
		let cameraTargetZ = 3;

		const isMoving = this.control.isPointerDown || Math.abs(this.smoothRotationVelocity) > 0.01;

		if (isMoving !== this.movementActive) {
			this.movementActive = isMoving;
			this.onMovementChange(isMoving);
		}

		if (!this.control.isPointerDown) {
			const nearestVertexIndex = this.findNearestVertexIndex();
			const itemIndex = nearestVertexIndex % Math.max(1, this.items.length);
			this.onActiveItemChange(itemIndex);
			const snapDirection = vec3.normalize(
				vec3.create(),
				this.getVertexWorldPosition(nearestVertexIndex)
			);
			this.control.snapTargetDirection = snapDirection;
		} else {
			cameraTargetZ += this.control.rotationVelocity * 80 + 2.5;
			damping = 7 / timeScale;
		}

		this.camera.position[2] += (cameraTargetZ - this.camera.position[2]) / damping;
		this.updateCameraMatrix();
	}

	public findNearestVertexIndex(): number {
		const n = this.control.snapDirection;
		const inversOrientation = quat.conjugate(quat.create(), this.control.orientation);
		const nt = vec3.transformQuat(vec3.create(), n, inversOrientation);

		let maxD = -1;
		let nearestVertexIndex = 0;
		for (let i = 0; i < this.instancePositions.length; ++i) {
			const d = vec3.dot(nt, this.instancePositions[i]);
			if (d > maxD) {
				maxD = d;
				nearestVertexIndex = i;
			}
		}
		return nearestVertexIndex;
	}

	private getVertexWorldPosition(index: number): vec3 {
		const nearestVertexPos = this.instancePositions[index];
		return vec3.transformQuat(vec3.create(), nearestVertexPos, this.control.orientation);
	}
}

const defaultItems: MenuItem[] = [
	{
		image: 'https://picsum.photos/900/900?grayscale',
		link: 'https://google.com/',
		title: 'Sample Project',
		description:
			'A beautiful and innovative web application showcasing modern design principles and cutting-edge technology.',
		technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
	},
];

interface InfiniteMenuProps {
	items?: MenuItem[];
}

const InfiniteMenu: FC<InfiniteMenuProps> = ({ items = [] }) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(
		null
	) as MutableRefObject<HTMLCanvasElement | null>;
	const menuRef = useRef<InfiniteGridMenu | null>(null);
	const [activeItem, setActiveItem] = useState<MenuItem | null>(null);
	const [isMoving, setIsMoving] = useState<boolean>(false);
	const [hasInteracted, setHasInteracted] = useState<boolean>(false);
	const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
	const [previewItem, setPreviewItem] = useState<MenuItem | null>(null);
	const router = useRouter();

	useEffect(() => {
		const canvas = canvasRef.current;
		let sketch: InfiniteGridMenu | null = null;

		const handleActiveItem = (index: number) => {
			if (!items.length) return;
			const itemIndex = index % items.length;
			const item = items[itemIndex];
			setActiveItem(item);
			setCurrentSlideIndex(itemIndex);
		};

		const handleMovementChange = (moving: boolean) => {
			setIsMoving(moving);
			if (moving && !hasInteracted) {
				setHasInteracted(true);
			}
		};

		if (canvas) {
			sketch = new InfiniteGridMenu(
				canvas,
				items.length ? items : defaultItems,
				handleActiveItem,
				handleMovementChange,
				(sk) => {
					sketch = sk;
					sk.run();
				}
			);
			menuRef.current = sketch;
		}

		const handleResize = () => {
			if (sketch) {
				sketch.resize();
			}
		};

		window.addEventListener('resize', handleResize);
		handleResize();

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [items]);

	// Update preview item when moving
	useEffect(() => {
		if (isMoving && menuRef.current) {
			// Calculate which item is most directly facing the camera
			const nearestIndex = menuRef.current.findNearestVertexIndex();
			const previewIndex = nearestIndex % Math.max(1, items.length);
			const previewItem = items[previewIndex];
			setPreviewItem(previewItem);
		} else {
			setPreviewItem(null);
		}
	}, [isMoving, items]);

	// Update preview during movement with animation frame
	useEffect(() => {
		if (!isMoving || !menuRef.current) return;

		let animationId: number;

		const updatePreview = () => {
			if (menuRef.current && isMoving) {
				const nearestIndex = menuRef.current.findNearestVertexIndex();
				const previewIndex = nearestIndex % Math.max(1, items.length);
				const previewItem = items[previewIndex];
				setPreviewItem(previewItem);
				animationId = requestAnimationFrame(updatePreview);
			}
		};

		animationId = requestAnimationFrame(updatePreview);

		return () => {
			if (animationId) {
				cancelAnimationFrame(animationId);
			}
		};
	}, [isMoving, items]);

	const handleButtonClick = () => {
		if (!activeItem) return;

		if (activeItem.slug) {
			// Navigate to project detail page
			router.push(`/projects/${activeItem.slug}`);
		} else if (activeItem.link && activeItem.link.startsWith('http')) {
			// Fallback to external link if no slug provided
			window.open(activeItem.link, '_blank');
		}
	};

	return (
		<div className="relative w-full min-h-full">
			<canvas
				id="infinite-grid-menu-canvas"
				ref={canvasRef}
				className="cursor-grab w-full h-full overflow-hidden relative outline-none active:cursor-grabbing "
			/>

			{/* Top fade gradient overlay */}
			<div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-zinc-900 via-zinc-900/80 to-transparent pointer-events-none z-10" />

			{/* Bottom fade gradient overlay */}
			<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-transparent pointer-events-none z-10" />

			{/* Current Slide Indicator */}
			<div className="absolute top-8 left-1/2 transform -translate-x-1/2 pointer-events-none z-20">
				<div className="bg-zinc-900/95 backdrop-blur-md border border-zinc-700/60 rounded-2xl px-6 py-3 text-center shadow-2xl relative overflow-hidden group">
					{/* Animated background gradient */}
					<div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>

					{/* Glowing border effect */}
					<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

					<div className="relative z-10">
						<div className="flex items-center justify-center gap-3">
							<span className="text-zinc-400 text-sm font-medium">
								Project {currentSlideIndex + 1} of {items.length || 1}
							</span>
							<div className="w-1 h-1 bg-zinc-600 rounded-full"></div>
							<span className="text-zinc-300 font-semibold text-base">
								{activeItem?.title || 'Loading...'}
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Preview Indicator - Shows when moving */}
			{isMoving && previewItem && (
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30">
					<div className="bg-zinc-900/95 backdrop-blur-md border border-zinc-700/60 rounded-2xl px-8 py-6 text-center shadow-2xl relative overflow-hidden group animate-pulse">
						{/* Animated background gradient */}
						<div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-100 transition-opacity duration-700"></div>

						{/* Glowing border effect */}
						<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-pink-500/40 opacity-100 transition-opacity duration-500 blur-sm"></div>

						{/* Floating particles */}
						<div className="absolute inset-0 overflow-hidden">
							<div className="absolute top-2 left-4 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-75"></div>
							<div
								className="absolute top-6 right-6 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-75"
								style={{ animationDelay: '0.5s' }}
							></div>
							<div
								className="absolute bottom-4 left-8 w-1 h-1 bg-pink-400 rounded-full animate-ping opacity-75"
								style={{ animationDelay: '1s' }}
							></div>
						</div>

						<div className="relative z-10">
							{/* Large Slide Number */}
							<div className="mb-4">
								<span className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
									{(() => {
										if (!menuRef.current) return '?';
										const nearestIndex =
											menuRef.current.findNearestVertexIndex();
										const previewIndex =
											nearestIndex % Math.max(1, items.length);
										return previewIndex + 1;
									})()}
								</span>
								<span className="text-zinc-400 text-lg font-medium ml-2">
									of {items.length || 1}
								</span>
							</div>

							<div className="flex items-center justify-center gap-3 mb-3">
								<span className="text-blue-400 text-sm font-medium">Preview</span>
								<div className="w-1 h-1 bg-zinc-600 rounded-full"></div>
								<span className="text-zinc-300 font-semibold text-xl">
									{previewItem.title}
								</span>
							</div>
							<p className="text-zinc-400 text-sm max-w-xs">
								{previewItem.description}
							</p>
						</div>
					</div>
				</div>
			)}

			{/* Click and drag instruction indicator */}
			<div
				className={`
					absolute top-32 left-1/2 transform -translate-x-1/2 pointer-events-none z-20
					transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1.0)]
					${hasInteracted ? 'opacity-0 translate-y-8 scale-95' : 'opacity-100 translate-y-0 scale-100'}
				`}
			>
				<div className="bg-zinc-900/95 backdrop-blur-md border border-zinc-700/60 rounded-3xl px-8 py-5 text-center shadow-2xl relative overflow-hidden group">
					{/* Animated background gradient */}
					<div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>

					{/* Glowing border effect */}
					<div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

					{/* Floating particles */}
					<div className="absolute inset-0 overflow-hidden">
						<div className="absolute top-2 left-4 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-75"></div>
						<div
							className="absolute top-6 right-6 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-75"
							style={{ animationDelay: '0.5s' }}
						></div>
						<div
							className="absolute bottom-4 left-8 w-1 h-1 bg-pink-400 rounded-full animate-ping opacity-75"
							style={{ animationDelay: '1s' }}
						></div>
					</div>

					<div className="relative z-10">
						<div className="flex items-center justify-center gap-4 mb-2">
							<span className="text-zinc-200 font-semibold text-xl tracking-wide group-hover:text-white transition-colors duration-300">
								<span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-white group-hover:to-white transition-all duration-300">
									Hold & Drag
								</span>
							</span>
						</div>
						<p className="text-zinc-400 text-base font-medium group-hover:text-zinc-300 transition-colors duration-300">
							to explore projects
						</p>
					</div>
				</div>
			</div>

			{activeItem && (
				<>
					{/* Text background overlay for better readability */}
					<div className="absolute inset-0 bg-gradient-to-r from-zinc-900/20 via-transparent to-zinc-900/20 pointer-events-none z-5" />

					<h2
						className={`
          select-none
          absolute
          font-black
          uppercase
          text-zinc-300
          text-4xl md:text-5xl lg:text-6xl xl:text-7xl
          left-4 md:left-8 lg:left-12 xl:left-16
          top-1/2
          transform
          -translate-y-1/2
          max-w-[8ch] md:max-w-[10ch] lg:max-w-[12ch] xl:max-w-[14ch]
          leading-tight
          drop-shadow-lg
          transition-all
          ease-[cubic-bezier(0.25,0.1,0.25,1.0)]
          pointer-events-none
          z-10
          ${isMoving ? 'opacity-0 duration-[100ms]' : 'opacity-100 duration-[500ms]'}
        `}
					>
						{activeItem.title}
					</h2>

					<p
						className={`
          select-none
          absolute
          max-w-[10ch] md:max-w-[14ch] lg:max-w-[18ch] xl:max-w-[22ch]
          text-zinc-300
          text-lg md:text-xl lg:text-2xl xl:text-3xl
          leading-relaxed
          top-1/2
          right-4 md:right-8 lg:right-12 xl:right-16
          transform
          -translate-y-1/2
          drop-shadow-md
          transition-all
          ease-[cubic-bezier(0.25,0.1,0.25,1.0)]
          pointer-events-none
          z-10
          ${
				isMoving
					? 'opacity-0 duration-[100ms] translate-x-8'
					: 'opacity-100 duration-[500ms] translate-x-0'
			}
        `}
					>
						{activeItem.description}
					</p>

					{/* Technologies Section */}
					{activeItem.technologies && activeItem.technologies.length > 0 && (
						<div
							className={`
            select-none
            absolute
            left-1/2
            transform
            -translate-x-1/2
            z-10
            transition-all
            ease-[cubic-bezier(0.25,0.1,0.25,1.0)]
            pointer-events-none
            ${
				isMoving
					? 'opacity-0 duration-[100ms] scale-95'
					: 'opacity-100 duration-[500ms] scale-100'
			}
            ${
				isMoving
					? 'bottom-[-100px]'
					: 'bottom-[16em] md:bottom-[14em] lg:bottom-[12em] xl:bottom-[10em]'
			}
          `}
						>
							<div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-700/60 rounded-2xl px-4 md:px-6 py-3 md:py-4 shadow-2xl relative overflow-hidden group max-w-[90vw] md:max-w-none">
								{/* Animated background gradient */}
								<div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>

								{/* Glowing border effect */}
								<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

								{/* Floating particles */}
								<div className="absolute inset-0 overflow-hidden">
									<div className="absolute top-2 left-4 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-75"></div>
									<div
										className="absolute top-6 right-6 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-75"
										style={{ animationDelay: '0.5s' }}
									></div>
									<div
										className="absolute bottom-4 left-8 w-1 h-1 bg-pink-400 rounded-full animate-ping opacity-75"
										style={{ animationDelay: '1s' }}
									></div>
								</div>

								<div className="relative z-10">
									<h3 className="text-zinc-300 font-semibold text-sm md:text-base mb-2 md:mb-3 text-center group-hover:text-white transition-colors duration-300">
										<span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
											Technologies Used
										</span>
									</h3>
									<div className="flex flex-wrap justify-center gap-1.5 md:gap-2 max-w-[80vw] md:max-w-xs lg:max-w-sm">
										{activeItem.technologies.slice(0, 6).map((tech, index) => (
											<span
												key={index}
												className="px-2 md:px-3 py-1 md:py-1.5 bg-zinc-800/80 border border-zinc-600/60 rounded-full text-xs md:text-sm text-zinc-300 font-medium shadow-lg 
													hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 
													hover:border-blue-500/60 hover:text-white hover:scale-110 
													transition-all duration-300 ease-out cursor-pointer
													hover:shadow-blue-500/25 hover:shadow-lg
													animate-fade-in-up"
												style={{
													animationDelay: `${index * 100}ms`,
													animationFillMode: 'both',
												}}
											>
												{tech}
											</span>
										))}
										{activeItem.technologies.length > 6 && (
											<span
												className="px-2 md:px-3 py-1 md:py-1.5 bg-zinc-700/80 border border-zinc-600/60 rounded-full text-xs md:text-sm text-zinc-400 font-medium shadow-lg
													hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-pink-600/20
													hover:border-purple-500/60 hover:text-white hover:scale-110
													transition-all duration-300 ease-out cursor-pointer
													hover:shadow-purple-500/25 hover:shadow-lg
													animate-fade-in-up"
												style={{
													animationDelay: `${6 * 100}ms`,
													animationFillMode: 'both',
												}}
											>
												+{activeItem.technologies.length - 6} more
											</span>
										)}
									</div>
								</div>
							</div>
						</div>
					)}

					<div
						onClick={handleButtonClick}
						className={`
          absolute
          left-1/2
          z-20
          px-6
          py-3
          bg-gradient-to-r from-zinc-800 to-zinc-700
          border border-zinc-600
          rounded-xl
          cursor-pointer
          transition-all
          ease-[cubic-bezier(0.25,0.1,0.25,1.0)]
          hover:from-zinc-700 hover:to-zinc-600
          hover:border-zinc-500
          hover:scale-105
          hover:shadow-lg
          hover:shadow-zinc-900/50
          group
          ${
				isMoving
					? 'bottom-[-80px] opacity-0 pointer-events-none duration-[100ms] scale-0 -translate-x-1/2'
					: 'bottom-[6em] md:bottom-[5em] lg:bottom-[4em] xl:bottom-[3em] opacity-100 pointer-events-auto duration-[500ms] scale-100 -translate-x-1/2'
			}
        `}
					>
						<div className="flex items-center gap-2">
							<svg
								className="w-5 h-5 text-zinc-300 group-hover:text-white transition-colors duration-200"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13 7l5 5m0 0l-5 5m5-5H6"
								/>
							</svg>
							<span className="text-zinc-300 group-hover:text-white font-semibold text-sm whitespace-nowrap transition-colors duration-200">
								View Details
							</span>
						</div>

						{/* Tooltip */}
						<div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-zinc-900/95 backdrop-blur-md border border-zinc-700/60 rounded-lg text-xs text-zinc-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
							Click to see project details, technologies & more
							<div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-zinc-900/95"></div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default InfiniteMenu;
