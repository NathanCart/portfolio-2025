'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Project } from '../index';
import Navbar from '../../components/Navbar';
import Particles from '../../components/Particles';
import ProjectBubbles from '../../components/ProjectBubbles';
import projects from '../index';

interface Props {
	project: Project;
}

export default function ProjectDetailClient({ project }: Props) {
	const router = useRouter();

	const handleBackToProjects = () => {
		// Navigate to home page and scroll to projects section
		router.push('/');
		// Wait for navigation to complete before scrolling
		setTimeout(() => {
			const projectsElement = document.getElementById('projects');
			if (projectsElement) {
				projectsElement.scrollIntoView({ behavior: 'smooth' });
			} else {
				// Retry once more after a short delay in case DOM wasn't ready
				setTimeout(() => {
					const retryElement = document.getElementById('projects');
					if (retryElement) {
						retryElement.scrollIntoView({ behavior: 'smooth' });
					} else {
						// Final fallback: scroll to a position where projects should be
						window.scrollTo({
							top: window.innerHeight * 2.5, // Approximate position of projects section
							behavior: 'smooth',
						});
					}
				}, 200);
			}
		}, 500); // Increased timeout to ensure navigation completes
	};

	return (
		<div className="min-h-screen bg-zinc-900 relative overflow-hidden">
			{/* Particles Background */}
			<div
				style={{
					width: '100%',
					height: '100vh',
					position: 'fixed',
					top: 0,
					left: 0,
					zIndex: 1,
				}}
			>
				<Particles
					particleColors={['#ffffff', '#ffffff']}
					particleCount={200}
					particleSpread={10}
					speed={0.1}
					particleBaseSize={100}
					moveParticlesOnHover={true}
					alphaParticles={true}
					disableRotation={false}
				/>
			</div>

			<Navbar />

			{/* Back Button */}
			<div className="relative z-10 pt-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
				<button
					onClick={handleBackToProjects}
					className="flex cursor-pointer items-center gap-2 text-zinc-400 hover:text-white transition-colors duration-300 mb-8 group"
				>
					<svg
						className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 19l-7-7 7-7"
						/>
					</svg>
					<span>Back to Projects</span>
				</button>
			</div>

			{/* Hero Section */}
			<div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-16">
				<div className="max-w-6xl mx-auto">
					{/* Project Image */}
					<div className="relative h-64 sm:h-80 lg:h-96 w-64 sm:w-80 lg:w-96 rounded-2xl overflow-hidden mb-8">
						<Image
							src={project.image}
							alt={project.title}
							fill
							className="object-cover"
							sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-zinc-900/20 to-transparent" />
					</div>

					{/* Project Header */}
					<div className="mb-12">
						<h1 className="text-4xl sm:text-5xl font-black lg:text-6xl text-zinc-300 mb-4 uppercase">
							{project.title}
						</h1>
						<p className="text-xl text-zinc-400 mb-6 max-w-3xl">
							{project.description}
						</p>

						{/* Project Links */}
						<div className="flex flex-wrap gap-4 mb-8">
							{project.hosted && (
								<a
									href={project.hosted}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105"
								>
									<svg
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
										/>
									</svg>
									View Live Site
								</a>
							)}
							{project.github && (
								<a
									href={project.github}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-2 px-6 py-3 bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-full font-medium hover:bg-zinc-700 hover:border-zinc-600 hover:text-white transition-all duration-300 hover:scale-105"
								>
									<svg
										className="w-5 h-5"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.239 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
									</svg>
									View Code
								</a>
							)}
						</div>

						{/* Technologies */}
						<div className="mb-8">
							<h3 className="text-lg font-semibold text-zinc-400 mb-4 uppercase tracking-wide">
								Technologies Used
							</h3>
							<div className="flex flex-wrap gap-3">
								{project.technologies.map((tech, index) => (
									<span
										key={index}
										className="px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full text-sm text-zinc-300 font-medium"
									>
										{tech}
									</span>
								))}
							</div>
						</div>
					</div>

					{/* Project Details */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
						{/* What */}
						<div>
							<h2 className="text-2xl font-bold text-zinc-300 mb-4 uppercase tracking-wide">
								What
							</h2>
							<p className="text-zinc-400 leading-relaxed">{project.what}</p>
						</div>

						{/* How */}
						<div>
							<h2 className="text-2xl font-bold text-zinc-300 mb-4 uppercase tracking-wide">
								How
							</h2>
							<p className="text-zinc-400 leading-relaxed">{project.how}</p>
						</div>
					</div>

					{/* Conclusion */}
					<div className="mt-12 p-8 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-2xl">
						<h2 className="text-2xl font-bold text-zinc-300 mb-4 uppercase tracking-wide">
							Conclusion
						</h2>
						<p className="text-zinc-400 leading-relaxed">{project.conclusion}</p>
					</div>
				</div>
			</div>

			{/* Project Bubbles - Easy access to other projects */}
			<ProjectBubbles projects={projects} />
		</div>
	);
}
