'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import TrackList from '@/components/tracks/track-list';
import { searchTracks } from '@/lib/api';
import { Track } from '@/types';
import EmptyState from '@/components/ui/empty-state';
import { useDebounce } from '@/hooks/use-debounce';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setTracks([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const results = await searchTracks(debouncedQuery);
        setTracks(results);
        setSearched(true);
      } catch (error) {
        console.error('Error searching tracks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="relative mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search songs, artists..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      ) : (
        <>
          {tracks.length > 0 ? (
            <TrackList tracks={tracks} />
          ) : searched && debouncedQuery.length >= 2 ? (
            <EmptyState
              title="No results found"
              description="Try searching for something else or discover music by mood."
              action="/mood-test"
              actionText="Try Mood Test"
            />
          ) : null}
        </>
      )}
    </div>
  );
}