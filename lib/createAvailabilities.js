

const createAvailabilities = (db, time, url) => {
  return db.query(
    `
    INSERT INTO availabilities (time, event_id, user_id, availability)
    VALUES($1, (
      SELECT id FROM event_proposals WHERE url = $2
    ), (SELECT guest_id FROM event_proposals WHERE url = $2), true)
    `, [time, url]
  ).catch(error => {
    console.log(error)
  })
};

module.exports = {
  createAvailabilities

};
