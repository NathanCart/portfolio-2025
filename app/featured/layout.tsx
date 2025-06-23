import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Featured Projects | Nathan Carter Web Developer',
	description:
		'Showcasing my most impactful work across enterprise platforms, mobile applications, and interactive experiences.',
};

export default function FeaturedLayout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
