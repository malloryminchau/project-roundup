

const createAvailabilities = (db, time, url) => {
  return db.query(
    `
    INSERT INTO availabilities (time, event_id)
    VALUES($1, (
      SELECT id FROM event_proposals WHERE url = $2
    ))
    `, [time, url]
  ).catch(error => {
    console.log(error)
  })
};

module.exports = {
  createAvailabilities

};
