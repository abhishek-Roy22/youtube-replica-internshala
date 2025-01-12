import {
  Clock,
  Compass,
  Film,
  Flame,
  Gamepad2,
  History,
  Home,
  Lightbulb,
  Music2,
  Newspaper,
  PlaySquare,
  ThumbsUp,
  Trophy,
} from 'lucide-react';

export const menuItems = [
  { icon: Home, label: 'Home', active: true },
  { icon: Compass, label: 'Explore' },
  { icon: PlaySquare, label: 'Subscriptions' },
  { icon: Clock, label: 'Watch Later' },
  { icon: ThumbsUp, label: 'Liked Videos' },
  { icon: History, label: 'History' },
];

export const categories = [
  { icon: Film, label: 'Movies' },
  { icon: Music2, label: 'Music' },
  { icon: Gamepad2, label: 'Gaming' },
  { icon: Newspaper, label: 'News' },
  { icon: Trophy, label: 'Sports' },
  { icon: Lightbulb, label: 'Learning' },
  { icon: Flame, label: 'Trending' },
];

export const videos = [
  {
    id: 1,
    title: 'Building a Modern Web Application with React and TypeScript',
    channel: 'Tech Masters',
    thumbnail:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    views: '254K',
    timestamp: '12:45',
  },
  {
    id: 2,
    title: 'The Future of Artificial Intelligence - What to Expect in 2024',
    channel: 'Future Insights',
    thumbnail:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    views: '1.2M',
    timestamp: '18:30',
  },
  {
    id: 3,
    title: 'Epic Mountain Biking Adventure Through the Alps',
    channel: 'Adventure Sports',
    thumbnail:
      'https://images.unsplash.com/photo-1618254170747-36dc20360ddd?w=800&q=80',
    views: '789K',
    timestamp: '25:15',
  },
  {
    id: 4,
    title: "Master Chef's Secret Recipe: Perfect Pasta Every Time",
    channel: 'Culinary Arts',
    thumbnail:
      'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80',
    views: '425K',
    timestamp: '15:20',
  },
  {
    id: 5,
    title: "Understanding Quantum Computing: A Beginner's Guide",
    channel: 'Science Explained',
    thumbnail:
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
    views: '892K',
    timestamp: '22:10',
  },
  {
    id: 6,
    title: 'Urban Photography Tips: Capturing City Life',
    channel: 'Creative Lens',
    thumbnail:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
    views: '156K',
    timestamp: '10:30',
  },
];

export const filterCategories = [
  'All',
  'Music',
  'Gaming',
  'Live',
  'Computer Programming',
  'Podcasts',
  'News',
  'Cooking',
  'Recently uploaded',
];
