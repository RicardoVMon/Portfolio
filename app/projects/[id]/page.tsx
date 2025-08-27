'use client';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import projects from '@/app/data/projects';
import Link from 'next/link';
import Carousel from '@/app/components/Carousel';

export default function ProjectPage() {
  
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Project Not Found</h1>
        <p className="text-gray-600 mb-8">The project you're looking for doesn't exist.</p>
        <Link 
          href="/" 
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Projects
        </Link>
      </div>
    );
  }

  const images = project.images.length > 1 ? project.images : [project.images[0]];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        {/* Back Arrow */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium mb-8 group transition-colors duration-200"
          aria-label="Go back to projects"
        >
          <svg
            className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </Link>

        {/* Project Header */}
        <header className="text-center mb-12">
            <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-800 leading-tight"
            >
            {project.title}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
              >
              {project.long_description}
            </motion.div>
        </header>

        {/* Technologies Section */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-semibold mb-8 text-gray-700 text-center"
          >
            Technologies Used
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {project.technologies.map((technology, index) => (
                <motion.div
                key={technology}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg p-4 flex flex-col items-center hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                <span className="text-sm font-medium text-gray-800 text-center">
                  {technology}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Project Images */}
        <section>
          <Carousel images={images} alt={project.title} />
        </section>
      </div>
    </main>
  );
}