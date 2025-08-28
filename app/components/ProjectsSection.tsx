'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import projects from '@/app/data/projects';
import { useMemo } from 'react';

export default function ProjectsSection() {
    // Memoize animations to prevent recreation on every render
    const containerVariants = useMemo(() => ({
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }), []);

    const itemVariants = useMemo(() => ({
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6 }
        }
    }), []);

    return (
        <section id="projects" className="py-12 md:py-20 px-4 max-w-7xl mx-auto">
            <motion.h2
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center text-gray-800"
            >
                Featured Projects
            </motion.h2>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
                {projects.map((project, index) => (
                    <Link
                        key={project.id}
                        href={`/projects/${project.id}`}
                        className="block group"
                    >
                        <motion.div
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="relative aspect-video bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] transition-shadow duration-300 will-change-transform"
                        >
                            <Image
                                src={project.thumbnail || project.images[0]}
                                alt={project.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                priority={index < 2}
                                quality={85}
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90 group-hover:to-black/95 transition-colors duration-300" />
                            
                            {/* Technology badges - simplified animation */}
                            <div className="absolute top-4 right-4 flex flex-wrap gap-2 max-w-[50%]">
                                {project.technologies.slice(0, 4).map((tech, techIndex) => (
                                    <div
                                        key={tech}
                                        className="bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded-full text-xs font-medium shadow-lg whitespace-nowrap opacity-0 animate-[fadeInScale_0.3s_ease-out_forwards]"
                                        style={{ 
                                            animationDelay: `${techIndex * 50}ms` 
                                        }}
                                    >
                                        {tech}
                                    </div>
                                ))}
                                {project.technologies.length > 4 && (
                                    <div
                                        className="bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded-full text-xs font-medium shadow-lg opacity-0 animate-[fadeInScale_0.3s_ease-out_forwards]"
                                        style={{ 
                                            animationDelay: `${4 * 50}ms` 
                                        }}
                                    >
                                        +{project.technologies.length - 4}
                                    </div>
                                )}
                            </div>

                            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                                <p className="text-gray-200 mb-4 line-clamp-2">{project.description}</p>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </motion.div>
        </section>
    );
}