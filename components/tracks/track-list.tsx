'use client';

import { Track } from '@/types';
import TrackCard from './track-card';
import { motion } from 'framer-motion';

interface TrackListProps {
  tracks: Track[];
}

export default function TrackList({ tracks }: TrackListProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      {tracks.map((track) => (
        <TrackCard key={track.id} track={track} />
      ))}
    </motion.div>
  );
}