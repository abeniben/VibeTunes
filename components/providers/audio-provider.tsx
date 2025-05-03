'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Track } from '@/types';

interface AudioContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  queue: Track[];
  recentlyPlayed: Track[];
  favorites: Track[];
  playTrack: (track: Track) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  setVolume: (volume: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  toggleFavorite: (track: Track) => void;
  isFavorite: (trackId: string) => boolean;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.8);
  const [queue, setQueue] = useState<Track[]>([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState<Track[]>([]);
  const [favorites, setFavorites] = useState<Track[]>([]);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedRecentlyPlayed = localStorage.getItem('recentlyPlayed');
      const savedFavorites = localStorage.getItem('favorites');

      if (savedRecentlyPlayed) {
        try {
          setRecentlyPlayed(JSON.parse(savedRecentlyPlayed));
        } catch (error) {
          console.error('Error parsing recently played tracks:', error);
        }
      }

      if (savedFavorites) {
        try {
          setFavorites(JSON.parse(savedFavorites));
        } catch (error) {
          console.error('Error parsing favorite tracks:', error);
        }
      }
    }
  }, []);

  // Save to localStorage whenever these states change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('recentlyPlayed', JSON.stringify(recentlyPlayed));
    }
  }, [recentlyPlayed]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  // Add track to recently played when it starts playing
  useEffect(() => {
    if (currentTrack) {
      setRecentlyPlayed(prev => {
        // Remove track if it already exists to avoid duplicates
        const filtered = prev.filter(track => track.id !== currentTrack.id);
        // Add current track to the beginning and limit to 20 tracks
        return [currentTrack, ...filtered].slice(0, 20);
      });
    }
  }, [currentTrack]);

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    setIsPlaying(false);
  };

  const resumeTrack = () => {
    setIsPlaying(true);
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
  };

  const nextTrack = () => {
    if (queue.length > 0) {
      const nextTrack = queue[0];
      setCurrentTrack(nextTrack);
      setQueue(queue.slice(1));
    }
  };

  const prevTrack = () => {
    if (recentlyPlayed.length > 1) {
      const prevTrack = recentlyPlayed[1]; // Get the second track (first is current)
      setCurrentTrack(prevTrack);
    }
  };

  const toggleFavorite = (track: Track) => {
    setFavorites(prev => {
      const isFavorited = prev.some(t => t.id === track.id);
      
      if (isFavorited) {
        return prev.filter(t => t.id !== track.id);
      } else {
        return [...prev, track];
      }
    });
  };

  const isFavorite = (trackId: string) => {
    return favorites.some(track => track.id === trackId);
  };

  const value = {
    currentTrack,
    isPlaying,
    volume,
    queue,
    recentlyPlayed,
    favorites,
    playTrack,
    pauseTrack,
    resumeTrack,
    setVolume,
    nextTrack,
    prevTrack,
    toggleFavorite,
    isFavorite
  };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}