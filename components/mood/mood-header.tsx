'use client';

import { motion } from 'framer-motion';

interface MoodHeaderProps {
  mood: string;
  emoji: string;
  title: string;
}

export default function MoodHeader({ mood, emoji, title }: MoodHeaderProps) {
  return (
    <div className="text-center py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 0.6 
        }}
        className="mb-4"
      >
        <span className="text-7xl">{emoji}</span>
      </motion.div>
      
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-3xl font-bold mb-2"
      >
        {title} Music
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
      >
        {getMoodDescription(mood)}
      </motion.p>
    </div>
  );
}

function getMoodDescription(mood: string): string {
  switch (mood) {
    case 'happy':
      return 'Uplifting tunes to boost your mood and keep the good vibes flowing.';
    case 'sad':
      return 'Emotionally resonant songs that understand how you feel and help you process.';
    case 'energetic':
      return 'High-energy beats to get you moving and keep your adrenaline pumping.';
    case 'chill':
      return 'Relaxing melodies to help you unwind, destress, and find calm in the chaos.';
    case 'romantic':
      return 'Love songs that capture the essence of romance, passion, and connection.';
    case 'angry':
      return 'Intense tracks to channel your frustration and powerful emotions.';
    default:
      return 'Discover music that matches how you feel right now.';
  }
}