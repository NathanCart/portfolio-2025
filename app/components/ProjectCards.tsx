import { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ProjectCardProps {
	image: string;
	link: string;
	title: string;
	description: string;
	technologies?: string[];
	slug?: string;
}

const ProjectCard: FC<ProjectCardProps> = ({
	image,
	link,
	title,
	description,
	technologies,
	slug,
}) => {
	const router = useRouter();

	const handleClick = () => {
		if (slug) {
			// Navigate to project detail page
			router.push(`/projects/${slug}`);
		} else if (link && link.startsWith('http')) {
			// Fallback to external link if no slug provided
			window.open(link, '_blank');
		}
	};

	return (
		<div
			onClick={handleClick}
			className="group relative bg-zinc-800/80 border border-zinc-700/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-zinc-600 hover:bg-zinc-800/90 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-zinc-900/50 active:scale-[0.98]"
		>
			{/* Image Container */}
			<div className="relative h-48 sm:h-52 overflow-hidden">
				<Image
					src={image}
					alt={title}
					fill
					className="object-cover transition-transform duration-500 group-hover:scale-110"
					sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
				/>
				{/* Gradient Overlay */}
				<div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-zinc-900/20 to-transparent" />

				{/* Hover Effect Overlay */}
				<div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300" />
			</div>

			{/* Content */}
			<div className="p-4 sm:p-6">
				<h3 className="text-lg sm:text-xl font-bold text-zinc-300 mb-2 sm:mb-3 group-hover:text-white transition-colors duration-300 line-clamp-2">
					{title}
				</h3>
				<p className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-3">
					{description}
				</p>

				{/* Technologies Section */}
				{technologies && technologies.length > 0 && (
					<div className="mb-4">
						<h4 className="text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wide group-hover:text-zinc-400 transition-colors duration-300">
							<span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
								Technologies
							</span>
						</h4>
						<div className="flex flex-wrap gap-1.5">
							{technologies.slice(0, 4).map((tech, index) => (
								<span
									key={index}
									className="px-2 py-1 bg-zinc-700/60 border border-zinc-600/40 rounded-full text-xs text-zinc-300 font-medium 
										group-hover:bg-gradient-to-r group-hover:from-blue-600/20 group-hover:to-purple-600/20 
										group-hover:border-blue-500/60 group-hover:text-white group-hover:scale-105
										transition-all duration-300 ease-out hover:shadow-blue-500/25 hover:shadow-md
										animate-fade-in-up"
									style={{
										animationDelay: `${index * 50}ms`,
										animationFillMode: 'both',
									}}
								>
									{tech}
								</span>
							))}
							{technologies.length > 4 && (
								<span
									className="px-2 py-1 bg-zinc-700/40 border border-zinc-600/30 rounded-full text-xs text-zinc-400 font-medium
										group-hover:bg-gradient-to-r group-hover:from-purple-600/20 group-hover:to-pink-600/20
										group-hover:border-purple-500/60 group-hover:text-white group-hover:scale-105
										transition-all duration-300 ease-out hover:shadow-purple-500/25 hover:shadow-md
										animate-fade-in-up"
									style={{
										animationDelay: `${4 * 50}ms`,
										animationFillMode: 'both',
									}}
								>
									+{technologies.length - 4}
								</span>
							)}
						</div>
					</div>
				)}

				{/* Action Button */}
				<div className="flex items-center gap-2 text-zinc-400 group-hover:text-white transition-colors duration-300">
					<span className="text-sm font-medium">View Details</span>
					<svg
						className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M13 7l5 5m0 0l-5 5m5-5H6"
						/>
					</svg>
				</div>
			</div>

			{/* Touch Feedback for Mobile */}
			<div className="absolute inset-0 bg-white/0 group-active:bg-white/5 transition-colors duration-150 pointer-events-none rounded-2xl" />
		</div>
	);
};

interface ProjectCardsProps {
	items: ProjectCardProps[];
}

const ProjectCards: FC<ProjectCardsProps> = ({ items }) => {
	return (
		<div className="w-full px-4 sm:px-6 lg:px-8">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
				{items.map((item, index) => (
					<ProjectCard key={index} {...item} />
				))}
			</div>

			{/* Bottom spacing for mobile */}
			<div className="h-8 sm:h-16" />
		</div>
	);
};

export default ProjectCards;
