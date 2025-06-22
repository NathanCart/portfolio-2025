import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import './globals.css';

const figtree = Figtree({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: {
		default: 'Nathan Carter | Full-Stack Web Developer',
		template: '%s | Nathan Carter',
	},
	description:
		'Full-stack web developer specializing in React, Next.js, Node.js, and modern web technologies. Creating innovative digital solutions with cutting-edge tech.',
	keywords: [
		'web developer',
		'full-stack developer',
		'React developer',
		'Next.js developer',
		'TypeScript developer',
		'Node.js developer',
		'frontend developer',
		'backend developer',
		'JavaScript developer',
		'portfolio',
		'web development',
		'software engineer',
	],
	authors: [{ name: 'Nathan Carter' }],
	creator: 'Nathan Carter',
	publisher: 'Nathan Carter',
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://nathancarter.dev',
		title: 'Nathan Carter | Full-Stack Web Developer',
		description:
			'Full-stack web developer specializing in React, Next.js, Node.js, and modern web technologies. Creating innovative digital solutions with cutting-edge tech.',
		siteName: 'Nathan Carter Portfolio',
		images: [
			{
				url: '/og-image.jpg',
				width: 1200,
				height: 630,
				alt: 'Nathan Carter - Full-Stack Web Developer',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Nathan Carter | Full-Stack Web Developer',
		description:
			'Full-stack web developer specializing in React, Next.js, Node.js, and modern web technologies.',
		images: ['/og-image.jpg'],
		creator: '@nathancarter',
	},
	verification: {
		google: 'your-google-verification-code',
	},
	alternates: {
		canonical: 'https://nathancarter.dev',
	},
	metadataBase: new URL('https://nathancarter.dev'),
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
				<link rel="manifest" href="/manifest.json" />
			</head>
			<body className={`${figtree.className} antialiased`}>{children}</body>
		</html>
	);
}
