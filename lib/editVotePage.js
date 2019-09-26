const editVotePage = (db, url, email, time, availability) => {
  return db.query (`
  UPDATE availabilities
  SET availability = $4
  `, [url, email, time, availability])
    .catch(error => {
      console.log(error)
    })

    };

    module.exports = {
      editVotePage

    };
