function generateRandomString() { // this function generates a random 10 character string of alphanumeric characters
  let stringId = '';
  let alphaNumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0987654321';
  for (let i = 0; i < 10; i++) {
    stringId += alphaNumeric.charAt(Math.floor(Math.random() * alphaNumeric.length));
  }
  return stringId;
}

const createDescription = (db, title, description, location) => {
  // Add URL Generator for the url parameter
  return db.query(`
  INSERT INTO event_proposals (title, description, location, url)
  VALUES ($1, $2, $3, $4)
  `, [title, description, location, url]).catch(error => {
    console.log(error)
  })
};

module.exports = {
  createDescription
};
