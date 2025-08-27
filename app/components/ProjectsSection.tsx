'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import projects from '@/app/data/projects';



export default function ProjectsSection() {
	return (
		<section id="projects" className="py-12 md:py-20 px-4 max-w-7xl mx-auto">
			<motion.h2
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
				className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-gray-800"
			>
				Featured Projects
			</motion.h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{projects.map((project, index) => (
					<Link
					key={project.id}
					href={`/projects/${project.id}`}
					className="block group"
					scroll={false}
					>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: index * 0.1 }}
						whileHover={{ scale: 1.02 }}
						className="relative aspect-video bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] transition-all duration-300"
					>
						<Image
						src={project.images[0]}
						alt={project.title}
						fill
						className="object-cover transition-transform duration-300 group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90 group-hover:to-black/95 transition-colors duration-300" />
						<div className="absolute inset-0 p-6 flex flex-col justify-end">
						<h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
						<p className="text-gray-200 mb-4 line-clamp-2">{project.description}</p>
						</div>
					</motion.div>
					</Link>
				))}
			</div>
		</section>
	);
}