'use client';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Particles from '../components/Particles';
import SplitText from '../components/SplitText';
import ScrollIndicator from '../components/ScrollIndicator';
import metaDashboard from '../projects/metaDashboard';
import pipify from '../projects/pipify';
import samsungSmartThings from '../projects/samsungSmartThings';
import ProjectBubbles from '../components/ProjectBubbles';
import projects from '../projects';

// Social Links Component (copied from homepage)
const SocialLinks = ({ className = '' }: { className?: string }) => {
	const [isLoaded, setIsLoaded] = useState(false);

	// Function to convert technology file names to readable names
	const convertTechNames = (techs: string[]): string[] => {
		const techMap: Record<string, string> = {
			'react-logo.svg': 'React',
			'nextjs-logo.svg': 'Next.js',
			'contentful-logo.svg': 'Contentful',
			'framer-motion-logo.svg': 'Framer Motion',
			'tailwind-logo.svg': 'Tailwind CSS',
			'typescript-logo.svg': 'TypeScript',
			'nodejs-logo.svg': 'Node.js',
			'express-logo.svg': 'Express',
			'postgresql-logo.svg': 'PostgreSQL',
			'mongodb-logo.svg': 'MongoDB',
			'aws-logo.svg': 'AWS',
			'docker-logo.svg': 'Docker',
			'git-logo.svg': 'Git',
			'vercel-logo.svg': 'Vercel',
			'railway-logo.svg': 'Railway',
			'supabase-logo.svg': 'Supabase',
			'prisma-logo.svg': 'Prisma',
			'drizzle-logo.svg': 'Drizzle',
			'graphql-logo.svg': 'GraphQL',
			'websocket-logo.svg': 'WebSockets',
			'jwt-logo.svg': 'JWT',
			'oauth-logo.svg': 'OAuth',
			'react-native-logo.svg': 'React Native',
			'expo-logo.svg': 'Expo',
			'pwa-logo.svg': 'PWA',
			'storybook-logo.svg': 'Storybook',
			'playwright-logo.svg': 'Playwright',
			'eslint-logo.svg': 'ESLint',
			'prettier-logo.svg': 'Prettier',
			'lighthouse-logo.svg': 'Lighthouse',
			'semrush-logo.svg': 'Semrush',
			'mui-logo.svg': 'MUI',
			'shadcn-logo.svg': 'shadcn/ui',
		};

		return techs.map(
			(tech) =>
				techMap[tech] ||
				tech
					.replace('.svg', '')
					.replace('-logo', '')
					.replace(/-/g, ' ')
					.replace(/\b\w/g, (l) => l.toUpperCase())
		);
	};

	// Transform projects data for InfiniteMenu
	const projectsData = useMemo(() => {
		return projects.map((project) => ({
			image: project.image,
			link: project.hosted || project.github || '#',
			title: project.title,
			description: project.description,
			technologies: project.technologies ? convertTechNames(project.technologies) : [],
			slug: project.slug,
		}));
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoaded(true);
		}, 100);
		return () => clearTimeout(timer);
	}, []);

	return (
		<div className={`flex gap-4 ${className} pointer-events-auto`}>
			<a
				href="https://github.com/NathanCart"
				target="_blank"
				rel="noopener noreferrer"
				className={`group relative flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-zinc-800 to-zinc-700 hover:from-zinc-700 hover:to-zinc-600 text-zinc-300 hover:text-white rounded-xl transition-all duration-300 border border-zinc-600 hover:border-zinc-500 shadow-lg hover:shadow-xl hover:shadow-zinc-900/50 transform hover:-translate-y-1 cursor-pointer ${
					isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
				}`}
				style={{
					transitionDelay: '0.1s',
					transitionDuration: '0.6s',
					transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
				}}
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
				className={`group relative flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-zinc-800 to-zinc-700 hover:from-blue-600 hover:to-blue-500 text-zinc-300 hover:text-white rounded-xl transition-all duration-300 border border-zinc-600 hover:border-blue-400 shadow-lg hover:shadow-xl hover:shadow-blue-900/50 transform hover:-translate-y-1 cursor-pointer ${
					isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
				}`}
				style={{
					transitionDelay: '0.2s',
					transitionDuration: '0.6s',
					transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
				}}
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
};

