/*
  # Update Inquires table columns

  1. Changes
    - Add tell_us_about_your_request column
    - Update type column to request_type
    - Drop message column as it's being replaced

  2. Security
    - Maintain existing RLS policies
*/

ALTER TABLE "Inquires"
  ADD COLUMN IF NOT EXISTS tell_us_about_your_request text,
  ADD COLUMN IF NOT EXISTS request_type text;

-- Copy existing data
UPDATE "Inquires"
SET tell_us_about_your_request = message,
    request_type = type
WHERE message IS NOT NULL;

-- Drop old columns
ALTER TABLE "Inquires"
  DROP COLUMN IF EXISTS message,
  DROP COLUMN IF EXISTS type;