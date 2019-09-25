const confirmRsvpData = (db, name, email, event_id, time, availability) => {

  return db.query (`
  INSERT INTO users (name, email)
  VALUES ($1, $2)

  
  `, [name, email])
  .then(res)
}