export default function FeaturedProjects() {
	const [isLoaded, setIsLoaded] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoaded(true);
		}, 100);
		return () => clearTimeout(timer);
	}, []);

	const handleProjectClick = (slug: string) => {
		router.push(`/projects/${slug}`);
	};

	// Hero content similar to homepage
	// Memoize the hero content to prevent re-renders on scroll
	const heroContent = useMemo(
		() => (
			<div className="flex items-center pointer-events-none flex-col justify-center z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-zinc-300">
				<SplitText
					text="FEATURED PROJECTS"
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
					text="Showcasing My Most Impactful Work"
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

			{/* Projects Grid */}
			<div className="max-w-7xl mx-auto px-4 py-20">
				<div className="grid gap-16">
					{/* Meta Dashboard */}
					<div
						className={`transition-all duration-1000 delay-500 ${
							isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
						}`}
					>
						<div
							onClick={() => handleProjectClick(metaDashboard.slug)}
							className="group cursor-pointer relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 hover:scale-[1.02]"
						>
							{/* Background Pattern */}
							<div
								className="absolute inset-0 opacity-50"
								style={{
									backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234f46e5' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
								}}
							></div>

							<div className="relative p-8 md:p-12">
								<div className="flex flex-col lg:flex-row items-start gap-8">
									{/* Image */}
									<div className="lg:w-1/2">
										<div className="relative group-hover:scale-105 transition-transform duration-500">
											<img
												src={metaDashboard.image}
												alt={metaDashboard.title}
												className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-2xl"
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-2xl"></div>
										</div>
									</div>

									{/* Content */}
									<div className="lg:w-1/2 space-y-6">
										<div className="space-y-4">
											<div className="flex items-center gap-3">
												<div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
												<span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">
													Enterprise Platform
												</span>
											</div>
											<h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
												{metaDashboard.title}
											</h2>
											<p className="text-xl text-zinc-300 leading-relaxed">
												{metaDashboard.description}
											</p>
										</div>

										{/* Technologies */}
										<div className="space-y-3">
											<h3 className="text-lg font-semibold text-blue-300">
												Technologies
											</h3>
											<div className="flex flex-wrap gap-2">
												{metaDashboard.technologies.map((tech, index) => (
													<span
														key={tech}
														className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-sm font-medium"
													>
														{tech}
													</span>
												))}
											</div>
										</div>

										{/* CTA */}
										<div className="pt-4">
											<button className="group/btn relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer">
												<span className="relative z-10">View Project</span>
												<div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Pipify */}
					<div
						className={`transition-all duration-1000 delay-700 ${
							isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
						}`}
					>
						<div
							onClick={() => handleProjectClick(pipify.slug)}
							className="group cursor-pointer relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/20 hover:border-green-400/40 transition-all duration-500 hover:scale-[1.02]"
						>
							{/* Background Pattern */}
							<div
								className="absolute inset-0 opacity-50"
								style={{
									backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2316a34a' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
								}}
							></div>

							<div className="relative p-8 md:p-12">
								<div className="flex flex-col lg:flex-row-reverse items-start gap-8">
									{/* Image */}
									<div className="lg:w-1/2">
										<div className="relative group-hover:scale-105 transition-transform duration-500">
											<img
												src={pipify.image}
												alt={pipify.title}
												className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-2xl"
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent rounded-2xl"></div>
										</div>
									</div>

									{/* Content */}
									<div className="lg:w-1/2 space-y-6">
										<div className="space-y-4">
											<div className="flex items-center gap-3">
												<div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
												<span className="text-green-400 font-semibold text-sm uppercase tracking-wider">
													Mobile App
												</span>
											</div>
											<h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
												{pipify.title}
											</h2>
											<p className="text-xl text-zinc-300 leading-relaxed">
												{pipify.description}
											</p>
										</div>

										{/* Technologies */}
										<div className="space-y-3">
											<h3 className="text-lg font-semibold text-green-300">
												Technologies
											</h3>
											<div className="flex flex-wrap gap-2">
												{pipify.technologies.map((tech, index) => (
													<span
														key={tech}
														className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-300 text-sm font-medium"
													>
														{tech}
													</span>
												))}
											</div>
										</div>

										{/* CTA */}
										<div className="pt-4">
											<button className="group/btn relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer">
												<span className="relative z-10">View Project</span>
												<div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Samsung Smart Things - Improved */}
					<div
						className={`transition-all duration-1000 delay-900 ${
							isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
						}`}
					>
						<div
							onClick={() => handleProjectClick(samsungSmartThings.slug)}
							className="group cursor-pointer relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/20 to-gray-900/20 border border-slate-500/20 hover:border-slate-400/40 transition-all duration-500 hover:scale-[1.02]"
						>
							{/* Enhanced Background Pattern */}
							<div
								className="absolute inset-0 opacity-50"
								style={{
									backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2364758b' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
								}}
							></div>

							{/* Floating Elements for Samsung Theme */}
							<div className="absolute top-4 right-4 w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
							<div className="absolute bottom-4 left-4 w-3 h-3 bg-gray-400 rounded-full animate-pulse delay-1000"></div>
							<div className="absolute top-1/2 right-8 w-1 h-1 bg-slate-300 rounded-full animate-pulse delay-2000"></div>

							<div className="relative p-8 md:p-12">
								<div className="flex flex-col lg:flex-row items-start gap-8">
									{/* Image - Improved with object-contain */}
									<div className="lg:w-1/2">
										<div className="relative group-hover:scale-105 transition-transform duration-500 bg-slate-800/30 rounded-2xl p-4">
											<img
												src={samsungSmartThings.image}
												alt={samsungSmartThings.title}
												className="w-full h-64 md:h-80 object-contain rounded-xl shadow-2xl"
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent rounded-xl"></div>
										</div>
									</div>

									{/* Content */}
									<div className="lg:w-1/2 space-y-6">
										<div className="space-y-4">
											<div className="flex items-center gap-3">
												<div className="w-3 h-3 bg-slate-400 rounded-full animate-pulse"></div>
												<span className="text-slate-400 font-semibold text-sm uppercase tracking-wider">
													Interactive Experience
												</span>
											</div>
											<h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-400 to-gray-400 bg-clip-text text-transparent">
												{samsungSmartThings.title}
											</h2>
											<p className="text-xl text-zinc-300 leading-relaxed">
												{samsungSmartThings.description}
											</p>
										</div>

										{/* Technologies */}
										<div className="space-y-3">
											<h3 className="text-lg font-semibold text-slate-300">
												Technologies
											</h3>
											<div className="flex flex-wrap gap-2">
												{samsungSmartThings.technologies.map(
													(tech, index) => (
														<span
															key={tech}
															className="px-3 py-1 bg-slate-500/10 border border-slate-500/20 rounded-full text-slate-300 text-sm font-medium"
														>
															{tech}
														</span>
													)
												)}
											</div>
										</div>

										{/* Enhanced CTA */}
										<div className="pt-4">
											<button className="group/btn relative px-8 py-4 bg-gradient-to-r from-slate-500 to-gray-500 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer">
												<span className="relative z-10">View Project</span>
												<div className="absolute inset-0 bg-gradient-to-r from-slate-600 to-gray-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Project Navigation Bubbles */}
			<ProjectBubbles
				projects={projects.map((project) => ({
					slug: project.slug || '',
					title: project.title,
					image: project.image,
					description: project.description,
				}))}
			/>
		</main>
	);
}
