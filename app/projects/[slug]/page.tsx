import { Metadata } from 'next';
import { getBlogBySlug, Project } from '../index';
import ProjectDetailClient from './ProjectDetailClient';

interface Props {
	params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const project = getBlogBySlug(params.slug);

	if (!project) {
		return {
			title: 'Project Not Found',
			description: 'The requested project could not be found.',
		};
	}

	return {
		title: project.seoTitle,
		description: project.seoDescription,
		keywords: [
			...project.technologies,
			'web development',
			'portfolio',
			'project',
			'nathan carter',
			'developer',
		],
		openGraph: {
			title: project.seoTitle,
			description: project.seoDescription,
			images: [
				{
					url: project.image,
					width: 1200,
					height: 630,
					alt: `${project.title} - Project by Nathan Carter`,
				},
			],
			type: 'website',
		},
		twitter: {
			card: 'summary_large_image',
			title: project.seoTitle,
			description: project.seoDescription,
			images: [project.image],
		},
		alternates: {
			canonical: `https://nathancarter.dev/projects/${params.slug}`,
		},
	};
}

export default function ProjectDetail({ params }: Props) {
	const project = getBlogBySlug(params.slug);

	if (!project) {
		return (
			<div className="min-h-screen bg-zinc-900 flex items-center justify-center">
				<div className="text-zinc-400">Project not found</div>
			</div>
		);
	}

	return <ProjectDetailClient project={project} />;
}
