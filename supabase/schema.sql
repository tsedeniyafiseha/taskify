-- Taskify Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE task_status AS ENUM ('pending', 'approved', 'rejected', 'completed', 'cancelled');
CREATE TYPE worker_status AS ENUM ('pending', 'approved', 'rejected', 'suspended');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE budget_type AS ENUM ('fixed', 'hourly');
CREATE TYPE payment_type AS ENUM ('task_posting', 'featured_task', 'worker_subscription', 'contact_access');

-- Profiles table (extends Supabase auth.users)
-- Users can be BOTH poster AND worker (flexible roles)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  -- Role flags (user can have multiple roles)
  is_poster BOOLEAN DEFAULT TRUE,
  is_worker BOOLEAN DEFAULT FALSE,
  is_admin BOOLEAN DEFAULT FALSE,
  -- Worker-specific fields (only relevant if is_worker = true)
  worker_status worker_status DEFAULT 'pending',
  bio TEXT,
  skills TEXT[] DEFAULT '{}',
  locations_covered TEXT[] DEFAULT '{}',
  working_hours TEXT,
  hourly_rate DECIMAL(10, 2),
  -- Subscription (for workers)
  subscription_active BOOLEAN DEFAULT FALSE,
  subscription_expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Locations table
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  region TEXT NOT NULL DEFAULT 'Canterbury',
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);


-- Tasks table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  poster_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id),
  location_id UUID NOT NULL REFERENCES locations(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  budget DECIMAL(10, 2) NOT NULL,
  budget_type budget_type NOT NULL DEFAULT 'fixed',
  working_hours TEXT,
  preferred_date DATE,
  contact_phone TEXT,
  contact_email TEXT,
  contact_whatsapp TEXT,
  image_url TEXT,
  status task_status NOT NULL DEFAULT 'pending',
  is_featured BOOLEAN DEFAULT FALSE,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  approved_at TIMESTAMPTZ,
  approved_by UUID REFERENCES profiles(id)
);

-- Payments table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'NZD',
  type payment_type NOT NULL,
  status payment_status NOT NULL DEFAULT 'pending',
  stripe_payment_id TEXT,
  task_id UUID REFERENCES tasks(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reviewee_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_tasks_poster_id ON tasks(poster_id);
CREATE INDEX idx_tasks_category_id ON tasks(category_id);
CREATE INDEX idx_tasks_location_id ON tasks(location_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_created_at ON tasks(created_at DESC);
CREATE INDEX idx_profiles_is_worker ON profiles(is_worker);
CREATE INDEX idx_profiles_worker_status ON profiles(worker_status);
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_reviews_task_id ON reviews(task_id);
CREATE INDEX idx_reviews_reviewee_id ON reviews(reviewee_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, is_poster, is_worker, is_admin)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    TRUE,
    FALSE,
    FALSE
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();


-- Row Level Security (RLS) Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- Categories policies (public read)
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT USING (true);

CREATE POLICY "Only admins can manage categories"
  ON categories FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = TRUE)
  );

-- Locations policies (public read)
CREATE POLICY "Locations are viewable by everyone"
  ON locations FOR SELECT USING (true);

CREATE POLICY "Only admins can manage locations"
  ON locations FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = TRUE)
  );

-- Tasks policies
CREATE POLICY "Approved tasks are viewable by everyone"
  ON tasks FOR SELECT USING (
    status = 'approved' OR poster_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = TRUE)
  );

CREATE POLICY "Users can create tasks"
  ON tasks FOR INSERT WITH CHECK (auth.uid() = poster_id);

CREATE POLICY "Users can update own tasks"
  ON tasks FOR UPDATE USING (
    poster_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = TRUE)
  );

CREATE POLICY "Users can delete own tasks"
  ON tasks FOR DELETE USING (
    poster_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = TRUE)
  );

-- Payments policies
CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT USING (
    user_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = TRUE)
  );

CREATE POLICY "Users can create own payments"
  ON payments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Reviews policies
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews FOR SELECT USING (true);

CREATE POLICY "Users can create reviews for completed tasks"
  ON reviews FOR INSERT WITH CHECK (
    auth.uid() = reviewer_id AND
    EXISTS (SELECT 1 FROM tasks WHERE tasks.id = task_id AND tasks.status = 'completed')
  );

-- Storage bucket for task images
-- Run this separately in Supabase Dashboard > Storage
-- CREATE BUCKET task-images WITH (public = true);

-- Insert default categories (ordered by priority)
INSERT INTO categories (name, slug, icon, description) VALUES
  ('Cleaning', 'cleaning', 'Sparkles', 'House cleaning, deep cleaning, end of tenancy'),
  ('Carpet Cleaning', 'carpet-cleaning', 'Sparkles', 'Professional carpet and upholstery cleaning'),
  ('Window Cleaning', 'window-cleaning', 'Sparkles', 'Interior and exterior window cleaning'),
  ('Handyman', 'handyman', 'Wrench', 'Basic repairs, installations, fixes'),
  ('Gardening', 'gardening', 'Leaf', 'Lawn mowing, hedge trimming, garden maintenance'),
  ('Tech Help', 'tech-help', 'Monitor', 'Computer help, phone setup, tech support'),
  ('Rubbish Removal', 'rubbish-removal', 'Package', 'Small scale rubbish and junk removal'),
  ('Moving Help', 'moving', 'Truck', 'Help with moving out, furniture moving'),
  ('Painting', 'painting', 'Palette', 'Small painting jobs, touch-ups'),
  ('Assembly', 'assembly', 'Puzzle', 'Furniture assembly, IKEA builds'),
  ('Delivery', 'delivery', 'Package', 'Local deliveries and pickups'),
  ('Pet Care', 'pet-care', 'Heart', 'Pet sitting, dog walking');

-- Insert default locations (Christchurch and Auckland)
INSERT INTO locations (name, slug, region, is_primary) VALUES
  -- Christchurch
  ('Christchurch CBD', 'christchurch-cbd', 'Christchurch', true),
  ('Riccarton', 'riccarton', 'Christchurch', true),
  ('Papanui', 'papanui', 'Christchurch', true),
  ('Hornby', 'hornby', 'Christchurch', true),
  ('Fendalton', 'fendalton', 'Christchurch', true),
  ('Rolleston', 'rolleston', 'Christchurch', false),
  -- Auckland
  ('Auckland CBD', 'auckland-cbd', 'Auckland', true),
  ('Ponsonby', 'ponsonby', 'Auckland', true),
  ('Newmarket', 'newmarket', 'Auckland', true),
  ('Mt Eden', 'mt-eden', 'Auckland', true),
  ('Takapuna', 'takapuna', 'Auckland', true),
  ('Henderson', 'henderson', 'Auckland', false);
