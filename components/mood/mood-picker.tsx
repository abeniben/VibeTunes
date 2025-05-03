'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { validMoods, getMoodEmoji, getMoodTitle } from '@/lib/moods';
import { useState } from 'react';

export default function MoodPicker() {
  const router = useRouter();
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  
  const handleMoodClick = (mood: string) => {
    router.push(`/mood/${mood}`);
  };
  
  const handleRandomMood = () => {
    setIsButtonClicked(true);
    
    // Get a random mood
    const randomMood = validMoods[Math.floor(Math.random() * validMoods.length)];
    
    // Add a small delay for the animation
    setTimeout(() => {
      router.push(`/mood/${randomMood}`);
    }, 500);
  };
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };
  
  return (
    <section className="py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">How are you feeling today?</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Choose a mood to discover matching music
        </p>
      </div>
      
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {validMoods.map((mood) => (
          <motion.button
            key={mood}
            onClick={() => handleMoodClick(mood)}
            className="p-6 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all flex flex-col items-center hover:scale-105"
            variants={item}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span 
              className="text-4xl mb-2"
              animate={{ 
                y: [0, -5, 0],
                rotate: [0, mood === 'energetic' ? 5 : 0, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse", 
                duration: 2,
                delay: Math.random() * 0.5
              }}
            >
              {getMoodEmoji(mood)}
            </motion.span>
            <span className="font-medium">{getMoodTitle(mood)}</span>
          </motion.button>
        ))}
      </motion.div>
      
      <div className="text-center">
        <motion.button
          onClick={handleRandomMood}
          disabled={isButtonClicked}
          className={`px-6 py-3 rounded-full font-medium flex items-center justify-center mx-auto transition-all ${
            isButtonClicked
              ? 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed'
              : 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-800'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Sparkles className="mr-2 h-5 w-5" />
          {isButtonClicked ? 'Finding a mood...' : 'Surprise Me!'}
        </motion.button>
      </div>
    </section>
  );
}