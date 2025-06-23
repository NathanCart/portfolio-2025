import { Project } from '.';

const ballen: Project = {
	seoTitle: 'Ballen Dashboard | Nathan Carter Web Developer',
	seoDescription:
		'AI-powered content management dashboard for Ballen Studios, featuring web scraping, machine learning categorization, and comprehensive story research tools.',
	slug: 'ballen-dashboard',
	image: '/work/ballen.webp',
	title: 'Ballen Dashboard',
	description:
		'AI-powered content management system for Ballen Studios, enabling researchers to access and categorize thousands of horror stories for YouTube content creation.',
	what: 'Ballen Studios needed a sophisticated content management system to support their YouTube horror story content creation. The platform required web scraping capabilities to collect horror stories from various sources, AI-powered categorization to organize content, and an intuitive interface for researchers to review and refine the AI classifications. The system needed to handle thousands of articles while providing efficient workflow management for content researchers.',
	technologies: [
		'React',
		'TypeScript',
		'Material-UI',
		'Node.js',
		'Express.js',
		'Python',
		'Django',
		'PostgreSQL',
	],
	how: 'Developed a full-stack application using React with TypeScript and Material-UI for the frontend, creating complex forms with autocomplete functionality and file management systems. Built a Node.js/Express.js API that seamlessly integrates with a Django Python backend responsible for web scraping and AI model training. Implemented an AI training system that allows researchers to review and correct article categorizations, continuously improving the machine learning model. The system processes thousands of articles and provides real-time feedback to enhance categorization accuracy.',
	conclusion:
		'The Ballen Dashboard successfully revolutionized content research workflows, processing thousands of horror stories with AI assistance. The project demonstrated advanced full-stack development skills, including complex API integrations between Node.js and Django systems. Key achievements include building sophisticated Material-UI components, implementing AI training workflows, and creating a scalable content management system. The platform has significantly improved content research efficiency and continues to process and categorize articles for Ballen Studios.',
};

export default ballen;
