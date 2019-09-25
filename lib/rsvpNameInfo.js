const rsvpNameInfo = (db, name, email) => {
  return db.query (`
  INSERT INTO users (name, email)
  VALUES ($1, $2)
  `, [name, email])
  .then(res)
}

module.exports(rsvpNameInfo)
