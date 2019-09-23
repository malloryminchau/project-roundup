DROP TABLE IF EXISTS event_proposals CASCADE;
CREATE TABLE event_proposals (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255),
  creator_id INTEGER REFERENCES people(id) ON DELETE CASCADE,
  description TEXT,
  location VARCHAR(255),
  url VARCHAR(255)
);
