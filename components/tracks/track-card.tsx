'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Track } from '@/types';
import { ExternalLink, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { isMobile } from 'react-device-detect';

interface TrackCardProps {
  track: Track & {
    youtubeUrl: string; // Add this to your Track type if not already present
  };
  isFavorite?: (id: string) => boolean; // Make optional if not always provided
  toggleFavorite?: (track: Track) => void; // Make optional if not always provided
}

export default function TrackCard({ 
  track, 
  isFavorite = () => false, // Default implementation
  toggleFavorite = () => {} // Default implementation
}: TrackCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showMobileYT, setShowMobileYT] = useState(false);
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };
  
  return (
    <motion.div
      variants={item}
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square">
        <Image
          src={track.thumbnail || 'https://via.placeholder.com/300'}
          alt={`${track.title} by ${track.artist}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-black/30 flex items-center justify-center"
        >
          <a 
            href={track.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
            aria-label={`Watch ${track.title} on YouTube`}
          >
            <ExternalLink className="h-4 w-4" />
            Watch on YouTube
          </a>
        </motion.div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate" title={track.title}>
              {track.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-xs truncate">
              {track.artist}
            </p>
            {(isMobile || showMobileYT) && (
              <a 
                href={track.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center gap-1 text-xs text-red-600 dark:text-red-400 font-medium"
                aria-label={`Watch on YouTube`}
              >
                <ExternalLink className="h-3 w-3" />
                Watch on YouTube
              </a>
            )}
          </div>
          
          {toggleFavorite && ( // Only render if toggleFavorite is provided
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(track);
              }}
              className="ml-2 focus:outline-none"
              aria-label={isFavorite(track.id) ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart 
                className={`h-5 w-5 ${
                  isFavorite(track.id) ? 'fill-primary-500 text-primary-500' : 'text-gray-400'
                }`} 
              />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}