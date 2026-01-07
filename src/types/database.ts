export type TaskStatus = 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
export type WorkerStatus = 'pending' | 'approved' | 'rejected' | 'suspended';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  avatar_url: string | null;
  // Role flags - users can have multiple roles
  is_poster: boolean;
  is_worker: boolean;
  is_admin: boolean;
  // Worker-specific fields
  worker_status: WorkerStatus;
  bio: string | null;
  skills: string[];
  locations_covered: string[];
  working_hours: string | null;
  hourly_rate: number | null;
  // Subscription
  subscription_active: boolean;
  subscription_expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string | null;
  created_at: string;
}

export interface Location {
  id: string;
  name: string;
  slug: string;
  region: string;
  is_primary: boolean;
  created_at: string;
}

export interface Task {
  id: string;
  poster_id: string;
  category_id: string;
  location_id: string;
  title: string;
  description: string;
  budget: number;
  budget_type: 'fixed' | 'hourly';
  working_hours: string | null;
  preferred_date: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  contact_whatsapp: string | null;
  image_url: string | null;
  status: TaskStatus;
  is_featured: boolean;
  views: number;
  created_at: string;
  updated_at: string;
  approved_at: string | null;
  approved_by: string | null;
  // Joined fields
  poster?: Profile;
  category?: Category;
  location?: Location;
}

export interface Payment {
  id: string;
  user_id: string;
  amount: number;
  currency: string;
  type: 'task_posting' | 'featured_task' | 'worker_subscription' | 'contact_access';
  status: PaymentStatus;
  stripe_payment_id: string | null;
  task_id: string | null;
  created_at: string;
  completed_at: string | null;
}

export interface Review {
  id: string;
  task_id: string;
  reviewer_id: string;
  reviewee_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

export interface Offer {
  id: string;
  task_id: string;
  worker_id: string;
  amount: number;
  message: string | null;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  created_at: string;
  updated_at: string;
  // Joined fields
  task?: Task;
  worker?: Profile;
}

export interface Message {
  id: string;
  task_id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  // Joined fields
  sender?: Profile;
  receiver?: Profile;
}

// Database schema for Supabase
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>;
      };
      categories: {
        Row: Category;
        Insert: Omit<Category, 'id' | 'created_at'>;
        Update: Partial<Omit<Category, 'id' | 'created_at'>>;
      };
      locations: {
        Row: Location;
        Insert: Omit<Location, 'id' | 'created_at'>;
        Update: Partial<Omit<Location, 'id' | 'created_at'>>;
      };
      tasks: {
        Row: Task;
        Insert: Omit<Task, 'id' | 'created_at' | 'updated_at' | 'views' | 'approved_at' | 'approved_by'>;
        Update: Partial<Omit<Task, 'id' | 'created_at' | 'poster_id'>>;
      };
      payments: {
        Row: Payment;
        Insert: Omit<Payment, 'id' | 'created_at'>;
        Update: Partial<Omit<Payment, 'id' | 'created_at' | 'user_id'>>;
      };
      reviews: {
        Row: Review;
        Insert: Omit<Review, 'id' | 'created_at'>;
        Update: Partial<Omit<Review, 'id' | 'created_at' | 'task_id' | 'reviewer_id'>>;
      };
      offers: {
        Row: Offer;
        Insert: Omit<Offer, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Offer, 'id' | 'created_at' | 'task_id' | 'worker_id'>>;
      };
      messages: {
        Row: Message;
        Insert: Omit<Message, 'id' | 'created_at'>;
        Update: Partial<Omit<Message, 'id' | 'created_at' | 'task_id' | 'sender_id'>>;
      };
    };
  };
};
