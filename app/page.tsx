import Hero from '@/components/hero/hero';
import MoodPicker from '@/components/mood/mood-picker';
import TrendingTracks from '@/components/tracks/trending-tracks';
import HowItWorks from '@/components/sections/how-it-works';

export default function Home() {
  return (
    <div className="container max-w-6xl mx-auto px-4 py-8 space-y-12">
      <Hero />
      <MoodPicker />
      <TrendingTracks />
      <HowItWorks />
    </div>
  );
}