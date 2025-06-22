'use client';
import Image from 'next/image';
import Particles from './components/Particles';
import ScrollFloat from './components/ScrollFloat';
import SplitText from './components/SplitText';
import BlobCursor from './components/BlogCursor';
import Navbar from './components/Navbar';
import TextPressure from './components/TextPressure';
import { useEffect, useState, useRef, useMemo } from 'react';

export default function Home() {
	const [scrollY, setScrollY] = useState(0);
	const scrollRef = useRef<number>(0);
	const rafRef = useRef<number | undefined>(undefined);

	useEffect(() => {
		const handleScroll = () => {
			scrollRef.current = window.scrollY;

			// Use requestAnimationFrame to throttle updates
			if (rafRef.current) {
				cancelAnimationFrame(rafRef.current);
			}

			rafRef.current = requestAnimationFrame(() => {
				setScrollY(scrollRef.current);
			});
		};

		// Use passive listener for better performance
		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
			if (rafRef.current) {
				cancelAnimationFrame(rafRef.current);
			}
		};
	}, []);

	// Memoize the hero content to prevent re-renders on scroll
	const heroContent = useMemo(
		() => (
			<div className="flex items-center pointer-events-none flex-col justify-center z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-zinc-300">
				{/* <Image
				src="/&Element-658 (1).jpg"
				alt="Nathan Carter"
				width={128}
				height={128}
				className="rounded-full w-[80px] sm:w-[100px] lg:w-[128px] mb-4 border-2 border-zinc-700 shadow-[0_0_20px_rgba(255,255,255,0.3)] aspect-square object-cover object-top"
				priority
			/> */}
				<SplitText
					text="NATHAN CARTER"
					className="text-3xl md:text-6xl lg:text-8xl text-center font-black whitespace-nowrap"
					delay={50}
					duration={0.6}
					ease="power3.out"
					splitType="chars"
					from={{ opacity: 0, y: 40 }}
					to={{ opacity: 1, y: 0 }}
					threshold={0.1}
					rootMargin="-100px"
					textAlign="center"
					onLetterAnimationComplete={() => {}}
				/>
				<SplitText
					text="I'm a Full Stack Software Developer!"
					className="text-2xl md:text-3xl lg:text-4xl font-medium text-center"
					delay={25}
					duration={0.4}
					ease="power3.out"
					splitType="chars"
					from={{ opacity: 0, y: 40 }}
					to={{ opacity: 1, y: 0 }}
					threshold={0.1}
					rootMargin="-100px"
					textAlign="center"
					onLetterAnimationComplete={() => {}}
				/>

				{/* Social Media Buttons */}
				<div className="flex gap-6 mt-8 pointer-events-auto">
					<a
						href="https://github.com/NathanCart"
						target="_blank"
						rel="noopener noreferrer"
						className="group flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-lg transition-all duration-300 border border-zinc-700 hover:border-zinc-600"
					>
						<svg
							className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
							fill="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path
								fillRule="evenodd"
								d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
								clipRule="evenodd"
							/>
						</svg>
						<span className="font-medium">GitHub</span>
					</a>

					<a
						href="https://www.linkedin.com/in/nathan-carter-782725297/"
						target="_blank"
						rel="noopener noreferrer"
						className="group flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-lg transition-all duration-300 border border-zinc-700 hover:border-zinc-600"
					>
						<svg
							className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
							fill="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
						</svg>
						<span className="font-medium">LinkedIn</span>
					</a>
				</div>
			</div>
		),
		[]
	); // Empty dependency array ensures this only runs once on mount

	return (
		<main className="min-h-screen relative overflow-hidden bg-zinc-900">
			<Navbar />

			{/* Hero Section */}
			<div style={{ width: '100%', height: '100dvh', position: 'relative', zIndex: 1 }}>
				<Particles
					particleColors={['#ffffff', '#ffffff']}
					particleCount={200}
					particleSpread={10}
					speed={0.1}
					particleBaseSize={100}
					moveParticlesOnHover={true}
					alphaParticles={false}
					disableRotation={false}
				/>

				{heroContent}
			</div>

			{/* About Section - Parallax Effect */}
			<section
				id="about"
				className="fixed top-0 left-0 w-full min-h-screen bg-zinc-900/95 backdrop-blur-sm flex items-center justify-center z-20 transition-opacity duration-300"
				style={{
					transform: `translateY(${Math.max(0, scrollY - window.innerHeight)}px)`,
					opacity: Math.max(
						0,
						Math.min(
							1,
							(scrollY - window.innerHeight * 0.3) / (window.innerHeight * 0.4)
						)
					),
					pointerEvents: scrollY > window.innerHeight * 0.5 ? 'auto' : 'none',
				}}
			>
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<div style={{ position: 'relative', height: '300px' }}>
						<TextPressure
							text="About Me"
							flex={true}
							alpha={false}
							stroke={false}
							width={true}
							weight={true}
							italic={true}
							textColor="#ffffff"
							strokeColor="#ff0000"
							minFontSize={36}
						/>
					</div>
					<div className="text-xl text-zinc-400 leading-relaxed space-y-6">
						<p>
							I'm a Full Stack Software Developer with near 3 years of professional
							experience. I specialize in building seamless web and mobile
							experiences.
						</p>
					</div>
				</div>
			</section>

			{/* Spacer to create scroll space */}
			<div style={{ height: '100vh' }}></div>

			{/* Skills Section */}
			<section
				id="skills"
				className="min-h-screen bg-zinc-800 flex items-center justify-center relative z-30"
			>
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-4xl md:text-6xl font-bold text-zinc-300 mb-12">Skills</h2>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
						<div className="bg-zinc-700 p-6 rounded-lg">
							<h3 className="text-xl font-semibold text-zinc-300 mb-2">Frontend</h3>
							<p className="text-zinc-400">
								React, Next.js, TypeScript, Tailwind CSS
							</p>
						</div>
						<div className="bg-zinc-700 p-6 rounded-lg">
							<h3 className="text-xl font-semibold text-zinc-300 mb-2">Backend</h3>
							<p className="text-zinc-400">Node.js, Express, Python, Django</p>
						</div>
						<div className="bg-zinc-700 p-6 rounded-lg">
							<h3 className="text-xl font-semibold text-zinc-300 mb-2">Database</h3>
							<p className="text-zinc-400">MongoDB, PostgreSQL, MySQL</p>
						</div>
						<div className="bg-zinc-700 p-6 rounded-lg">
							<h3 className="text-xl font-semibold text-zinc-300 mb-2">Tools</h3>
							<p className="text-zinc-400">Git, Docker, AWS, Vercel</p>
						</div>
					</div>
				</div>
			</section>

			{/* Projects Section */}
			<section
				id="projects"
				className="min-h-screen bg-zinc-900 flex items-center justify-center"
			>
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-4xl md:text-6xl font-bold text-zinc-300 mb-12">Projects</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						<div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700">
							<h3 className="text-2xl font-semibold text-zinc-300 mb-4">Project 1</h3>
							<p className="text-zinc-400 mb-4">
								A full-stack web application built with modern technologies.
							</p>
							<div className="flex gap-2 justify-center">
								<span className="px-3 py-1 bg-zinc-700 text-zinc-300 rounded-full text-sm">
									React
								</span>
								<span className="px-3 py-1 bg-zinc-700 text-zinc-300 rounded-full text-sm">
									Node.js
								</span>
							</div>
						</div>
						<div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700">
							<h3 className="text-2xl font-semibold text-zinc-300 mb-4">Project 2</h3>
							<p className="text-zinc-400 mb-4">
								An innovative mobile-first responsive design.
							</p>
							<div className="flex gap-2 justify-center">
								<span className="px-3 py-1 bg-zinc-700 text-zinc-300 rounded-full text-sm">
									Next.js
								</span>
								<span className="px-3 py-1 bg-zinc-700 text-zinc-300 rounded-full text-sm">
									TypeScript
								</span>
							</div>
						</div>
						<div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700">
							<h3 className="text-2xl font-semibold text-zinc-300 mb-4">Project 3</h3>
							<p className="text-zinc-400 mb-4">
								A scalable backend API with advanced features.
							</p>
							<div className="flex gap-2 justify-center">
								<span className="px-3 py-1 bg-zinc-700 text-zinc-300 rounded-full text-sm">
									Python
								</span>
								<span className="px-3 py-1 bg-zinc-700 text-zinc-300 rounded-full text-sm">
									Django
								</span>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
