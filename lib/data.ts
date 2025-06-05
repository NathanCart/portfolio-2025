export type Project = {
  id: string;
  title: string;
  description: string;
  summary: string;
  coverImage: string;
  images: string[];
  tags: string[];
  demoLink?: string;
  githubLink?: string;
  featured: boolean;
  publishedAt: Date;
  content: string;
};

export type Skill = {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'other';
};

export type Experience = {
  company: string;
  position: string;
  startDate: Date;
  endDate: Date | null;
  description: string;
  technologies: string[];
};

// Projects Data
export const projects: Project[] = [
  {
    id: 'e-commerce-platform',
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce platform with advanced features.',
    summary: 'Built a full-featured e-commerce platform with React, Node.js, and MongoDB, featuring product management, shopping cart, payment integration, and order tracking.',
    coverImage: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: [
      'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/6636463/pexels-photo-6636463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe', 'Redux'],
    demoLink: 'https://example.com',
    githubLink: 'https://github.com',
    featured: true,
    publishedAt: new Date('2023-06-15'),
    content: `
# E-Commerce Platform

This full-stack e-commerce platform was developed to provide a seamless shopping experience for users and a comprehensive management system for administrators.

## Key Features

- **User Authentication**: Secure login and registration with JWT
- **Product Catalog**: Browse, search, and filter products
- **Shopping Cart**: Add items, adjust quantities, and checkout
- **Payment Processing**: Integrated with Stripe for secure payments
- **Order Management**: Track order status and history
- **Admin Dashboard**: Manage products, orders, and customers
- **Responsive Design**: Works on all devices from mobile to desktop

## Technical Details

The application uses React for the frontend with Redux for state management. The backend is built with Node.js and Express, with MongoDB as the database. Authentication is handled with JWT, and payments are processed through Stripe.

Performance optimization techniques include code splitting, lazy loading, and caching strategies. The application also implements comprehensive error handling and input validation.

## Development Challenges

One of the biggest challenges was implementing the real-time inventory management system that would update across all connected clients. This was solved by implementing a WebSocket connection with Socket.io that broadcasts inventory changes to all connected clients.

Another challenge was optimizing the database queries for the product search functionality, which was resolved by implementing text indexes in MongoDB and paginated results.
    `
  },
  {
    id: 'task-management-app',
    title: 'Task Management App',
    description: 'A collaborative task management application.',
    summary: 'Developed a task management application with real-time collaboration features, drag-and-drop interfaces, and automated reminders.',
    coverImage: 'https://images.pexels.com/photos/6956183/pexels-photo-6956183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: [
      'https://images.pexels.com/photos/6956183/pexels-photo-6956183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/6804604/pexels-photo-6804604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/4383298/pexels-photo-4383298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    tags: ['React', 'Firebase', 'TypeScript', 'Material UI', 'Redux'],
    demoLink: 'https://example.com',
    githubLink: 'https://github.com',
    featured: true,
    publishedAt: new Date('2023-03-22'),
    content: `
# Task Management App

This collaborative task management application was designed to help teams organize and track their projects efficiently.

## Key Features

- **Task Organization**: Create, edit, and organize tasks in customizable boards
- **Real-time Collaboration**: See changes from team members instantly
- **Drag-and-Drop Interface**: Intuitive UI for managing task status
- **Comments & Attachments**: Discuss tasks and share relevant files
- **Notifications & Reminders**: Stay updated on task changes and deadlines
- **User Roles & Permissions**: Control access and edit rights
- **Time Tracking**: Monitor time spent on each task

## Technical Details

The application is built with React and TypeScript on the frontend, using Redux for state management and Material UI for the component library. The backend uses Firebase for real-time database, authentication, and file storage.

The drag-and-drop functionality is implemented with React DnD, and real-time updates use Firebase's Realtime Database listeners.

## Development Challenges

Creating a smooth real-time experience while handling concurrent edits was challenging. I implemented an optimistic UI pattern where changes appear immediately in the local interface while being synchronized in the background.

Ensuring consistent performance as the number of tasks and users grew required implementing virtualized lists and optimizing Firebase queries with appropriate indexes.
    `
  },
  {
    id: 'fitness-tracking-platform',
    title: 'Fitness Tracking Platform',
    description: 'A comprehensive fitness tracking and coaching platform.',
    summary: 'Created a fitness tracking platform with workout planning, progress monitoring, and AI-powered coaching suggestions.',
    coverImage: 'https://images.pexels.com/photos/116077/pexels-photo-116077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: [
      'https://images.pexels.com/photos/116077/pexels-photo-116077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    tags: ['React Native', 'Node.js', 'PostgreSQL', 'TensorFlow', 'GraphQL'],
    demoLink: 'https://example.com',
    githubLink: 'https://github.com',
    featured: true,
    publishedAt: new Date('2022-11-10'),
    content: `
# Fitness Tracking Platform

This platform was developed to help fitness enthusiasts track their workouts, monitor progress, and receive personalized coaching.

## Key Features

- **Workout Planning**: Create and schedule customized workout routines
- **Progress Tracking**: Monitor improvements over time with visual charts
- **AI Coaching**: Receive personalized suggestions based on performance
- **Nutrition Logging**: Track daily nutrition intake alongside workouts
- **Social Features**: Connect with friends and share achievements
- **Goal Setting**: Set and track fitness goals with milestone celebrations
- **Exercise Library**: Access comprehensive exercise demonstrations

## Technical Details

The application is built as a cross-platform mobile app using React Native for the frontend. The backend uses Node.js with a GraphQL API and PostgreSQL database. The AI coaching features are powered by a TensorFlow model trained on fitness progression data.

Data visualization is implemented with D3.js, and user authentication is managed with JWT and secure biometric options on supported devices.

## Development Challenges

Implementing the AI coaching system required extensive data processing and model training. The solution involved creating a pipeline that processes user workout data, identifies patterns, and generates appropriate recommendations.

Ensuring accurate progress tracking across different types of exercises and metrics was complex. I designed a flexible schema that could accommodate various workout types while maintaining data consistency for analysis.
    `
  },
  {
    id: 'real-estate-marketplace',
    title: 'Real Estate Marketplace',
    description: 'A modern platform for buying, selling, and renting properties.',
    summary: 'Built a real estate marketplace featuring property listings, advanced search, virtual tours, and agent communication tools.',
    coverImage: 'https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: [
      'https://images.pexels.com/photos/1546168/pexels-photo-1546168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1642125/pexels-photo-1642125.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    tags: ['Vue.js', 'Django', 'PostgreSQL', 'ElasticSearch', 'Google Maps API'],
    demoLink: 'https://example.com',
    githubLink: 'https://github.com',
    featured: false,
    publishedAt: new Date('2022-08-03'),
    content: `
# Real Estate Marketplace

This marketplace connects property buyers, sellers, and renters in a modern digital platform.

## Key Features

- **Property Listings**: Comprehensive details with high-quality images
- **Advanced Search**: Filter by location, price, features, and more
- **Virtual Tours**: 360° views and video walkthroughs
- **Map Integration**: Visualize properties on interactive maps
- **Agent Communication**: Direct messaging and appointment scheduling
- **Saved Properties**: Save favorites and receive price alerts
- **Market Insights**: Neighborhood data and price trends

## Technical Details

The application is built with Vue.js for the frontend, with Django powering the backend API. Property data is stored in PostgreSQL, with ElasticSearch for fast and flexible property searches. The map features are implemented using the Google Maps API.

The platform incorporates responsive design principles and progressive image loading to ensure a smooth experience on all devices.

## Development Challenges

Creating an efficient search system that could handle complex queries across thousands of properties was challenging. The solution involved implementing ElasticSearch with custom analyzers and query builders to optimize search relevance and performance.

Another challenge was designing a scalable system for storing and serving high-resolution property images and virtual tour content. This was addressed by implementing a CDN with dynamic image resizing and lazy loading techniques.
    `
  },
  {
    id: 'learning-management-system',
    title: 'Learning Management System',
    description: 'A comprehensive platform for online education.',
    summary: 'Developed a learning management system with course creation tools, interactive assessments, and student progress tracking.',
    coverImage: 'https://images.pexels.com/photos/5428003/pexels-photo-5428003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: [
      'https://images.pexels.com/photos/5428003/pexels-photo-5428003.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/7516353/pexels-photo-7516353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    tags: ['Angular', 'Spring Boot', 'MySQL', 'Docker', 'AWS'],
    demoLink: 'https://example.com',
    githubLink: 'https://github.com',
    featured: false,
    publishedAt: new Date('2022-05-19'),
    content: `
# Learning Management System

This comprehensive learning management system was developed to facilitate online education and training programs.

## Key Features

- **Course Creation**: Intuitive tools for instructors to build courses
- **Content Management**: Organize lessons, quizzes, and assignments
- **Interactive Assessments**: Multiple assessment types with automatic grading
- **Progress Tracking**: Monitor student engagement and performance
- **Discussion Forums**: Foster student collaboration and questions
- **Certification**: Automated certificate generation upon completion
- **Analytics Dashboard**: Insights for instructors and administrators

## Technical Details

The application is built with Angular on the frontend and Spring Boot on the backend. The database is MySQL, and the system is containerized with Docker for easy deployment. The production environment is hosted on AWS with auto-scaling capabilities.

The system includes a video streaming component with adaptive bitrate technology and a real-time notification system using WebSockets.

## Development Challenges

Designing a flexible content management system that could handle various types of learning materials (videos, documents, interactive elements) required a sophisticated content model. I implemented a polymorphic content architecture that could represent different content types while maintaining consistent interfaces.

Ensuring reliable video delivery across different network conditions was another challenge. The solution involved implementing an adaptive streaming system with multiple quality levels and a custom video player with analytics tracking.
    `
  },
  {
    id: 'healthcare-management-system',
    title: 'Healthcare Management System',
    description: 'A comprehensive system for healthcare providers.',
    summary: 'Created a healthcare management system with patient records, appointment scheduling, and secure messaging features.',
    coverImage: 'https://images.pexels.com/photos/48604/pexels-photo-48604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    images: [
      'https://images.pexels.com/photos/48604/pexels-photo-48604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/263337/pexels-photo-263337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    tags: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'HIPAA Compliance'],
    demoLink: 'https://example.com',
    githubLink: 'https://github.com',
    featured: false,
    publishedAt: new Date('2022-02-08'),
    content: `
# Healthcare Management System

This secure platform helps healthcare providers manage patient care efficiently while maintaining strict privacy standards.

## Key Features

- **Electronic Health Records**: Comprehensive patient history and documentation
- **Appointment Scheduling**: Calendar management for providers and patients
- **Secure Messaging**: HIPAA-compliant communication system
- **Prescription Management**: Digital prescription creation and tracking
- **Billing Integration**: Streamlined insurance claims and payment processing
- **Lab Results**: Digital delivery and storage of test results
- **Patient Portal**: Self-service access for patients to their information

## Technical Details

The application uses React for the frontend with a Node.js backend and MongoDB database. Real-time features are implemented with Socket.io, and all data is encrypted in transit and at rest to ensure HIPAA compliance.

The system includes role-based access control with detailed audit logging and multi-factor authentication for sensitive operations.

## Development Challenges

Ensuring HIPAA compliance while maintaining a user-friendly experience required careful planning and implementation. I developed a comprehensive security architecture including encryption, access controls, and audit logging that passed third-party security assessments.

Creating an appointment system that could handle complex scheduling rules (provider availability, appointment types, room allocation) was challenging. The solution involved implementing a constraint-based scheduling algorithm that could efficiently find available slots while respecting all constraints.
    `
  }
];

