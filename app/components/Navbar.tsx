'use client';
import { useState, useEffect } from 'react';

export default function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const scrollToSection = (sectionId: string) => {
		if (sectionId === 'about') {
			// For the about section, scroll to a position that shows the About section properly
			window.scrollTo({
				top: window.innerHeight * 1.2,
				behavior: 'smooth',
			});
		} else {
			// For other sections, use normal scroll behavior
			const element = document.getElementById(sectionId);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
			}
		}
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
						<button className="text-zinc-300 hover:text-white p-3 rounded-lg hover:bg-zinc-800/50 transition-all duration-300 cursor-pointer">
							<svg
								className="h-8 w-8"
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
			</div>
		</nav>
	);
}
