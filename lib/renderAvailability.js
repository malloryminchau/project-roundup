const renderAvailability = (db, url) => {
  console.log(url)
  return db.query (
    `
    SELECT time, availability
    FROM availabilities
    WHERE event_id =
    (SELECT id FROM event_proposals WHERE url = $1)
    `, [url])

    // `
    // SELECT *
    // FROM availabilities
    // JOIN event_proposals
    // ON $1 = url
    // `, [url])


    .catch(error => {
      console.log(error)
    })
  }

  module.exports = {
    renderAvailability
  };
