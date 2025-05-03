// Define all valid moods
export const validMoods = ['happy', 'sad', 'energetic', 'chill', 'romantic', 'angry'];

// Map mood to emoji
export function getMoodEmoji(mood: string): string {
  switch (mood) {
    case 'happy':
      return '😊';
    case 'sad':
      return '😢';
    case 'energetic':
      return '⚡';
    case 'chill':
      return '😌';
    case 'romantic':
      return '❤️';
    case 'angry':
      return '😡';
    default:
      return '🎵';
  }
}

// Map mood to title
export function getMoodTitle(mood: string): string {
  switch (mood) {
    case 'happy':
      return 'Happy';
    case 'sad':
      return 'Sad';
    case 'energetic':
      return 'Energetic';
    case 'chill':
      return 'Chill';
    case 'romantic':
      return 'Romantic';
    case 'angry':
      return 'Angry';
    default:
      return 'Unknown Mood';
  }
}