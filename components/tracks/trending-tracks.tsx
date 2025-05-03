'use client';

import { useState, useEffect } from 'react';
import { getTrendingTracks } from '@/lib/api';
import { Track } from '@/types';
import TrackList from './track-list';

export default function TrendingTracks() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const trendingTracks = await getTrendingTracks();
        setTracks(trendingTracks);
      } catch (error) {
        console.error('Error fetching trending tracks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <section className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Popular Right Now</h2>
      </div>

      {loading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      ) : (
        <TrackList tracks={tracks} />
      )}
    </section>
  );
}