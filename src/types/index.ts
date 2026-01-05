export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  location: string;
  postedAt: string;
  status: 'open' | 'assigned' | 'completed';
  offers: number;
  image?: string;
  poster: {
    name: string;
    avatar: string;
    rating: number;
    tasksPosted: number;
  };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  image?: string;
}

export interface FilterState {
  category: string;
  minBudget: number;
  maxBudget: number;
  location: string;
  sortBy: 'newest' | 'budget-high' | 'budget-low' | 'offers';
  status: string;
}

export interface Tasker {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviews: number;
  completionRate: number;
  specialties: string[];
  description: string;
  verified: boolean;
  image?: string;
}

export interface PostTaskForm {
  title: string;
  description: string;
  category: string;
  budget: number;
  location: string;
  dueDate: string;
  isFlexible: boolean;
}

export interface TaskerSignupForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  skills: string[];
  experience: string;
  about: string;
  hasVehicle: boolean;
  hasTools: boolean;
}
