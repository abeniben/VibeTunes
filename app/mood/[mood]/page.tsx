import { Metadata } from 'next';
import MoodHeader from '@/components/mood/mood-header';
import TrackList from '@/components/tracks/track-list';
import { getMoodTracks } from '@/lib/api';
import { notFound } from 'next/navigation';
import { validMoods, getMoodEmoji, getMoodTitle } from '@/lib/moods';

interface MoodPageProps {
  params: {
    mood: string;
  };
}

export async function generateMetadata({ params }: MoodPageProps): Promise<Metadata> {
  const { mood } = params;
  
  if (!validMoods.includes(mood)) {
    return {
      title: 'Mood Not Found - VibeTune',
    };
  }
  
  return {
    title: `${getMoodTitle(mood)} Music - VibeTune`,
    description: `Discover music that matches your ${mood} mood - VibeTune`
  };
}

export default async function MoodPage({ params }: MoodPageProps) {
  const { mood } = params;
  
  if (!validMoods.includes(mood)) {
    notFound();
  }
  
  const tracks = await getMoodTracks(mood);
  
  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <MoodHeader 
        mood={mood}
        emoji={getMoodEmoji(mood)}
        title={getMoodTitle(mood)}
      />
      
      <div className="mt-12">
        <TrackList tracks={tracks} />
      </div>
    </div>
  );
}