// Skills Data
export const skills: Skill[] = [
  { name: 'React', level: 95, category: 'frontend' },
  { name: 'TypeScript', level: 90, category: 'frontend' },
  { name: 'Next.js', level: 85, category: 'frontend' },
  { name: 'CSS/SCSS', level: 90, category: 'frontend' },
  { name: 'Tailwind CSS', level: 95, category: 'frontend' },
  { name: 'Framer Motion', level: 80, category: 'frontend' },
  
  { name: 'Node.js', level: 85, category: 'backend' },
  { name: 'Express', level: 90, category: 'backend' },
  { name: 'GraphQL', level: 75, category: 'backend' },
  { name: 'Python', level: 80, category: 'backend' },
  { name: 'Django', level: 70, category: 'backend' },
  
  { name: 'MongoDB', level: 85, category: 'database' },
  { name: 'PostgreSQL', level: 80, category: 'database' },
  { name: 'MySQL', level: 75, category: 'database' },
  { name: 'Redis', level: 70, category: 'database' },
  
  { name: 'Docker', level: 80, category: 'devops' },
  { name: 'AWS', level: 75, category: 'devops' },
  { name: 'CI/CD', level: 85, category: 'devops' },
  { name: 'Git', level: 90, category: 'devops' },
  
  { name: 'UI/UX Design', level: 85, category: 'other' },
  { name: 'Agile/Scrum', level: 90, category: 'other' },
  { name: 'Testing', level: 80, category: 'other' },
  { name: 'Problem Solving', level: 95, category: 'other' },
];

