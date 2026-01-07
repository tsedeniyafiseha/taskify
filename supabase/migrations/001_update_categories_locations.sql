-- =============================================
-- MIGRATION: Update Categories and Locations
-- Copy this entire script and run in Supabase SQL Editor
-- https://supabase.com/dashboard/project/ycvuptgxymzwsbwuvhis/sql
-- =============================================

-- Step 1: Delete existing tasks first (they reference categories/locations)
DELETE FROM tasks;

-- Step 2: Delete existing categories and locations
DELETE FROM categories;
DELETE FROM locations;

-- Step 3: Insert new categories (ordered by priority)
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

-- Step 4: Insert new locations (Christchurch and Auckland)
INSERT INTO locations (name, slug, region, is_primary) VALUES
  ('Christchurch CBD', 'christchurch-cbd', 'Christchurch', true),
  ('Riccarton', 'riccarton', 'Christchurch', true),
  ('Papanui', 'papanui', 'Christchurch', true),
  ('Hornby', 'hornby', 'Christchurch', true),
  ('Fendalton', 'fendalton', 'Christchurch', true),
  ('Rolleston', 'rolleston', 'Christchurch', false),
  ('Auckland CBD', 'auckland-cbd', 'Auckland', true),
  ('Ponsonby', 'ponsonby', 'Auckland', true),
  ('Newmarket', 'newmarket', 'Auckland', true),
  ('Mt Eden', 'mt-eden', 'Auckland', true),
  ('Takapuna', 'takapuna', 'Auckland', true),
  ('Henderson', 'henderson', 'Auckland', false);

-- Verify results
SELECT 'Categories:' as info;
SELECT name, slug FROM categories ORDER BY name;

SELECT 'Locations:' as info;
SELECT name, region, is_primary FROM locations ORDER BY region, is_primary DESC, name;
