import { useState, useEffect } from 'react';

export const useIsMobile = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkIsMobile = () => {
			// Check for mobile devices using screen width and user agent
			const isMobileByWidth = window.innerWidth < 1440;
			const isMobileByAgent =
				/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
					navigator.userAgent
				);

			setIsMobile(isMobileByWidth || isMobileByAgent);
		};

		// Check on mount
		checkIsMobile();

		// Add resize listener
		window.addEventListener('resize', checkIsMobile);

		return () => {
			window.removeEventListener('resize', checkIsMobile);
		};
	}, []);

	return isMobile;
};
