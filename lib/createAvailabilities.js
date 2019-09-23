const createEventProposalsIntoAvailabilities = (db, time, availability) => {
  return db.query(
    `
    INSERT INTO availabilities (availabilities.time, availabilities.availability)
    VALUES($1, $2)
    `, [time, availability]
  ).catch(error => {
    console.log(error);
  });
};

module.exports = {
  createEventProposalsIntoAvailabilities

};
