const renderTable = (db, url) => {
  return db.query (
    `
    SELECT availabilities.time, availabilities.availability, people.name
    FROM availabilities
    JOIN people ON people.id = availabilities.user_id
    WHERE event_id = (
      SELECT id
      FROM event_proposals
      WHERE url = $1
    )
    `, [url])
    .catch(error => {
      console.log(error)
  })

};

module.exports = { renderTable };
