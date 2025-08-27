'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';

interface ProjectCarouselProps {
  images: string[];
  alt: string;
}

export default function ProjectCarousel({ images, alt }: ProjectCarouselProps) {
  const [current, setCurrent] = useState(0);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
    }, 4000); // Change every 4 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

    return (
        <div className="relative w-full aspect-video mb-8 rounded-xl overflow-hidden shadow">
        <motion.div
            key={images[current]}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full"
        >
            <Image
            src={images[current]}
            alt={alt}
            fill
            className="object-cover"
            priority
            />
        </motion.div>
        {images.length > 1 && (
    <>
        <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-1 group"
        aria-label="Previous"
        type="button"
        >
        <svg
            className="w-8 h-8 text-white drop-shadow group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        </button>
        <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-1 group"
        aria-label="Next"
        type="button"
        >
        <svg
            className="w-8 h-8 text-white drop-shadow group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        </button>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, i) => (
            <span
            key={i}
            className={`w-2 h-2 rounded-full ${i === current ? 'bg-white' : 'bg-gray-400'} inline-block`}
            />
        ))}
        </div>
    </>
    )}
    </div>
  );
}