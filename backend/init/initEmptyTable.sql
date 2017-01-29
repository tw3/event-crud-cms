\c event_db;

-- Drop table
DROP TABLE IF EXISTS scheduled_events;

-- Create table
CREATE TABLE scheduled_events (
  ID SERIAL PRIMARY KEY,
  title VARCHAR,
  start_dt TIMESTAMP WITH TIME ZONE,
  end_dt TIMESTAMP WITH TIME ZONE,
  category VARCHAR,
  description VARCHAR,
  featured_bl BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp
);
