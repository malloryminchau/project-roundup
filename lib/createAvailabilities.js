const createAvailabilities = (db, time, event_id, availability, user_id) => {
  return db
    .query(
      `
    INSERT INTO availabilities (time, event_id, availability, user_id)
    VALUES($1, (SELECT event_proposals.id FROM event_proposals WHERE event_proposals.guest_id = $2), $3, (SELECT people.id FROM people WHERE people.email = $4)
    `,
      [time, event_id, availability, user_id]
    )
    .catch(error => {
      console.log(error);
    });
};

module.exports = {
  createAvailabilities
};
