import { Task, Category } from '@/types';

// Categories - ordered by priority (main services first)
export const categories: Category[] = [
  { id: 'all', name: 'All Tasks', icon: 'Grid3X3', count: 156, image: '' },
  { id: 'cleaning', name: 'Cleaning', icon: 'Sparkles', count: 45, image: '' },
  { id: 'carpet-cleaning', name: 'Carpet Cleaning', icon: 'Sparkles', count: 28, image: '' },
  { id: 'window-cleaning', name: 'Window Cleaning', icon: 'Sparkles', count: 22, image: '' },
  { id: 'handyman', name: 'Handyman', icon: 'Wrench', count: 35, image: '' },
  { id: 'gardening', name: 'Gardening', icon: 'Leaf', count: 30, image: '' },
  { id: 'tech-help', name: 'Tech Help', icon: 'Monitor', count: 18, image: '' },
  { id: 'rubbish-removal', name: 'Rubbish Removal', icon: 'Package', count: 25, image: '' },
  { id: 'moving', name: 'Moving Help', icon: 'Truck', count: 32, image: '' },
];

export const tasks: Task[] = [
  {
    id: '1',
    title: 'Deep clean 3-bedroom house',
    description: 'Need thorough cleaning including kitchen, bathrooms, and all bedrooms. Must bring own supplies.',
    category: 'cleaning',
    budget: 180,
    location: 'Riccarton',
    postedAt: '2 hours ago',
    status: 'open',
    offers: 12,
    image: '',
    poster: { name: 'Sarah M.', avatar: '', rating: 4.9, tasksPosted: 23 }
  },
  {
    id: '2',
    title: 'Carpet cleaning for 4 rooms',
    description: 'Need professional carpet cleaning for lounge and 3 bedrooms. Pet-friendly products preferred.',
    category: 'carpet-cleaning',
    budget: 150,
    location: 'Ponsonby',
    postedAt: '4 hours ago',
    status: 'open',
    offers: 8,
    image: '',
    poster: { name: 'James K.', avatar: '', rating: 4.7, tasksPosted: 15 }
  },
  {
    id: '3',
    title: 'Window cleaning - 2 storey house',
    description: 'All windows inside and out for a 2 storey house. Approximately 20 windows total.',
    category: 'window-cleaning',
    budget: 120,
    location: 'Mt Eden',
    postedAt: '5 hours ago',
    status: 'open',
    offers: 6,
    image: '',
    poster: { name: 'Lisa T.', avatar: '', rating: 5.0, tasksPosted: 8 }
  },
  {
    id: '4',
    title: 'Garden cleanup and lawn mowing',
    description: 'Overgrown backyard needs attention. Mowing, weeding, and general tidy up required.',
    category: 'gardening',
    budget: 95,
    location: 'Fendalton',
    postedAt: '6 hours ago',
    status: 'open',
    offers: 4,
    image: '',
    poster: { name: 'Mike R.', avatar: '', rating: 4.8, tasksPosted: 31 }
  },
  {
    id: '5',
    title: 'Help moving out - need 2 people',
    description: 'Moving from apartment to new house. Need help with furniture and boxes. Have a van already.',
    category: 'moving',
    budget: 140,
    location: 'Auckland CBD',
    postedAt: '8 hours ago',
    status: 'open',
    offers: 15,
    image: '',
    poster: { name: 'Emma W.', avatar: '', rating: 4.6, tasksPosted: 5 }
  },
  {
    id: '6',
    title: 'Fix leaky tap and install shelf',
    description: 'Kitchen tap has been dripping. Also need a floating shelf installed in living room.',
    category: 'handyman',
    budget: 85,
    location: 'Hornby',
    postedAt: '10 hours ago',
    status: 'open',
    offers: 7,
    image: '',
    poster: { name: 'David L.', avatar: '', rating: 4.9, tasksPosted: 12 }
  },
  {
    id: '7',
    title: 'Help setting up new laptop',
    description: 'Need help transferring files, setting up email and installing software on new laptop.',
    category: 'tech-help',
    budget: 60,
    location: 'Takapuna',
    postedAt: '12 hours ago',
    status: 'open',
    offers: 5,
    image: '',
    poster: { name: 'Anna P.', avatar: '', rating: 4.5, tasksPosted: 3 }
  },
  {
    id: '8',
    title: 'Remove old furniture and rubbish',
    description: 'Need old couch, mattress and boxes removed from garage. Will need a trailer or ute.',
    category: 'rubbish-removal',
    budget: 110,
    location: 'Rolleston',
    postedAt: '1 day ago',
    status: 'open',
    offers: 9,
    image: '',
    poster: { name: 'Chris B.', avatar: '', rating: 4.8, tasksPosted: 7 }
  },
];

export const locations = [
  'All Locations',
  // Christchurch
  'Christchurch CBD',
  'Riccarton',
  'Papanui',
  'Hornby',
  'Fendalton',
  'Rolleston',
  // Auckland
  'Auckland CBD',
  'Ponsonby',
  'Newmarket',
  'Mt Eden',
  'Takapuna',
  'Henderson',
];

export const featuredTaskers = [
  {
    id: '1',
    name: 'Hassan M.',
    avatar: '',
    rating: 5.0,
    reviews: 73,
    completionRate: 97,
    specialties: ['Handyman', 'Plumbing', 'Repairs'],
    description: 'Professional handyman with 11 years experience. Available for all types of repairs.',
    verified: true,
    image: ''
  },
  {
    id: '2',
    name: 'Philippe R.',
    avatar: '',
    rating: 4.9,
    reviews: 156,
    completionRate: 93,
    specialties: ['Moving Help', 'Rubbish Removal', 'Delivery'],
    description: 'Reliable mover with a team. We handle moves of all sizes across NZ.',
    verified: true,
    image: ''
  },
  {
    id: '3',
    name: 'Star L.',
    avatar: '',
    rating: 4.7,
    reviews: 89,
    completionRate: 95,
    specialties: ['Cleaning', 'Carpet Cleaning', 'Window Cleaning'],
    description: 'Thorough, reliable cleaner. I take pride in leaving every space spotless.',
    verified: true,
    image: ''
  },
  {
    id: '4',
    name: 'Geoff T.',
    avatar: '',
    rating: 5.0,
    reviews: 124,
    completionRate: 95,
    specialties: ['Gardening', 'Lawn Care', 'Landscaping'],
    description: 'Professional gardener. No job too small. Flexible hours to suit your schedule.',
    verified: true,
    image: ''
  },
];

export const stats = [
  { label: 'Tasks Completed', value: '50,000+' },
  { label: 'Active Taskers', value: '2,500+' },
  { label: 'Happy Customers', value: '15,000+' },
  { label: 'Average Rating', value: '4.8★' },
];
