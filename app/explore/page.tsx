'use client';

import { useState } from 'react';
import { Tab } from '@/components/ui/tab';
import { getMoodTracks, getGenreTracks, getArtistTracks, getYearTracks } from '@/lib/api';
import { useEffect } from 'react';
import { Track } from '@/types';
import TrackList from '@/components/tracks/track-list';
import { validMoods, getMoodEmoji, getMoodTitle } from '@/lib/moods';

const genres = ['Pop', 'Rock', 'Hip Hop', 'R&B', 'Electronic', 'Classical'];
const artists = ['Ed Sheeran', 'Taylor Swift', 'Drake', 'Billie Eilish', 'The Weeknd', 'Hillsong'];
const years = ['2023', '2010s', '2000s', '90s', '80s', '70s'];

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState('mood');
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('');

  const fetchFilteredTracks = async (filter: string, type: string) => {
    setLoading(true);
    try {
      let result: Track[] = [];
      switch (type) {
        case 'mood':
          result = await getMoodTracks(filter);
          break;
        case 'genre':
          result = await getGenreTracks(filter);
          break;
        case 'artist':
          result = await getArtistTracks(filter);
          break;
        case 'year':
          result = await getYearTracks(filter);
          break;
      }
      setTracks(result);
    } catch (error) {
      console.error('Error fetching tracks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeFilter) {
      fetchFilteredTracks(activeFilter, activeTab);
    } else {
      setTracks([]);
    }
  }, [activeFilter, activeTab]);

  const renderFilterButtons = () => {
    switch (activeTab) {
      case 'mood':
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {validMoods.map(mood => (
              <button
                key={mood}
                onClick={() => setActiveFilter(mood)}
                className={`p-4 rounded-lg flex flex-col items-center transition-all ${
                  activeFilter === mood 
                    ? 'bg-primary-100 dark:bg-primary-900 border-2 border-primary-500' 
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="text-3xl mb-2">{getMoodEmoji(mood)}</span>
                <span className="text-sm font-medium">{getMoodTitle(mood)}</span>
              </button>
            ))}
          </div>
        );
      case 'genre':
        return (
          <div className="flex flex-wrap gap-3">
            {genres.map(genre => (
              <button
                key={genre}
                onClick={() => setActiveFilter(genre)}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeFilter === genre 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        );
      case 'artist':
        return (
          <div className="flex flex-wrap gap-3">
            {artists.map(artist => (
              <button
                key={artist}
                onClick={() => setActiveFilter(artist)}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeFilter === artist 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {artist}
              </button>
            ))}
          </div>
        );
      case 'year':
        return (
          <div className="flex flex-wrap gap-3">
            {years.map(year => (
              <button
                key={year}
                onClick={() => setActiveFilter(year)}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeFilter === year 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Explore Music</h1>
      
      <div className="mb-8">
        <div className="flex border-b border-gray-200 dark:border-gray-700 gap-2">
          <Tab active={activeTab === 'mood'} onClick={() => { setActiveTab('mood'); setActiveFilter(''); }}>
            By Mood
          </Tab>
          <Tab active={activeTab === 'genre'} onClick={() => { setActiveTab('genre'); setActiveFilter(''); }}>
            By Genre
          </Tab>
          <Tab active={activeTab === 'artist'} onClick={() => { setActiveTab('artist'); setActiveFilter(''); }}>
            By Artist
          </Tab>
          <Tab active={activeTab === 'year'} onClick={() => { setActiveTab('year'); setActiveFilter(''); }}>
            By Year
          </Tab>
        </div>
      </div>
      
      <div className="mb-8">
        {renderFilterButtons()}
      </div>
      
      <div className="mt-8">
        {loading ? (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <>
            {activeFilter && tracks.length > 0 && (
              <TrackList tracks={tracks} />
            )}
            
            {activeFilter && tracks.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">No tracks found. Try another filter.</p>
              </div>
            )}
            
            {!activeFilter && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">Select a filter to discover music.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}