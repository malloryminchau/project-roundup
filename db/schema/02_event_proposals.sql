DROP TABLE IF EXISTS event_proposals CASCADE;
CREATE TABLE event_proposals (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255),
  guest_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  description TEXT,
  url VARCHAR(255)
);
