const createEventProposalsEP = (title, description, location, url) => {
  // Add URL Generator for the url parameter
  return pool.query(`
  INSERT INTO event_proposals (title, description, location, url)
  VALUES (${title}, ${description}, ${location})
  `);
};
