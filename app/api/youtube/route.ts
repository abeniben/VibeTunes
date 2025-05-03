import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface YouTubeSearchResult {
  items: {
    id: { videoId: string };
    snippet: {
      title: string;
      channelTitle: string;
      thumbnails: { medium: { url: string } };
    };
  }[];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const mood = searchParams.get('mood');
  const maxResults = searchParams.get('maxResults') || '20';
  const order = searchParams.get('order') || 'relevance';

  const MOOD_QUERIES: Record<string, string> = {
    happy: "upbeat happy music",
    sad: "sad emotional songs",
    energetic: "energetic dance music",
    chill: "chill relaxing music",
    romantic: "romantic love songs",
    angry: "angry powerful music",
  };

  const searchTerm = mood ? MOOD_QUERIES[mood] : query;

  if (!searchTerm) {
    return NextResponse.json({ error: 'Search term is required' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?` +
      new URLSearchParams({
        part: 'snippet',
        q: searchTerm,
        maxResults,
        type: 'video',
        order,
        key: process.env.YOUTUBE_KEY || ''
      })
    );

    if (!response.ok) {
      throw new Error(`YouTube API responded with status: ${response.status}`);
    }

    const data: YouTubeSearchResult = await response.json();

    const tracks = data.items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.medium.url,
      duration: '3:45',
      source: 'youtube',
      youtubeUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      youtubeEmbedUrl: `https://www.youtube.com/embed/${item.id.videoId}`
    }));

    return NextResponse.json(tracks);
  } catch (error) {
    console.error('YouTube API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from YouTube API' },
      { status: 500 }
    );
  }
}