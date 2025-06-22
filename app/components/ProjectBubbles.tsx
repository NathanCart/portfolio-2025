'use client';
import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

interface Project {
	slug: string;
	title: string;
	image: string;
	description: string;
}

interface ProjectBubblesProps {
	projects: Project[];
	className?: string;
}

const ProjectBubbles: FC<ProjectBubblesProps> = ({ projects, className = '' }) => {
	const router = useRouter();
	const isMobile = useIsMobile();
	const [isVisible, setIsVisible] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const [hoveredProject, setHoveredProject] = useState<string | null>(null);
	const [isMounted, setIsMounted] = useState(false);

	// Handle mounting and initial visibility
	useEffect(() => {
		setIsMounted(true);
		const timer = setTimeout(() => setIsVisible(true), 800);
		return () => clearTimeout(timer);
	}, []);

	const handleBubbleClick = (slug: string) => {
		router.push(`/projects/${slug}`);
	};

	const toggleExpanded = () => {
		if (isExpanded) {
			// Start closing animation
			setIsClosing(true);
			// Short delay to allow exit animation to start
			setTimeout(() => {
				setIsExpanded(false);
				setIsClosing(false);
			}, 100);
		} else {
			setIsExpanded(true);
		}
	};

	// Calculate optimal layout based on number of projects
	const getLayoutConfig = () => {
		const projectCount = projects.length;

		if (projectCount <= 4) {
			return {
				rows: 2,
				cols: 2,
				spacing: isMobile ? 70 : 100,
			};
		} else if (projectCount <= 6) {
			return {
				rows: 2,
				cols: 3,
				spacing: isMobile ? 65 : 90,
			};
		} else if (projectCount <= 9) {
			return {
				rows: 3,
				cols: 3,
				spacing: isMobile ? 60 : 85,
			};
		} else {
			return {
				rows: Math.ceil(Math.sqrt(projectCount)),
				cols: Math.ceil(projectCount / Math.ceil(Math.sqrt(projectCount))),
				spacing: isMobile ? 55 : 80,
			};
		}
	};

	// Calculate container size based on layout
	const getContainerSize = () => {
		const config = getLayoutConfig();
		const bubbleSize = isMobile ? 50 : 70; // Larger bubbles on desktop
		const width = config.cols * config.spacing + bubbleSize;
		const height = config.rows * config.spacing + bubbleSize;
		return { width, height };
	};

	// Don't render until mounted to prevent hydration issues
	if (!isMounted) return null;
	if (!isVisible) return null;

	const layoutConfig = getLayoutConfig();
	const containerSize = getContainerSize();

	return (
		<div
			className={`fixed ${
				isMobile ? 'bottom-4 right-4' : 'bottom-6 right-6'
			} z-50 ${className}`}
		>
			{/* Main toggle button */}
			<motion.button
				initial={{ scale: 0, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ delay: 0.1, duration: 0.3, type: 'spring', stiffness: 300 }}
				onClick={toggleExpanded}
				className={`relative ${
					isMobile ? 'w-auto px-3 py-2' : 'w-auto px-4 py-3'
				} bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/25 border-2 border-white/20 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-110 cursor-pointer group z-10`}
			>
				{/* Icon */}
				<div className="flex items-center gap-2 relative">
					<div
						className={`${
							isMobile ? 'w-4 h-4' : 'w-5 h-5'
						} relative flex items-center justify-center`}
					>
						{/* Plus Icon */}
						<motion.svg
							className="text-white absolute inset-0 w-full h-full"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							animate={{
								opacity: isExpanded || isClosing ? 0 : 1,
								scale: isExpanded || isClosing ? 0.8 : 1,
							}}
							transition={{ duration: 0.15 }}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 4v16m8-8H4"
							/>
						</motion.svg>

						{/* X Icon */}
						<motion.svg
							className="text-white absolute inset-0 w-full h-full"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							animate={{
								opacity: isExpanded || isClosing ? 1 : 0,
								scale: isExpanded || isClosing ? 1 : 0.8,
							}}
							transition={{ duration: 0.15 }}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</motion.svg>
					</div>

					{/* Projects text - always rendered but animated */}
					<motion.span
						animate={{
							opacity: isExpanded || isClosing ? 0 : 1,
							width: isExpanded || isClosing ? 0 : 'auto',
							marginLeft: isExpanded || isClosing ? 0 : 8,
						}}
						transition={{ duration: 0.2, type: 'spring', stiffness: 300 }}
						className={`${
							isMobile ? 'text-xs' : 'text-sm'
						} font-semibold text-white whitespace-nowrap overflow-hidden`}
						style={{
							display: isExpanded || isClosing ? 'none' : 'inline-block',
						}}
					>
						Projects
					</motion.span>
				</div>

				{/* Project count badge - always rendered but animated */}
				<motion.div
					animate={{
						scale: isExpanded || isClosing ? 0 : 1,
						opacity: isExpanded || isClosing ? 0 : 1,
					}}
					transition={{ duration: 0.2, type: 'spring', stiffness: 400 }}
					className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow-lg"
				>
					{projects.length}
				</motion.div>

				{/* Pulse effect */}
				<motion.div
					className="absolute inset-0 rounded-full border-2 border-white/30"
					animate={{
						scale: [1, 1.1, 1],
						opacity: [0.3, 0.6, 0.3],
					}}
					transition={{
						duration: 2,
						repeat: Infinity,
						delay: 0.8,
					}}
				/>
			</motion.button>

			{/* Project bubbles container */}
			<AnimatePresence mode="wait">
				{isExpanded && (
					<motion.div
						key="bubbles-container"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="absolute bottom-0 right-0 pointer-events-none"
						style={{
							width: `${containerSize.width}px`,
							height: `${containerSize.height}px`,
						}}
					>
						{/* Projects label */}
						<motion.div
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								delay: 0.05,
								duration: 0.2,
								type: 'spring',
								stiffness: 300,
							}}
							className="absolute -top-12 left-1/2 transform -translate-x-1/2 text-center pointer-events-none"
						>
							<div className="text-sm font-bold text-white bg-zinc-900/90 backdrop-blur-sm px-4 py-2 rounded-full border border-zinc-700/50 shadow-lg">
								<span className="text-blue-400">📁</span> My Projects
							</div>
						</motion.div>

						{projects.map((project, index) => {
							// Calculate grid position
							const row = Math.floor(index / layoutConfig.cols);
							const col = index % layoutConfig.cols;

							const centerX = isMobile ? 56 : 64; // Half of button width
							const centerY = isMobile ? 56 : 64; // Half of button height

							// Position bubbles in a grid pattern
							const x =
								centerX +
								(col - (layoutConfig.cols - 1) / 2) * layoutConfig.spacing;
							const y =
								centerY +
								(row - (layoutConfig.rows - 1) / 2) * layoutConfig.spacing;

							return (
								<motion.div
									key={project.slug}
									initial={{ scale: 0, opacity: 0, x: centerX, y: centerY }}
									animate={{
										scale: 1,
										opacity: 1,
										x: x - (isMobile ? 25 : 35), // Center the larger bubble
										y: y - (isMobile ? 25 : 35), // Center the larger bubble
									}}
									exit={{
										scale: 0,
										opacity: 0,
									}}
									transition={{
										delay: 0.1 + index * 0.02,
										duration: 0.25,
										type: 'spring',
										stiffness: 400,
										damping: 25,
									}}
									onClick={() => handleBubbleClick(project.slug)}
									className="absolute cursor-pointer pointer-events-auto"
									style={{
										transformOrigin: 'center',
										willChange: 'transform',
									}}
								>
									{/* Bubble */}
									<div className="relative">
										{/* Enhanced glow effect */}
										<motion.div
											className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-lg opacity-0 scale-125"
											animate={{
												scale: hoveredProject === project.slug ? 1.3 : 1.25,
												opacity: hoveredProject === project.slug ? 0.7 : 0,
											}}
											transition={{ duration: 0.2 }}
										/>

										{/* Main bubble */}
										<motion.div
											className={`relative ${
												isMobile ? 'w-12 h-12' : 'w-16 h-16'
											} bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-full border-2 border-zinc-600/50 shadow-xl overflow-hidden transition-all duration-200`}
											whileHover={{
												scale: 1.15,
												y: -8,
												boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
											}}
											whileTap={{ scale: 0.95 }}
											onHoverStart={() => setHoveredProject(project.slug)}
											onHoverEnd={() => setHoveredProject(null)}
											animate={{
												borderColor:
													hoveredProject === project.slug
														? 'rgba(59, 130, 246, 0.8)'
														: 'rgba(82, 82, 91, 0.5)',
											}}
											style={{
												transformOrigin: 'center',
												willChange: 'transform',
											}}
										>
											<Image
												src={project.image}
												alt={project.title}
												fill
												className="object-cover rounded-full"
												sizes={isMobile ? '48px' : '64px'}
											/>

											{/* Enhanced overlay */}
											<div className="absolute inset-0 bg-gradient-to-br from-black/30 to-transparent rounded-full transition-all duration-200" />

											{/* Project indicator overlay */}
											<div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 hover:from-blue-500/20 hover:to-purple-500/20 rounded-full transition-all duration-200" />

											{/* Pulse animation */}
											<motion.div
												className="absolute inset-0 rounded-full border-2 border-blue-400/30"
												animate={{
													scale: [1, 1.2, 1],
													opacity: [0.3, 0.6, 0.3],
												}}
												transition={{
													duration: 2,
													repeat: Infinity,
													delay: index * 0.1,
												}}
											/>

											{/* Project icon overlay */}
											<div className="absolute top-1 right-1 w-4 h-4 bg-blue-500/80 rounded-full flex items-center justify-center">
												<svg
													className="w-2 h-2 text-white"
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
										</motion.div>

										{/* Enhanced tooltip */}
										<AnimatePresence>
											{hoveredProject === project.slug && (
												<motion.div
													initial={{
														opacity: 0,
														scale: 0.8,
														y: 10,
														x: -50,
													}}
													animate={{ opacity: 1, scale: 1, y: 0, x: -50 }}
													exit={{ opacity: 0, scale: 0.8, y: 10, x: -50 }}
													transition={{
														duration: 0.15,
														type: 'spring',
														stiffness: 400,
													}}
													className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 px-4 py-3 bg-zinc-900/95 backdrop-blur-sm border border-zinc-700/50 rounded-xl shadow-2xl pointer-events-none z-20 min-w-[200px] max-w-[280px]"
													style={{
														transformOrigin: 'center bottom',
														willChange: 'transform',
													}}
												>
													{/* Project title */}
													<div className="text-sm font-bold text-white mb-2 flex items-center gap-2">
														<div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
														{project.title}
													</div>

													{/* Project description */}
													<div className="text-xs text-zinc-300 leading-relaxed line-clamp-3">
														{project.description}
													</div>

													{/* Click hint */}
													<div className="text-xs text-blue-400 font-medium mt-2 flex items-center gap-1">
														<svg
															className="w-3 h-3"
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
														Click to view project
													</div>

													{/* Arrow */}
													<div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-zinc-900/95" />
												</motion.div>
											)}
										</AnimatePresence>
									</div>
								</motion.div>
							);
						})}

						{/* Enhanced instructions */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								delay: 0.15,
								duration: 0.2,
								type: 'spring',
								stiffness: 300,
							}}
							className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-center pointer-events-none"
						>
							<div className="text-xs text-zinc-400 bg-zinc-900/80 backdrop-blur-sm px-4 py-2 rounded-full border border-zinc-700/50 shadow-lg">
								<span className="font-medium text-blue-400">{projects.length}</span>{' '}
								projects available • Hover for details
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default ProjectBubbles;
