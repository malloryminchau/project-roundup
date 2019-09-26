const voteInsert = (db, url, email, time, availability) => {
  return db.query (`
  INSERT INTO availabilities (event_id, user_id, time, availability)
  VALUES ((SELECT id FROM event_proposals WHERE url = $1 ), (
    SELECT id FROM people WHERE email = $2), $3, $4)
  `, [url, email, time, availability])
    .catch(error => {
      console.log(error)
    })

    };

    module.exports = {
      voteInsert

    };
