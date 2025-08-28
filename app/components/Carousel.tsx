'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProjectCarouselProps {
  images: string[];
  alt: string;
  autoScrollDuration?: number; // Auto-scroll interval in milliseconds (default: 8000)
  transitionDuration?: number; // Animation transition duration in seconds (default: 0.4)
}

export default function ProjectCarousel({ 
  images, 
  alt, 
  autoScrollDuration = 10000, 
  transitionDuration = 0.4 
}: ProjectCarouselProps) {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Function to start/restart the auto-scroll interval
  const startInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    if (images.length <= 1) return;
    
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
    }, autoScrollDuration);
  }, [images.length, autoScrollDuration]);

  // Memoized navigation functions that reset the countdown
  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
    startInterval(); // Reset countdown
  }, [images.length, startInterval]);

  const next = useCallback(() => {
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
    startInterval(); // Reset countdown
  }, [images.length, startInterval]);

  // Function to go to specific slide and reset countdown
  const goToSlide = useCallback((index: number) => {
    setCurrent(index);
    startInterval(); // Reset countdown
  }, [startInterval]);

  // Auto-scroll effect with proper cleanup
  useEffect(() => {
    startInterval();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [startInterval]);  // Reset current when images change
  useEffect(() => {
    setCurrent(0);
  }, [images]);

  return (
    <div className="relative w-full aspect-video mb-8 rounded-xl overflow-hidden shadow">
      <motion.div
        key={`${images[current]}-${current}`} // Better key for proper re-renders
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: transitionDuration }}
        className="w-full h-full"
      >
        <Image
          src={images[current]}
          alt={alt}
          fill
          className="object-cover"
          priority={current === 0} // Only prioritize first image
          sizes="(max-width: 768px) 100vw, 50vw"
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
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === current ? 'bg-white' : 'bg-gray-400'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}