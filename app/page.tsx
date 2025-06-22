'use client';
import Image from 'next/image';
import Particles from './components/Particles';
import ScrollFloat from './components/ScrollFloat';
import SplitText from './components/SplitText';
import BlobCursor from './components/BlogCursor';
import Navbar from './components/Navbar';
import TextPressure from './components/TextPressure';
import ScrollIndicator from './components/ScrollIndicator';
import { useEffect, useState, useRef, useMemo } from 'react';

// Social Media Links Component
const SocialLinks = ({ className = '' }: { className?: string }) => (
	<div className={`flex gap-4 ${className} pointer-events-auto`}>
		<a
			href="https://github.com/NathanCart"
			target="_blank"
			rel="noopener noreferrer"
			className="group relative flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-zinc-800 to-zinc-700 hover:from-zinc-700 hover:to-zinc-600 text-zinc-300 hover:text-white rounded-xl transition-all duration-300 border border-zinc-600 hover:border-zinc-500 shadow-lg hover:shadow-xl hover:shadow-zinc-900/50 transform hover:-translate-y-1"
		>
			<div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 rounded-xl transition-all duration-300"></div>
			<svg
				className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 relative z-10"
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
			<span className="font-semibold relative z-10">GitHub</span>
		</a>

		<a
			href="https://www.linkedin.com/in/nathan-carter-782725297/"
			target="_blank"
			rel="noopener noreferrer"
			className="group relative flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-zinc-800 to-zinc-700 hover:from-blue-600 hover:to-blue-500 text-zinc-300 hover:text-white rounded-xl transition-all duration-300 border border-zinc-600 hover:border-blue-400 shadow-lg hover:shadow-xl hover:shadow-blue-900/50 transform hover:-translate-y-1"
		>
			<div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-blue-600/0 group-hover:from-blue-500/20 group-hover:to-blue-600/20 rounded-xl transition-all duration-300"></div>
			<svg
				className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 relative z-10"
				fill="currentColor"
				viewBox="0 0 24 24"
				aria-hidden="true"
			>
				<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
			</svg>
			<span className="font-semibold relative z-10">LinkedIn</span>
		</a>
	</div>
);

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
					text="Full Stack Software Developer"
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
				<SocialLinks className="mt-8" />
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

				{/* Scroll Down Indicator */}
				<ScrollIndicator />
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
					<div style={{ position: 'relative', height: '30vw', maxHeight: '220px' }}>
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
					<div className="text-base md:text-xl text-zinc-400 leading-relaxed space-y-6 font-medium max-w-3xl">
						<p>
							I'm a Full Stack Software Developer with near 3 years of professional
							experience. I specialize in building seamless web and mobile experiences
							for companies ranging from local startups to large enterprises such as
							Meta and Samsung.
						</p>
						<p>
							With a passion for building applications that are not only functional,
							but also beautiful and user-friendly. Always on the lookout for new
							challenges and opportunities to grow as a developer.
						</p>
					</div>

					{/* Social Links in About Section */}
					<div className="mt-8">
						<SocialLinks className="justify-center" />
					</div>
				</div>
			</section>

			{/* Spacer to create scroll space */}
			<div style={{ height: '150vh' }}></div>

			{/* Skills Section */}
			<section
				id="skills"
				className="min-h-screen bg-zinc-900 flex items-center justify-center relative z-30 overflow-hidden"
			>
				{/* Background Pattern */}
				<div className="absolute inset-0 opacity-5">
					<div
						className="absolute inset-0"
						style={{
							backgroundImage: `radial-gradient(circle at 25% 25%, #ffffff 1px, transparent 1px),
							radial-gradient(circle at 75% 75%, #ffffff 1px, transparent 1px)`,
							backgroundSize: '50px 50px',
						}}
					></div>
				</div>

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
					{/* Section Header */}
					<div className="mb-16">
						<div style={{ position: 'relative', height: '30vw', maxHeight: '220px' }}>
							<TextPressure
								text="Skills & Tech"
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
						<p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mt-6">
							Building digital experiences with modern tools and frameworks
						</p>
					</div>

					{/* Skills Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
						{/* Frontend Development */}
						<div className="group">
							<div className="bg-zinc-800/80 border border-zinc-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:bg-zinc-800/90 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 hover:shadow-lg">
								<div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/50">
									<svg
										className="w-8 h-8 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
										/>
									</svg>
								</div>
								<h3 className="text-2xl font-bold text-zinc-300 mb-4 group-hover:text-blue-300 transition-colors duration-300">
									Frontend Development
								</h3>
								<div className="space-y-3">
									<div className="flex items-center justify-between p-3 bg-zinc-700/30 rounded-lg hover:bg-zinc-700/50 transition-colors duration-200 group-hover:bg-blue-500/10">
										<span className="text-zinc-300 font-medium">React</span>
										<div className="w-2 h-2 bg-green-400 rounded-full group-hover:bg-blue-400 transition-colors duration-300"></div>
									</div>
									<div className="flex items-center justify-between p-3 bg-zinc-700/30 rounded-lg hover:bg-zinc-700/50 transition-colors duration-200 group-hover:bg-blue-500/10">
										<span className="text-zinc-300 font-medium">Next.js</span>
										<div className="w-2 h-2 bg-green-400 rounded-full group-hover:bg-blue-400 transition-colors duration-300"></div>
									</div>
									<div className="flex items-center justify-between p-3 bg-zinc-700/30 rounded-lg hover:bg-zinc-700/50 transition-colors duration-200 group-hover:bg-blue-500/10">
										<span className="text-zinc-300 font-medium">
											TypeScript
										</span>
										<div className="w-2 h-2 bg-green-400 rounded-full group-hover:bg-blue-400 transition-colors duration-300"></div>
									</div>
									<div className="flex items-center justify-between p-3 bg-zinc-700/30 rounded-lg hover:bg-zinc-700/50 transition-colors duration-200 group-hover:bg-blue-500/10">
										<span className="text-zinc-300 font-medium">
											Tailwind CSS
										</span>
										<div className="w-2 h-2 bg-green-400 rounded-full group-hover:bg-blue-400 transition-colors duration-300"></div>
									</div>
								</div>
							</div>
						</div>

						{/* Backend Development */}
						<div className="group">
							<div className="bg-zinc-800/80 border border-zinc-700/50 rounded-2xl p-8 hover:border-green-500/50 transition-all duration-300 hover:bg-zinc-800/90 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 hover:shadow-lg">
								<div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg group-hover:shadow-green-500/50">
									<svg
										className="w-8 h-8 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
										/>
									</svg>
								</div>
								<h3 className="text-2xl font-bold text-zinc-300 mb-4 group-hover:text-green-300 transition-colors duration-300">
									Backend Development
								</h3>
								<div className="space-y-3">
									<div className="flex items-center justify-between p-3 bg-zinc-700/30 rounded-lg hover:bg-zinc-700/50 transition-colors duration-200 group-hover:bg-green-500/10">
										<span className="text-zinc-300 font-medium">Node.js</span>
										<div className="w-2 h-2 bg-green-400 rounded-full group-hover:bg-green-400 transition-colors duration-300"></div>
									</div>
									<div className="flex items-center justify-between p-3 bg-zinc-700/30 rounded-lg hover:bg-zinc-700/50 transition-colors duration-200 group-hover:bg-green-500/10">
										<span className="text-zinc-300 font-medium">Express</span>
										<div className="w-2 h-2 bg-green-400 rounded-full group-hover:bg-green-400 transition-colors duration-300"></div>
									</div>
									<div className="flex items-center justify-between p-3 bg-zinc-700/30 rounded-lg hover:bg-zinc-700/50 transition-colors duration-200 group-hover:bg-green-500/10">
										<span className="text-zinc-300 font-medium">Python</span>
										<div className="w-2 h-2 bg-green-400 rounded-full group-hover:bg-green-400 transition-colors duration-300"></div>
									</div>
									<div className="flex items-center justify-between p-3 bg-zinc-700/30 rounded-lg hover:bg-zinc-700/50 transition-colors duration-200 group-hover:bg-green-500/10">
										<span className="text-zinc-300 font-medium">Django</span>
										<div className="w-2 h-2 bg-green-400 rounded-full group-hover:bg-green-400 transition-colors duration-300"></div>
									</div>
								</div>
							</div>
						</div>

						{/* Database & Storage */}
						<div className="group">
							<div className="bg-zinc-800/80 border border-zinc-700/50 rounded-2xl p-8 hover:border-orange-500/50 transition-all duration-300 hover:bg-zinc-800/90 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20 hover:shadow-lg">
								<div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg group-hover:shadow-orange-500/50">
									<svg
										className="w-8 h-8 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
										/>
									</svg>
								</div>
								<h3 className="text-2xl font-bold text-zinc-300 mb-4 group-hover:text-orange-300 transition-colors duration-300">
									Database & Storage
								</h3>
								<div className="space-y-3">
									<div className="flex items-center justify-between p-3 bg-zinc-700/30 rounded-lg hover:bg-zinc-700/50 transition-colors duration-200 group-hover:bg-orange-500/10">
										<span className="text-zinc-300 font-medium">MongoDB</span>
										<div className="w-2 h-2 bg-green-400 rounded-full group-hover:bg-orange-400 transition-colors duration-300"></div>
									</div>
									<div className="flex items-center justify-between p-3 bg-zinc-700/30 rounded-lg hover:bg-zinc-700/50 transition-colors duration-200 group-hover:bg-orange-500/10">
										<span className="text-zinc-300 font-medium">
											PostgreSQL
										</span>
										<div className="w-2 h-2 bg-green-400 rounded-full group-hover:bg-orange-400 transition-colors duration-300"></div>
									</div>
									<div className="flex items-center justify-between p-3 bg-zinc-700/30 rounded-lg hover:bg-zinc-700/50 transition-colors duration-200 group-hover:bg-orange-500/10">
										<span className="text-zinc-300 font-medium">MySQL</span>
										<div className="w-2 h-2 bg-green-400 rounded-full group-hover:bg-orange-400 transition-colors duration-300"></div>
									</div>
									<div className="flex items-center justify-between p-3 bg-zinc-700/30 rounded-lg hover:bg-zinc-700/50 transition-colors duration-200 group-hover:bg-orange-500/10">
										<span className="text-zinc-300 font-medium">Redis</span>
										<div className="w-2 h-2 bg-green-400 rounded-full group-hover:bg-orange-400 transition-colors duration-300"></div>
									</div>
								</div>
							</div>
						</div>

						{/* DevOps & Tools */}
						<div className="group">
							<div className="bg-zinc-800/80 border border-zinc-700/50 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:bg-zinc-800/90 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 hover:shadow-lg">
								<div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/50">
									<svg
										className="w-8 h-8 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
										/>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
										/>
									</svg>
								</div>
								<h3 className="text-2xl font-bold text-zinc-300 mb-4 group-hover:text-purple-300 transition-colors duration-300">
									DevOps & Tools
								</h3>
								<div className="space-y-3">
									<div className="flex items-center justify-between p-3 bg-zinc-700/30 rounded-lg hover:bg-zinc-700/50 transition-colors duration-200 group-hover:bg-purple-500/10">
										<span className="text-zinc-300 font-medium">Git</span>
										<div className="w-2 h-2 bg-green-400 rounded-full group-hover:bg-purple-400 transition-colors duration-300"></div>
									</div>
									<div className="flex items-center justify-between p-3 bg-zinc-700/30 rounded-lg hover:bg-zinc-700/50 transition-colors duration-200 group-hover:bg-purple-500/10">
										<span className="text-zinc-300 font-medium">Docker</span>
										<div className="w-2 h-2 bg-green-400 rounded-full group-hover:bg-purple-400 transition-colors duration-300"></div>
									</div>
									<div className="flex items-center justify-between p-3 bg-zinc-700/30 rounded-lg hover:bg-zinc-700/50 transition-colors duration-200 group-hover:bg-purple-500/10">
										<span className="text-zinc-300 font-medium">AWS</span>
										<div className="w-2 h-2 bg-green-400 rounded-full group-hover:bg-purple-400 transition-colors duration-300"></div>
									</div>
									<div className="flex items-center justify-between p-3 bg-zinc-700/30 rounded-lg hover:bg-zinc-700/50 transition-colors duration-200 group-hover:bg-purple-500/10">
										<span className="text-zinc-300 font-medium">Vercel</span>
										<div className="w-2 h-2 bg-green-400 rounded-full group-hover:bg-purple-400 transition-colors duration-300"></div>
									</div>
								</div>
							</div>
						</div>

						{/* Mobile Development */}
						<div className="group">
							<div className="bg-zinc-800/80 border border-zinc-700/50 rounded-2xl p-8 hover:border-indigo-500/50 transition-all duration-300 hover:bg-zinc-800/90 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/20 hover:shadow-lg">
								<div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg group-hover:shadow-indigo-500/50">
									<svg
										className="w-8 h-8 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
										/>
									</svg>
								</div>
								<h3 className="text-2xl font-bold text-zinc-300 mb-4 group-hover:text-indigo-300 transition-colors duration-300">
									Mobile Development
								</h3>
								<div className="space-y-3">
									<div className="flex items-center justify-between p-3 bg-zinc-700/30 rounded-lg hover:bg-zinc-700/50 transition-colors duration-200 group-hover:bg-indigo-500/10">
										<span className="text-zinc-300 font-medium">
											React Native
										</span>
										<div className="w-2 h-2 bg-green-400 rounded-full group-hover:bg-indigo-400 transition-colors duration-300"></div>
									</div>
									<div className="flex items-center justify-between p-3 bg-zinc-700/30 rounded-lg hover:bg-zinc-700/50 transition-colors duration-200 group-hover:bg-indigo-500/10">
										<span className="text-zinc-300 font-medium">Expo</span>
										<div className="w-2 h-2 bg-green-400 rounded-full group-hover:bg-indigo-400 transition-colors duration-300"></div>
									</div>
									<div className="flex items-center justify-between p-3 bg-zinc-700/30 rounded-lg hover:bg-zinc-700/50 transition-colors duration-200 group-hover:bg-indigo-500/10">
										<span className="text-zinc-300 font-medium">PWA</span>
										<div className="w-2 h-2 bg-green-400 rounded-full group-hover:bg-indigo-400 transition-colors duration-300"></div>
									</div>
									<div className="flex items-center justify-between p-3 bg-zinc-700/30 rounded-lg hover:bg-zinc-700/50 transition-colors duration-200 group-hover:bg-indigo-500/10">
										<span className="text-zinc-300 font-medium">
											Responsive Design
										</span>
										<div className="w-2 h-2 bg-green-400 rounded-full group-hover:bg-indigo-400 transition-colors duration-300"></div>
									</div>
								</div>
							</div>
						</div>

						{/* Testing & Quality */}
						<div className="group">
							<div className="bg-zinc-800/80 border border-zinc-700/50 rounded-2xl p-8 hover:border-emerald-500/50 transition-all duration-300 hover:bg-zinc-800/90 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/20 hover:shadow-lg">
								<div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg group-hover:shadow-emerald-500/50">
									<svg
										className="w-8 h-8 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
								<h3 className="text-2xl font-bold text-zinc-300 mb-4 group-hover:text-emerald-300 transition-colors duration-300">
									Testing & Quality
								</h3>
								<div className="space-y-3">
									<div className="flex items-center justify-between p-3 bg-zinc-700/30 rounded-lg hover:bg-zinc-700/50 transition-colors duration-200 group-hover:bg-emerald-500/10">
										<span className="text-zinc-300 font-medium">Jest</span>
										<div className="w-2 h-2 bg-green-400 rounded-full group-hover:bg-emerald-400 transition-colors duration-300"></div>
									</div>
									<div className="flex items-center justify-between p-3 bg-zinc-700/30 rounded-lg hover:bg-zinc-700/50 transition-colors duration-200 group-hover:bg-emerald-500/10">
										<span className="text-zinc-300 font-medium">Cypress</span>
										<div className="w-2 h-2 bg-green-400 rounded-full group-hover:bg-emerald-400 transition-colors duration-300"></div>
									</div>
									<div className="flex items-center justify-between p-3 bg-zinc-700/30 rounded-lg hover:bg-zinc-700/50 transition-colors duration-200 group-hover:bg-emerald-500/10">
										<span className="text-zinc-300 font-medium">ESLint</span>
										<div className="w-2 h-2 bg-green-400 rounded-full group-hover:bg-emerald-400 transition-colors duration-300"></div>
									</div>
									<div className="flex items-center justify-between p-3 bg-zinc-700/30 rounded-lg hover:bg-zinc-700/50 transition-colors duration-200 group-hover:bg-emerald-500/10">
										<span className="text-zinc-300 font-medium">Prettier</span>
										<div className="w-2 h-2 bg-green-400 rounded-full group-hover:bg-emerald-400 transition-colors duration-300"></div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Call to Action */}
					<div className="text-center">
						<p className="text-lg text-zinc-400 mb-6">
							Always learning and exploring new technologies
						</p>
						<div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-zinc-800 to-zinc-700 border border-zinc-600 rounded-xl text-zinc-300 hover:from-zinc-700 hover:to-zinc-600 hover:border-zinc-500 transition-all duration-300">
							<span>View My Work</span>
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M17 8l4 4m0 0l-4 4m4-4H3"
								/>
							</svg>
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
