import { Project } from '.';

const armaKarmaVeygo: Project = {
	seoTitle: 'Arma Karma/Veygo Journey | Nathan Carter Web Developer',
	seoDescription:
		'Multi-tenant insurance journey platform for Arma Karma and Veygo, featuring dynamic configuration management and seamless user experience.',
	slug: 'arma-karma-veygo',
	hosted: 'https://get-started.armakarma.insure/item-selection',
	image: '/work/arma-karma/ak-cover.webp',
	title: 'Arma Karma/Veygo Journey',
	description:
		'Multi-tenant insurance journey platform enabling users to select and customize insurance coverage with dynamic branding and configuration management.',
	what: 'Arma Karma and Veygo needed a flexible insurance journey platform that could serve multiple insurance brands with different configurations, styling, and product offerings. The platform required dynamic content management, customizable user flows, and seamless integration with insurance underwriting systems. The goal was to create a single codebase that could be configured for different insurance brands while maintaining consistent user experience and performance.',
	technologies: [
		'Next.js',
		'React',
		'TypeScript',
		'Material-UI',
		'Node.js',
		'Express.js',
		'PostgreSQL',
		'Redis',
		'Vercel',
	],
	how: 'Built a multi-tenant insurance platform using Next.js 14 with TypeScript for optimal performance and type safety. Implemented dynamic configuration management using environment variables and database-driven settings to support different insurance brands (Arma Karma and Veygo) with unique styling, product offerings, and user flows. Created a responsive Material-UI interface that adapts to different brand requirements. Developed a Node.js/Express.js backend with PostgreSQL for data management and Redis for caching. The platform features dynamic content loading, customizable insurance product selection, and seamless integration with external insurance systems.',
	conclusion:
		'The Arma Karma/Veygo insurance journey platform successfully delivered a flexible, multi-tenant solution that serves multiple insurance brands from a single codebase. The project demonstrated expertise in building scalable, configurable applications with dynamic content management. Key achievements include implementing multi-tenant architecture, creating dynamic configuration systems, and building seamless insurance product selection workflows. The platform continues to serve both Arma Karma and Veygo effectively, providing users with intuitive insurance selection experiences.',
};

export default armaKarmaVeygo;
