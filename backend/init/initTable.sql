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

-- Insert sample data
INSERT INTO scheduled_events (title, start_dt, end_dt, category, description, featured_bl)
  VALUES ('Mileys recital', '2016-10-19 18:00:00 -05:00', '2016-10-19 19:00:00 -05:00', 'music',
  'Miley is going to play piano and sing some songs', TRUE);
INSERT INTO scheduled_events (title, start_dt, end_dt, category, description, featured_bl)
  VALUES ('Trump''s inauguration', '2017-01-20 15:00:00 -05:00', '2017-01-20 16:00:00 -05:00', 'politics',
  'Donald Trump will officially become POTUS', FALSE);
INSERT INTO scheduled_events (title, start_dt, end_dt, category, description, featured_bl)
  VALUES ('José''s summer vacation', '2017-06-01 12:00:00 -05:00', '2017-08-31 11:59:59 -05:00', 'vacation',
  'José will be traveling to Barbados for summer vacation', FALSE);