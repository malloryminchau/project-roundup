const renderAvailability = (db, url) => {
  console.log(url)
  return db.query (
    `
    SELECT DISTINCT time
    FROM availabilities
    WHERE event_id =
    (SELECT id FROM event_proposals WHERE url = $1)
    GROUP BY time
    `, [url])

    .catch(error => {
      console.log(error)
    })
  }

  module.exports = {
    renderAvailability
  };
