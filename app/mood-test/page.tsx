'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const questions = [
  {
    question: "How's your energy level right now?",
    options: [
      { text: "Can't sit still", mood: "energetic" },
      { text: "Balanced", mood: "chill" },
      { text: "Ready for a nap", mood: "sad" },
    ],
  },
  {
    question: "When you think about your day, you feel...",
    options: [
      { text: "Excited", mood: "happy" },
      { text: "Reflective", mood: "chill" },
      { text: "Frustrated", mood: "angry" },
    ],
  },
  {
    question: "You'd rather be...",
    options: [
      { text: "At a party", mood: "energetic" },
      { text: "On a date", mood: "romantic" },
      { text: "Alone with your thoughts", mood: "sad" },
    ],
  },
];

export default function MoodTestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const router = useRouter();

  const handleAnswer = (mood: string) => {
    const newAnswers = [...answers, mood];
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
      const moodCounts: {[key: string]: number} = {};
      newAnswers.forEach(mood => {
        moodCounts[mood] = (moodCounts[mood] || 0) + 1;
      });
      
      let topMood = Object.keys(moodCounts).reduce((a, b) => 
        moodCounts[a] > moodCounts[b] ? a : b
      );
      
      // Redirect after a short delay to show completion animation
      setTimeout(() => {
        router.push(`/mood/${topMood}`);
      }, 1000);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-2">Find Your Mood</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Answer a few questions and we'll find the perfect tunes for your current vibe
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        {!isComplete ? (
          <>
            <div className="mb-8">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-primary-500 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-semibold mb-6">
                {questions[currentQuestion].question}
              </h2>
              
              <div className="grid gap-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.mood)}
                    className="p-4 text-left rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all group flex justify-between items-center"
                  >
                    <span>{option.text}</span>
                    <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" size={18} />
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        ) : (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center py-8"
          >
            <div className="mb-4 text-5xl">🎵</div>
            <h2 className="text-2xl font-semibold mb-2">Perfect match found!</h2>
            <p>Taking you to your personalized music selection...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}