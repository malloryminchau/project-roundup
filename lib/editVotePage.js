const editVotePage = (db, url, email, time, availability) => {
  return db.query (`
  UPDATE availabilities
  SET availability = $4
  WHERE user_id = (
    SELECT id FROM people WHERE email = $2)
    AND event_id = (SELECT id FROM event_proposals WHERE url = $1 )
    AND time = $3
  `, [url, email, time, availability])
    .catch(error => {
      console.log(error)
    })

    };

    module.exports = {
      editVotePage

    };
