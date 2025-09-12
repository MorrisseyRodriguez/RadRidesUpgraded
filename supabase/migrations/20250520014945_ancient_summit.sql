/*
  # Create inquiries tables

  1. New Tables
    - `inquiries`
      - `id` (uuid, primary key)
      - `type` (text)
      - `message` (text)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `created_at` (timestamptz)
    
    - `car_inquiries`
      - `id` (uuid, primary key)
      - `car_id` (text)
      - `car_name` (text)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for public insert access
    - Add policies for authenticated read access
*/

-- Create inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  message text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create car inquiries table
CREATE TABLE IF NOT EXISTS car_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  car_id text NOT NULL,
  car_name text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE car_inquiries ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow insert for all users" ON inquiries
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow insert for all users" ON car_inquiries
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow read for authenticated users" ON inquiries
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow read for authenticated users" ON car_inquiries
  FOR SELECT
  TO authenticated
  USING (true);