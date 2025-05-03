'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Music } from 'lucide-react';
import { getMoodEmoji } from '@/lib/moods';

export default function Hero() {
  const moods = ['happy', 'sad', 'energetic', 'chill', 'romantic', 'angry'];
  const [currentMoodIndex, setCurrentMoodIndex] = useState(0);

  // Cycle through moods
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMoodIndex((prev) => (prev + 1) % moods.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 px-4 sm:py-20 text-center">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-6xl font-bold mb-4">
            Feel it. Find it. Play it.
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Discover music that matches your mood, no matter how you're feeling.
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-10"
        >
          <div className="relative inline-block">
            {moods.map((mood, index) => (
              <motion.div
                key={mood}
                className="absolute inset-0 flex items-center justify-center text-6xl sm:text-8xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: currentMoodIndex === index ? 1 : 0,
                  scale: currentMoodIndex === index ? 1 : 0.8
                }}
                transition={{ duration: 0.5 }}
              >
                {getMoodEmoji(mood)}
              </motion.div>
            ))}
            <div className="opacity-0 text-6xl sm:text-8xl">
              {getMoodEmoji(moods[0])}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/mood-test"
            className="px-8 py-3 bg-primary-600 text-white rounded-full font-medium hover:bg-primary-700 transition-colors flex items-center justify-center w-full sm:w-auto"
          >
            <Music className="mr-2 h-5 w-5" />
            Find Your Mood
          </Link>
          <Link
            href="/search"
            className="px-8 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors w-full sm:w-auto"
          >
            Search Music
          </Link>
        </motion.div>
      </div>
    </section>
  );
}