'use client';

import { motion } from 'framer-motion';
import { SmilePlus, Sparkles, Music, Headphones } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: <SmilePlus className="h-8 w-8 text-primary-500" />,
      title: 'Choose Your Mood',
      description: "Select how you're feeling from our mood picker or take a quick mood test"
    },
    {
      icon: <Sparkles className="h-8 w-8 text-primary-500" />,
      title: 'Get Matched',
      description: 'VibeTunes finds music that perfectly fits your current emotional state.'
    },
    {
      icon: <Headphones className="h-8 w-8 text-primary-500" />,
      title: 'Enjoy & Discover',
      description: 'Listen to your mood-matched playlist on youtube and discover new favorite songs.'
    }
  ];

  return (
    <section className="py-12">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold mb-2">How VibeTune Works</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Your perfect soundtrack is just a few clicks away
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
          >
            <div className="bg-primary-100 dark:bg-primary-900/40 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">{step.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}