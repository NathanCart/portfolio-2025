'use client';
import Image from 'next/image';
import SplitText from './components/SplitText';
import Balatro from './components/Particles';
import Particles from './components/Particles';
import ScrollReveal from './components/ScrollText';

export default function Home() {
	return (
		<main className="min-h-screen relative overflow-hidden bg-gray-950">
			<div style={{ width: '100%', height: '100dvh', position: 'relative' }}>
				<Particles
					particleColors={['#ffffff', '#ffffff']}
					particleCount={200}
					particleSpread={10}
					speed={0.1}
					particleBaseSize={100}
					moveParticlesOnHover={true}
					alphaParticles={false}
					disableRotation={false}
				/>
			</div>

			<div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
				{/* Portfolio Header */}
				<div className="text-center mb-16">
					<ScrollReveal
						baseOpacity={0}
						enableBlur={true}
						baseRotation={2}
						blurStrength={8}
						containerClassName="mb-4"
						textClassName="text-white"
					>
						Nathan Carter
					</ScrollReveal>

					<ScrollReveal
						baseOpacity={0}
						enableBlur={true}
						baseRotation={1}
						blurStrength={6}
						containerClassName="mt-2"
						textClassName="text-gray-300"
					>
						Full Stack Software Developer
					</ScrollReveal>

					{/* Social Links */}
					<div className="flex justify-center items-center gap-6 mt-8">
						<a
							href="https://github.com/NathanCart"
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-400 hover:text-white transition-colors duration-300 group"
						>
							<svg
								className="w-8 h-8 group-hover:scale-110 transition-transform duration-300"
								fill="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									fillRule="evenodd"
									d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
									clipRule="evenodd"
								/>
							</svg>
						</a>
						<a
							href="https://www.linkedin.com/in/nathan-carter-782725297/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-gray-400 hover:text-white transition-colors duration-300 group"
						>
							<svg
								className="w-8 h-8 group-hover:scale-110 transition-transform duration-300"
								fill="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
							</svg>
						</a>
					</div>
				</div>

				{/* Existing Quote */}
				<ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10}>
					When does a man die? When he is hit by a bullet? No! When he suffers a disease?
					No! When he ate a soup made out of a poisonous mushroom? No! A man dies when he
					is forgotten!
				</ScrollReveal>
			</div>
		</main>
	);
}
