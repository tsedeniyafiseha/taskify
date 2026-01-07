-- Add offers table to existing schema
-- Run this in your Supabase SQL Editor after the main schema

-- Offers table for worker bids on tasks
CREATE TABLE offers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  worker_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'withdrawn')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(task_id, worker_id)
);

-- Messages table for task communication
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes
CREATE INDEX idx_offers_task_id ON offers(task_id);
CREATE INDEX idx_offers_worker_id ON offers(worker_id);
CREATE INDEX idx_offers_status ON offers(status);
CREATE INDEX idx_messages_task_id ON messages(task_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);

-- Add updated_at trigger for offers
CREATE TRIGGER update_offers_updated_at
  BEFORE UPDATE ON offers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS policies for offers
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Task posters and offer workers can view offers"
  ON offers FOR SELECT USING (
    worker_id = auth.uid() OR 
    EXISTS (SELECT 1 FROM tasks WHERE tasks.id = task_id AND tasks.poster_id = auth.uid()) OR
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = TRUE)
  );

CREATE POLICY "Workers can create offers"
  ON offers FOR INSERT WITH CHECK (
    auth.uid() = worker_id AND
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_worker = TRUE AND profiles.worker_status = 'approved')
  );

CREATE POLICY "Workers can update own offers"
  ON offers FOR UPDATE USING (
    worker_id = auth.uid() OR
    EXISTS (SELECT 1 FROM tasks WHERE tasks.id = task_id AND tasks.poster_id = auth.uid()) OR
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = TRUE)
  );

-- RLS policies for messages
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Task participants can view messages"
  ON messages FOR SELECT USING (
    sender_id = auth.uid() OR receiver_id = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = TRUE)
  );

CREATE POLICY "Task participants can send messages"
  ON messages FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM tasks 
      WHERE tasks.id = task_id AND 
      (tasks.poster_id = auth.uid() OR tasks.poster_id = receiver_id)
    )
  );

-- Add assigned_worker_id to tasks table
ALTER TABLE tasks ADD COLUMN assigned_worker_id UUID REFERENCES profiles(id);
CREATE INDEX idx_tasks_assigned_worker_id ON tasks(assigned_worker_id);