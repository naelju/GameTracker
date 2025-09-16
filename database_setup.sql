-- Game Tracker Database Setup for Supabase
-- Run this SQL in your Supabase SQL Editor

-- Create the games table
CREATE TABLE IF NOT EXISTS games (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  date_started DATE,
  date_finished DATE,
  main_story TEXT NOT NULL DEFAULT 'no' CHECK (main_story IN ('yes', 'no', 'undefined')),
  side_quests_finished TEXT NOT NULL DEFAULT 'no' CHECK (side_quests_finished IN ('yes', 'no', 'undefined')),
  all_free_achievements TEXT NOT NULL DEFAULT 'no' CHECK (all_free_achievements IN ('yes', 'no', 'undefined')),
  all_achievements TEXT NOT NULL DEFAULT 'no' CHECK (all_achievements IN ('yes', 'no', 'undefined')),
  game_100_percent TEXT NOT NULL DEFAULT 'no' CHECK (game_100_percent IN ('yes', 'no', 'undefined')),
  main_story_comment TEXT,
  side_quests_comment TEXT,
  all_free_achievements_comment TEXT,
  all_achievements_comment TEXT,
  game_100_percent_comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on created_at for better query performance
CREATE INDEX IF NOT EXISTS idx_games_created_at ON games(created_at DESC);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_games_updated_at 
    BEFORE UPDATE ON games 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS) - optional but recommended
ALTER TABLE games ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for authenticated users
-- You can modify this based on your authentication needs
CREATE POLICY "Allow all operations for authenticated users" ON games
    FOR ALL USING (auth.role() = 'authenticated');

-- If you want to allow anonymous access (not recommended for production)
-- CREATE POLICY "Allow all operations for anonymous users" ON games
--     FOR ALL USING (true);
