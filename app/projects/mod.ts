import { Project } from '.';

const mod: Project = {
	seoTitle: 'Military Corrective Training Centre | Nathan Carter Web Developer',
	seoDescription:
		'Secure web application for Military Corrective Training Centre, featuring role-based access control, dynamic form generation, and comprehensive resource management.',
	slug: 'mctc-learner-platform',
	image: '/work/mod-cover.webp',
	title: 'Military Training Centre',
	description:
		'Secure web application for Military Corrective Training Centre staff and detainees, featuring role-based access control and dynamic resource management.',
	what: 'The Military Corrective Training Centre required a secure, role-based web application to manage detainee information and staff resources. The system needed to support multiple user roles with different access levels, provide dynamic form creation capabilities for detainee data collection, and offer comprehensive resource management tools. Security was paramount, requiring robust authentication and authorization systems to protect sensitive information.',
	technologies: [
		'React',
		'TypeScript',
		'Material-UI',
		'Node.js',
		'Express.js',
		'JWT',
		'PostgreSQL',
		'bcrypt',
	],
	how: 'Built a secure full-stack application using React with TypeScript and Material-UI for the frontend, implementing comprehensive role-based access control. Developed a Node.js/Express.js backend with JWT authentication and bcrypt password hashing for security. Created a dynamic form generation system that allows staff to create custom forms for detainee data collection, with real-time data validation and storage. Implemented features including file management, news distribution, user management, action history tracking, and useful links. The system provides different interfaces for detainees (information access) and staff (resource management and data analysis).',
	conclusion:
		'The Military Training Centre application successfully delivered a secure, scalable solution that meets strict security requirements while providing intuitive user experiences for different roles. The project demonstrated expertise in security implementation, role-based access control, and dynamic form generation. Key achievements include building a comprehensive user management system, implementing secure authentication, and creating flexible data collection tools. The application continues to serve the training centre effectively, providing both detainees and staff with the tools they need.',
};

export default mod;
