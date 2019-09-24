
const createDescription = (db, title, description, location, guest_id, url) => {
  console.log("this is doing something!! I am trying to insert a guest_id")
  return db.query(`
  INSERT INTO event_proposals (title, guest_id, description, location, url)
  values($1, (SELECT people.id FROM people
  WHERE people.email = $2), $3, $4, $5)
  `, [title, guest_id, description, location, url])
  .catch(error=> {
    console.log(error)
  })
};
module.exports = {
  createDescription
};
