const rsvpNameInfo = (db, name, email) => {
  return db.query (`
  SELECT * FROM people WHERE email = $1
  `, [email])
  .then(data => {
    if(!data.rows.length) {
      return db.query (`
        INSERT INTO people (name, email)
        VALUES ($1, $2)
  `, [name, email])
    } else {
      return "error can't insert"
    }
    console.log("data is", data.rows)
  })
  .catch(error => {
    console.log(error)
  })
}

module.exports = { rsvpNameInfo };
