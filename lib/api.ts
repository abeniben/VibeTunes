import axios from 'axios';
import { Track } from '@/types';
import Fuse from 'fuse.js';

// Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours (1 refresh/day)
const MAX_RESULTS = 50; // Safe batch size for YouTube API

// In-memory cache with daily invalidation
interface CacheEntry {
  data: Track[];
  timestamp: number;
  day: number;
}

const cache: Record<string, CacheEntry> = {};

// Track current day for cache invalidation
function getCurrentDay(): number {
  return Math.floor(Date.now() / (24 * 60 * 60 * 1000));
}

// Enhanced cache function with daily refresh
async function fetchFromCache(
  key: string,
  fetcher: () => Promise<Track[]>
): Promise<Track[]> {
  const now = Date.now();
  const currentDay = getCurrentDay();

  const cached = cache[key];
  if (cached && cached.day === currentDay && now - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const data = await fetcher();
    cache[key] = { data, timestamp: now, day: currentDay };
    return data;
  } catch (error) {
    if (cached?.data) {
      console.warn('API failed, using cached data');
      return cached.data;
    }
    throw error;
  }
}

// Shared fetch function with quota protection
async function fetchYouTubeData(params: URLSearchParams): Promise<Track[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/youtube?${params.toString()}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        throw new Error('YouTube API quota exhausted');
      }
      if (error.response?.status === 400) {
        console.error('Invalid request parameters:', params.toString());
      }
    }
    throw error;
  }
}

// API Functions
export async function getTrendingTracks(): Promise<Track[]> {
  const params = new URLSearchParams({
    q: 'trending music',
    maxResults: MAX_RESULTS.toString(),
    order: getCurrentDay() % 2 === 0 ? 'relevance' : 'viewCount' // Daily randomization
  });
  return fetchFromCache('trending', () => fetchYouTubeData(params));
}

export async function getMoodTracks(mood: string): Promise<Track[]> {
  const moodQueries: Record<string, string> = {
    happy: "upbeat happy music",
    sad: "sad emotional songs",
    energetic: "energetic dance music",
    chill: "chill relaxing music",
    romantic: "romantic love songs",
    angry: "angry powerful music"
  };

  const params = new URLSearchParams({
    mood,
    maxResults: MAX_RESULTS.toString(),
    order: getCurrentDay() % 2 === 0 ? 'relevance' : 'viewCount' // Daily randomization
  });

  return fetchFromCache(`mood:${mood}`, () => fetchYouTubeData(params));
}

export async function getGenreTracks(genre: string): Promise<Track[]> {
  const params = new URLSearchParams({
    q: `${genre} music`,
    maxResults: MAX_RESULTS.toString(),
    order: 'relevance'
  });
  return fetchFromCache(`genre:${genre}`, () => fetchYouTubeData(params));
}

export async function getArtistTracks(artist: string): Promise<Track[]> {
  const params = new URLSearchParams({
    q: `${artist} music`,
    maxResults: MAX_RESULTS.toString(),
    order: 'relevance'
  });
  return fetchFromCache(`artist:${artist}`, () => fetchYouTubeData(params));
}

export async function getYearTracks(year: string): Promise<Track[]> {
  const params = new URLSearchParams({
    q: `${year} music`,
    maxResults: MAX_RESULTS.toString(),
    order: 'relevance'
  });
  return fetchFromCache(`year:${year}`, () => fetchYouTubeData(params));
}

export async function searchTracks(query: string): Promise<Track[]> {
  // For short queries, make an API call
  if (query.length < 3) {
    const params = new URLSearchParams({
      q: query,
      maxResults: MAX_RESULTS.toString()
    });
    return fetchFromCache(`search:${query}`, () => fetchYouTubeData(params));
  }

  // For longer queries, use Fuse.js to search across cached sources
  const [trending, happy, sad, energetic, chill] = await Promise.all([
    getTrendingTracks(),
    getMoodTracks('happy'),
    getMoodTracks('sad'),
    getMoodTracks('energetic'),
    getMoodTracks('chill')
  ]);

  // Combine all tracks for fuzzy search
  const allTracks = [...trending, ...happy, ...sad, ...energetic, ...chill];
  
  // Remove duplicates
  const uniqueTracks = allTracks.filter(
    (track, index, self) => index === self.findIndex(t => t.id === track.id)
  );
  
  // Initialize Fuse.js
  const fuse = new Fuse(uniqueTracks, {
    keys: ['title', 'artist'],
    threshold: 0.4,
    includeScore: true
  });
  
  // Perform search
  const results = fuse.search(query).map(result => result.item);
  
  // Fallback to API if insufficient results
  if (results.length < 5) {
    try {
      const params = new URLSearchParams({
        q: query,
        maxResults: MAX_RESULTS.toString()
      });
      return fetchFromCache(`search:${query}`, () => fetchYouTubeData(params));
    } catch (error) {
      console.error('Search fallback failed, returning fuzzy results:', error);
      return results;
    }
  }
  
  return results;
}

// Cache monitoring utility
export function getCacheStatus(): { size: number; dailyHits: number } {
  const currentDay = getCurrentDay();
  return {
    size: Object.keys(cache).length,
    dailyHits: Object.values(cache).filter(entry => entry.day === currentDay).length
  };
}