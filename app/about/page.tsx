import Image from 'next/image';
import Link from 'next/link';
import { Music, RefreshCw, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
        <div className="h-40 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">About VibeTune</h1>
        </div>
        
        <div className="p-8">
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">What is VibeTune?</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              VibeTune is a music discovery platform that connects you with songs that match your emotional state. 
              We believe music is a powerful force that can amplify, change, or soothe your emotions. 
              Whether you're feeling energetic, chill, happy, sad, romantic, or angry, 
              VibeTune helps you find the perfect soundtrack for your moment.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">How VibeTune Works</h2>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg text-center">
                <div className="mb-4 flex justify-center">
                  <Music size={40} className="text-primary-500" />
                </div>
                <h3 className="font-semibold mb-2">Select Your Mood</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Choose from our mood emojis or take a quick mood test to find your current emotional state.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg text-center">
                <div className="mb-4 flex justify-center">
                  <RefreshCw size={40} className="text-primary-500" />
                </div>
                <h3 className="font-semibold mb-2">Discover Tracks</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Our algorithm matches your mood with the perfect songs, giving you a personalized playlist.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg text-center">
                <div className="mb-4 flex justify-center">
                  <Heart size={40} className="text-primary-500" />
                </div>
                <h3 className="font-semibold mb-2">Save & Enjoy</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Love a song? Save it to your favorites to easily find it later, no account needed.
                </p>
              </div>
            </div>
          </section>
          
          <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">For Music Explorers</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                VibeTune helps you discover music the way you actually listen — by mood, moment, or pure curiosity. 
                No algorithms pretending to read your mind.
              </p>

              <h3 className="text-lg font-medium mt-6 mb-2">How Real People Use It</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                <li>
                  <span className="font-medium">"I don't know what I want"</span>
                  <ul className="list-[circle] list-inside ml-5 mt-1 space-y-1">
                    <li>→ Tap a mood (Happy/Chill/Angry)</li>
                    <li>→ Get a tailored YouTube playlist instantly</li>
                  </ul>
                </li>
                <li>
                  <span className="font-medium">"I need something specific"</span>
                  <ul className="list-[circle] list-inside ml-5 mt-1 space-y-1">
                    <li>→ Search like you'd talk to a friend</li>
                    <li>→ (<i>"songs for rainy nights"</i>, <i>"90s gym hype"</i>)</li>
                  </ul>
                </li>
                <li>
                  <span className="font-medium">"Random Mood"</span>
                  <ul className="list-[circle] list-inside ml-5 mt-1 space-y-1">
                    <li>→ Hit <i>Surprise me</i> if you don't knw your mood for instant adventure</li>
                  </ul>
                </li>
              </ul>

              <h3 className="text-lg font-medium mt-6 mb-2">What Makes VibeTune Unique</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                <li><span className="font-medium">No login needed</span> — Start discovering in 2 taps</li>
                <li><span className="font-medium">Your taste stays private</span> — All history stays on your device</li>
                <li><span className="font-medium">Built for short attention spans</span> — Skip tracks with one swipe</li>
              </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Created By</h2>
            <div className="flex items-center">
              <p className="text-gray-700 dark:text-gray-300">
              VibeTune was created by Abenezer Teshome, a developer passionate about music and technology.
              </p>
            </div>
            
            <div className="mt-8 text-center">
              <Link 
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
              >
                Start Discovering
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}