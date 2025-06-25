'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const [isOverProjects, setIsOverProjects] = useState(false);
	const router = useRouter();
	const pathname = usePathname();
	const isHomePage = pathname === '/';
	const mobileMenuRef = useRef<HTMLDivElement>(null);
	const mobileButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		// Trigger animation after component mounts
		const timer = setTimeout(() => {
			setIsLoaded(true);
		}, 100);

		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);

			// Check if we're over the projects section
			const projectsSection = document.getElementById('projects');
			if (projectsSection) {
				const rect = projectsSection.getBoundingClientRect();
				const isOver = rect.top <= 100 && rect.bottom >= 100;
				setIsOverProjects(isOver);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Close mobile menu when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isMobileMenuOpen &&
				mobileMenuRef.current &&
				!mobileMenuRef.current.contains(event.target as Node) &&
				mobileButtonRef.current &&
				!mobileButtonRef.current.contains(event.target as Node)
			) {
				setIsMobileMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [isMobileMenuOpen]);

	// Close mobile menu on route change
	useEffect(() => {
		setIsMobileMenuOpen(false);
	}, [pathname]);

	const scrollToSection = (sectionId: string) => {
		// Close mobile menu when navigating
		setIsMobileMenuOpen(false);

		if (!isHomePage) {
			// If we're on a project page, navigate to home first
			router.push('/');
			// Wait for navigation to complete before scrolling
			setTimeout(() => {
				scrollToSectionOnHome(sectionId);
			}, 500); // Increased timeout to ensure navigation completes
		} else {
			scrollToSectionOnHome(sectionId);
		}
	};

	const scrollToSectionOnHome = (sectionId: string) => {
		// Add a small delay to ensure DOM is ready
		setTimeout(() => {
			if (sectionId === 'about') {
				// For the about section, scroll to a position that shows the About section properly
				window.scrollTo({
					top: window.innerHeight * 0.8,
					behavior: 'smooth',
				});
			} else if (sectionId === 'projects') {
				// For projects section, scroll to the projects section
				const element = document.getElementById(sectionId);
				if (element) {
					element.scrollIntoView({ behavior: 'smooth' });
				} else {
					// Fallback: scroll to a position where projects should be
					window.scrollTo({
						top: window.innerHeight * 2.5, // Approximate position of projects section
						behavior: 'smooth',
					});
				}
			} else {
				// For other sections, use normal scroll behavior
				const element = document.getElementById(sectionId);
				if (element) {
					element.scrollIntoView({ behavior: 'smooth' });
				} else {
					// Retry once more after a short delay in case DOM wasn't ready
					setTimeout(() => {
						const retryElement = document.getElementById(sectionId);
						if (retryElement) {
							retryElement.scrollIntoView({ behavior: 'smooth' });
						}
					}, 200);
				}
			}
		}, 100);
	};

	const navigateToFeatured = () => {
		setIsMobileMenuOpen(false);
		router.push('/featured');
	};

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out cursor-pointer ${
				isScrolled
					? 'bg-zinc-900/95 backdrop-blur-md border-b border-zinc-800'
					: 'bg-transparent'
			} ${isOverProjects ? '-translate-y-full' : 'translate-y-0'}`}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-center h-20">
					{/* Navigation Links - Centered */}
					<div className="hidden md:flex items-center space-x-2">
						<button
							onClick={() => scrollToSection('about')}
							className={`group relative px-8 py-4 text-zinc-300 hover:text-white font-semibold text-lg transition-all duration-700 transform ${
								isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
							} hover:scale-105 hover:bg-zinc-800/30 rounded-lg cursor-pointer`}
							style={{ transitionDelay: '0.1s' }}
						>
							<span className="relative z-10">About</span>
							<div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
							<div className="absolute bottom-0 left-1/2 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full"></div>
						</button>
						<button
							onClick={() => scrollToSection('skills')}
							className={`group relative px-8 py-4 text-zinc-300 hover:text-white font-semibold text-lg transition-all duration-700 transform ${
								isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
							} hover:scale-105 hover:bg-zinc-800/30 rounded-lg cursor-pointer`}
							style={{ transitionDelay: '0.2s' }}
						>
							<span className="relative z-10">Skills</span>
							<div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
							<div className="absolute bottom-0 left-1/2 w-0 h-1 bg-gradient-to-r from-green-500 to-teal-500 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full"></div>
						</button>
						<button
							onClick={() => scrollToSection('projects')}
							className={`group relative px-8 py-4 text-zinc-300 hover:text-white font-semibold text-lg transition-all duration-700 transform ${
								isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
							} hover:scale-105 hover:bg-zinc-800/30 rounded-lg cursor-pointer`}
							style={{ transitionDelay: '0.3s' }}
						>
							<span className="relative z-10">Projects</span>
							<div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
							<div className="absolute bottom-0 left-1/2 w-0 h-1 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full"></div>
						</button>
						<button
							onClick={navigateToFeatured}
							className={`group relative px-8 py-4 text-zinc-300 hover:text-white font-semibold text-lg transition-all duration-700 transform ${
								isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
							} hover:scale-105 hover:bg-zinc-800/30 rounded-lg cursor-pointer`}
							style={{ transitionDelay: '0.4s' }}
						>
							<span className="relative z-10">Featured Projects</span>
							<div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
							<div className="absolute bottom-0 left-1/2 w-0 h-1 bg-gradient-to-r from-indigo-500 to-pink-500 group-hover:w-full group-hover:left-0 transition-all duration-300 rounded-full"></div>
						</button>
					</div>

					{/* Mobile menu button - Centered */}
					<div className="md:hidden">
						<button
							ref={mobileButtonRef}
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className={`group text-zinc-300 hover:text-white p-3 rounded-lg hover:bg-zinc-800/50 transition-all duration-700 transform ${
								isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
							} hover:scale-110 cursor-pointer`}
							style={{ transitionDelay: '0.1s' }}
							aria-label="Toggle mobile menu"
						>
							<div className="relative h-8 w-8">
								{/* Hamburger lines */}
								<span
									className={`absolute left-0 top-0 h-0.5 w-8 bg-current transform transition-all duration-300 ${
										isMobileMenuOpen
											? 'rotate-45 translate-y-3'
											: 'rotate-0 translate-y-0'
									}`}
								></span>
								<span
									className={`absolute left-0 top-3 h-0.5 w-8 bg-current transform transition-all duration-300 ${
										isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
									}`}
								></span>
								<span
									className={`absolute left-0 top-6 h-0.5 w-8 bg-current transform transition-all duration-300 ${
										isMobileMenuOpen
											? '-rotate-45 -translate-y-3'
											: 'rotate-0 translate-y-0'
									}`}
								></span>
							</div>
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				<div
					ref={mobileMenuRef}
					className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
						isMobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
					}`}
				>
					<div className="pb-4 space-y-2 bg-zinc-900/95 backdrop-blur-md rounded-lg border border-zinc-800/50 mt-2">
						<button
							onClick={() => scrollToSection('about')}
							className="group w-full text-left px-4 py-3 text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-lg font-semibold transition-all duration-300 relative hover:scale-105 cursor-pointer"
						>
							<span className="relative z-10">About</span>
							<div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300 rounded-full"></div>
						</button>
						<button
							onClick={() => scrollToSection('skills')}
							className="group w-full text-left px-4 py-3 text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-lg font-semibold transition-all duration-300 relative hover:scale-105 cursor-pointer"
						>
							<span className="relative z-10">Skills</span>
							<div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-green-500 to-teal-500 group-hover:w-full transition-all duration-300 rounded-full"></div>
						</button>
						<button
							onClick={() => scrollToSection('projects')}
							className="group w-full text-left px-4 py-3 text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-lg font-semibold transition-all duration-300 relative hover:scale-105 cursor-pointer"
						>
							<span className="relative z-10">Projects</span>
							<div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-orange-500 to-red-500 group-hover:w-full transition-all duration-300 rounded-full"></div>
						</button>
						<button
							onClick={navigateToFeatured}
							className="group w-full text-left px-4 py-3 text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-lg font-semibold transition-all duration-300 relative hover:scale-105 cursor-pointer"
						>
							<span className="relative z-10">Featured</span>
							<div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-indigo-500 to-pink-500 group-hover:w-full transition-all duration-300 rounded-full"></div>
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
}
