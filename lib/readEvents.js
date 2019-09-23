const pool = require('./db.js');

const displayAllTables = (url) => {
  return pool.query(`
  SELECT people.name, event_proposals.title, event_proposals.description, event_proposals.location, availabilities.time, availabilities.availability
  FROM people
  JOIN event_proposals ON users.id = event_proposals.guest_id
  JOIN availaibilities ON event_proposals.id = availabilities.event_id
  WHERE event_proposals.url = $1
  `, [url])
    .then(res => {
      return res.rows;
    });
};

module.exports = {
  displayAllTables
};
