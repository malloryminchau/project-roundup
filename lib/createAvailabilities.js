const createEventProposalsIntoAvailabilities = (time, availability) => {
  return pool.query(
    `
    INSERT INTO availabilities (availabilities.time)
    VALUES(${time}, ${availability})
    `
  );
};
