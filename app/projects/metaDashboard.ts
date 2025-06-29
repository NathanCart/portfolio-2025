import { Project } from '.';

const metaDashboard: Project = {
	seoTitle: 'Meta Dashboard | Nathan Carter Web Developer',
	seoDescription:
		'Global retail merchandising SaaS platform for Meta, supporting data collection, image analysis, issue tracking, and reporting across thousands of store locations worldwide.',
	slug: 'meta-dashboard',
	image: '/work/meta-dashboard.webp',
	title: 'Meta Dashboard',
	description:
		'Global retail merchandising SaaS platform supporting data collection, image analysis, issue tracking, and reporting across thousands of store locations worldwide.',
	what: "The Meta Dashboard is a comprehensive SaaS platform designed to support Meta's global retail merchandising operations. The platform integrates advanced capabilities to streamline data collection, image analysis, issue tracking, and reporting across thousands of store locations worldwide. Key features include establishing data pipelines to ingest and validate information from multiple external agencies (retail partners, marketing agencies, field ops), ensuring transmission accuracy by validating data against Meta's internal lists and expected formats, photo ingestion and warehousing with computer vision analysis, building a ticketing system integrated with field visit reporting, and providing robust reporting, analytics, data governance, and compliance with privacy laws (GDPR, CCPA). The solution is secure, scalable, and user-friendly, with support for mobile-friendly usage and real-time or batch data integration.",
	technologies: [
		'React',
		'TypeScript',
		'Drizzle',
		'Node.js',
		'AWS',
		'PostgreSQL',
		'Serverless',
		'Tailwind',
		'ShadCN',
	],
	how: "Built as a scalable, cloud-native platform using modern web technologies with a focus on security and compliance. The platform features a robust API layer supporting REST and GraphQL endpoints for seamless integration with Meta's existing systems and third-party partners. Implemented comprehensive data validation and transformation pipelines that handle multiple data formats (JSON, CSV, XML) and protocols (SFTP, HTTPS, Webhooks). The system includes advanced computer vision capabilities for image analysis and annotation, supporting object detection, image classification, and OCR for retail compliance. Built with role-based access control (RBAC) and integrated with Meta's SSO system for secure authentication. The platform supports both real-time and batch data processing, with automated ingestion workflows and parallel processing for handling large datasets. Mobile-optimized Progressive Web App (PWA) enables field teams to report issues and track progress on-the-go. Comprehensive audit trails and change logging ensure full traceability and compliance with data protection regulations.",
	conclusion:
		"The Meta Dashboard represents a significant advancement in retail merchandising technology, successfully delivering a production-grade platform that supports Meta's global operations across 10,000+ retail locations. The platform's proven track record with Meta, including the already live compliance platform, demonstrates our deep understanding of Meta's processes and technical requirements. The solution's flexibility and scalability make it ideal for handling the complex demands of global retail operations, while its security and compliance features ensure it meets the highest standards for data protection and governance. The platform's success is evidenced by its ability to process tens of thousands of records, support hundreds of users across dozens of agencies, and maintain high accuracy with minimal manual intervention. This project showcases our expertise in building enterprise-grade SaaS solutions that integrate seamlessly with existing infrastructure while providing the advanced capabilities needed for modern retail operations.",
};

export default metaDashboard;
