/*
  # Fix table names to match requirements

  1. Changes
    - Rename 'inquiries' table to 'Inquires'
    - Update policies for renamed table
*/

-- Rename the table
ALTER TABLE IF EXISTS inquiries RENAME TO "Inquires";

-- Update policies for renamed table
DROP POLICY IF EXISTS "Allow insert for all users" ON "Inquires";
DROP POLICY IF EXISTS "Allow read for authenticated users" ON "Inquires";

CREATE POLICY "Allow insert for all users" ON "Inquires"
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow read for authenticated users" ON "Inquires"
  FOR SELECT
  TO authenticated
  USING (true);