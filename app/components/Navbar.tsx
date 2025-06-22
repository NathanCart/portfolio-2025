'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const router = useRouter();
	const pathname = usePathname();
	const isHomePage = pathname === '/';
	const mobileMenuRef = useRef<HTMLDivElement>(null);
	const mobileButtonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
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

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				isScrolled
					? 'bg-zinc-900/95 backdrop-blur-md border-b border-zinc-800'
					: 'bg-transparent'
			}`}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-center h-20">
					{/* Navigation Links - Centered */}
					<div className="hidden md:flex items-center space-x-2">
						<button
							onClick={() => scrollToSection('about')}
							className="relative px-8 py-4 text-zinc-300 hover:text-white font-semibold text-lg transition-all duration-300 group cursor-pointer"
						>
							<span className="relative z-10">About</span>
							<div className="absolute inset-0 bg-zinc-800/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
							<div className="absolute bottom-0 left-1/2 w-0 h-1 bg-white group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
						</button>
						<button
							onClick={() => scrollToSection('skills')}
							className="relative px-8 py-4 text-zinc-300 hover:text-white font-semibold text-lg transition-all duration-300 group cursor-pointer"
						>
							<span className="relative z-10">Skills</span>
							<div className="absolute inset-0 bg-zinc-800/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
							<div className="absolute bottom-0 left-1/2 w-0 h-1 bg-white group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
						</button>
						<button
							onClick={() => scrollToSection('projects')}
							className="relative px-8 py-4 text-zinc-300 hover:text-white font-semibold text-lg transition-all duration-300 group cursor-pointer"
						>
							<span className="relative z-10">Projects</span>
							<div className="absolute inset-0 bg-zinc-800/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
							<div className="absolute bottom-0 left-1/2 w-0 h-1 bg-white group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
						</button>
					</div>

					{/* Mobile menu button - Centered */}
					<div className="md:hidden">
						<button
							ref={mobileButtonRef}
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className="text-zinc-300 hover:text-white p-3 rounded-lg hover:bg-zinc-800/50 transition-all duration-300 cursor-pointer"
							aria-label="Toggle mobile menu"
						>
							<svg
								className={`h-8 w-8 transition-transform duration-300 ${
									isMobileMenuOpen ? 'rotate-90' : 'rotate-0'
								}`}
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
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
							className="w-full text-left px-4 py-3 text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-lg font-semibold transition-all duration-300 group relative"
						>
							<span className="relative z-10">About</span>
							<div className="absolute bottom-0 left-0 w-0 h-1 bg-white group-hover:w-full transition-all duration-300"></div>
						</button>
						<button
							onClick={() => scrollToSection('skills')}
							className="w-full text-left px-4 py-3 text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-lg font-semibold transition-all duration-300 group relative"
						>
							<span className="relative z-10">Skills</span>
							<div className="absolute bottom-0 left-0 w-0 h-1 bg-white group-hover:w-full transition-all duration-300"></div>
						</button>
						<button
							onClick={() => scrollToSection('projects')}
							className="w-full text-left px-4 py-3 text-zinc-300 hover:text-white hover:bg-zinc-800/50 rounded-lg font-semibold transition-all duration-300 group relative"
						>
							<span className="relative z-10">Projects</span>
							<div className="absolute bottom-0 left-0 w-0 h-1 bg-white group-hover:w-full transition-all duration-300"></div>
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
}
