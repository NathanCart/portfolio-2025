export default function Loading() {
	return (
		<div className="min-h-screen bg-zinc-900 relative overflow-hidden">
			{/* Skeleton Background */}
			<div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900" />

			{/* Animated Particles Effect */}
			<div className="absolute inset-0">
				<div
					className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"
					style={{ animationDelay: '0s' }}
				/>
				<div
					className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse"
					style={{ animationDelay: '0.5s' }}
				/>
				<div
					className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse"
					style={{ animationDelay: '1s' }}
				/>
				<div
					className="absolute top-2/3 right-1/4 w-1 h-1 bg-purple-300 rounded-full animate-pulse"
					style={{ animationDelay: '1.5s' }}
				/>
			</div>

			{/* Skeleton Navbar */}
			<div className="relative z-10">
				<div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
					<div className="flex items-center gap-4">
						<div className="w-8 h-8 bg-zinc-700 rounded-full animate-pulse" />
						<div className="w-24 h-6 bg-zinc-700 rounded animate-pulse" />
					</div>
					<div className="flex items-center gap-4">
						<div className="w-16 h-8 bg-zinc-700 rounded animate-pulse" />
						<div className="w-16 h-8 bg-zinc-700 rounded animate-pulse" />
						<div className="w-16 h-8 bg-zinc-700 rounded animate-pulse" />
					</div>
				</div>
			</div>

			{/* Skeleton Back Button */}
			<div className="relative z-10 pt-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
				<div className="flex items-center gap-2 mb-8">
					<div className="w-5 h-5 bg-zinc-700 rounded animate-pulse" />
					<div className="w-24 h-5 bg-zinc-700 rounded animate-pulse" />
				</div>
			</div>

			{/* Skeleton Hero Section */}
			<div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-16">
				<div className="max-w-6xl mx-auto">
					{/* Skeleton Project Image */}
					<div className="relative h-64 sm:h-80 lg:h-96 w-64 sm:w-80 lg:w-96 rounded-2xl overflow-hidden mb-8 bg-zinc-800 animate-pulse">
						<div className="absolute inset-0 bg-gradient-to-br from-zinc-700 to-zinc-800" />
					</div>

					{/* Skeleton Project Header */}
					<div className="mb-12">
						<div className="w-3/4 h-12 bg-zinc-700 rounded mb-4 animate-pulse" />
						<div className="w-full h-6 bg-zinc-700 rounded mb-2 animate-pulse" />
						<div className="w-2/3 h-6 bg-zinc-700 rounded mb-6 animate-pulse" />

						{/* Skeleton Project Links */}
						<div className="flex flex-wrap gap-4 mb-8">
							<div className="w-32 h-12 bg-zinc-700 rounded-full animate-pulse" />
							<div className="w-28 h-12 bg-zinc-700 rounded-full animate-pulse" />
						</div>

						{/* Skeleton Technologies */}
						<div className="mb-8">
							<div className="w-48 h-6 bg-zinc-700 rounded mb-4 animate-pulse" />
							<div className="flex flex-wrap gap-3">
								<div className="w-20 h-8 bg-zinc-700 rounded-full animate-pulse" />
								<div className="w-24 h-8 bg-zinc-700 rounded-full animate-pulse" />
								<div className="w-16 h-8 bg-zinc-700 rounded-full animate-pulse" />
								<div className="w-28 h-8 bg-zinc-700 rounded-full animate-pulse" />
								<div className="w-22 h-8 bg-zinc-700 rounded-full animate-pulse" />
							</div>
						</div>
					</div>

					{/* Skeleton Project Details */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
						{/* What */}
						<div>
							<div className="w-24 h-8 bg-zinc-700 rounded mb-4 animate-pulse" />
							<div className="w-full h-4 bg-zinc-700 rounded mb-2 animate-pulse" />
							<div className="w-full h-4 bg-zinc-700 rounded mb-2 animate-pulse" />
							<div className="w-3/4 h-4 bg-zinc-700 rounded animate-pulse" />
						</div>

						{/* How */}
						<div>
							<div className="w-20 h-8 bg-zinc-700 rounded mb-4 animate-pulse" />
							<div className="w-full h-4 bg-zinc-700 rounded mb-2 animate-pulse" />
							<div className="w-full h-4 bg-zinc-700 rounded mb-2 animate-pulse" />
							<div className="w-2/3 h-4 bg-zinc-700 rounded animate-pulse" />
						</div>
					</div>

					{/* Skeleton Conclusion */}
					<div className="mt-12 p-8 bg-zinc-800/50 border border-zinc-700/50 rounded-2xl">
						<div className="w-32 h-8 bg-zinc-700 rounded mb-4 animate-pulse" />
						<div className="w-full h-4 bg-zinc-700 rounded mb-2 animate-pulse" />
						<div className="w-full h-4 bg-zinc-700 rounded mb-2 animate-pulse" />
						<div className="w-4/5 h-4 bg-zinc-700 rounded animate-pulse" />
					</div>
				</div>
			</div>

			{/* Loading Text */}
			<div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
				<div className="flex items-center gap-2 text-zinc-400">
					<div className="w-4 h-4 border-2 border-zinc-600 border-t-blue-400 rounded-full animate-spin" />
					<span className="text-sm font-medium">Loading project...</span>
				</div>
			</div>
		</div>
	);
}
