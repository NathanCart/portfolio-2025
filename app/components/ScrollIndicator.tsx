'use client';
import { useEffect, useState } from 'react';

export default function ScrollIndicator() {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const handleScroll = () => {
			if (typeof window === 'undefined') return;
			const scrollY = window.scrollY;
			const windowHeight = window.innerHeight;

			// Hide indicator when user scrolls down more than 20% of viewport height
			if (scrollY > windowHeight * 0.2) {
				setIsVisible(false);
			} else {
				setIsVisible(true);
			}
		};

		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', handleScroll, { passive: true });
			return () => window.removeEventListener('scroll', handleScroll);
		}
	}, []);

	return (
		<div
			className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 transition-opacity duration-500 ${
				isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
			}`}
		>
			<div className="flex flex-col items-center text-zinc-400">
				<span className="text-sm font-medium mb-2 tracking-wider">Scroll Down</span>
				<div className="animate-bounce">
					<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 14l-7 7m0 0l-7-7m7 7V3"
						/>
					</svg>
				</div>
			</div>
		</div>
	);
}