// Experience Data
export const experiences: Experience[] = [
  {
    company: 'Tech Innovations Inc.',
    position: 'Senior Full Stack Developer',
    startDate: new Date('2022-03-01'),
    endDate: null,
    description: 'Leading development of enterprise SaaS applications, mentoring junior developers, and implementing best practices for code quality and testing.',
    technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB', 'GraphQL']
  },
  {
    company: 'Digital Solutions Group',
    position: 'Full Stack Developer',
    startDate: new Date('2020-06-01'),
    endDate: new Date('2022-02-28'),
    description: 'Developed and maintained multiple client web applications, collaborated with design and product teams, and implemented CI/CD pipelines.',
    technologies: ['Vue.js', 'Express', 'PostgreSQL', 'Docker', 'Jest']
  },
  {
    company: 'WebCraft Agency',
    position: 'Frontend Developer',
    startDate: new Date('2018-09-01'),
    endDate: new Date('2020-05-31'),
    description: 'Created responsive web applications for various clients, collaborated in an agile team environment, and optimized site performance.',
    technologies: ['React', 'JavaScript', 'SCSS', 'Webpack', 'Redux']
  },
  {
    company: 'StartUp Launch',
    position: 'Junior Web Developer',
    startDate: new Date('2017-05-01'),
    endDate: new Date('2018-08-31'),
    description: 'Assisted in development of web applications, fixed bugs, and implemented new features under senior guidance.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'PHP']
  }
];

// Helper function to get project by ID
export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}

// Helper function to get featured projects
export function getFeaturedProjects(): Project[] {
  return projects.filter(project => project.featured);
}

// Helper function to get all projects
export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}

// Helper function to get skills by category
export function getSkillsByCategory(category: Skill['category']): Skill[] {
  return skills.filter(skill => skill.category === category)
    .sort((a, b) => b.level - a.level);
}

// Helper function to get all skills
export function getAllSkills(): Skill[] {
  return [...skills].sort((a, b) => b.level - a.level);
}

// Helper function to get all experiences
export function getAllExperiences(): Experience[] {
  return [...experiences].sort((a, b) => {
    const aDate = a.endDate || new Date();
    const bDate = b.endDate || new Date();
    return bDate.getTime() - aDate.getTime();
  });
}