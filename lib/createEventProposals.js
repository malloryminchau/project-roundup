// const createDescription = (db, title, description, location, url, email) => {
//   console.log('create desc')
//   //Add URL Generator for the url parameter
//   // const creator_id = db.query(`SELECT id FROM people
//   // WHERE email = $1
//   // `, [email])



//   return db.query(`
//     INSERT INTO event_proposals (title, description, location, url, guest_id)
//     VALUES ($1, $2, $3, $4,
//         SELECT id FROM people WHERE email = ${email});
//     `, [title, description, location, url, creator_id])
//   .catch(error => {
//     console.log(error)
//   })
// };

// module.exports = {
//   createDescription
// };

//title, description, location, guest_id, url

const createDescription = (db, title, description, location, guest_id, url) => {
  console.log(title);
  console.log(description);
  console.log(location);
  console.log(url);
  console.log(guest_id);
  console.log("this is doing something!! I am trying to insert a guest_id");
  return db.query(`
  INSERT INTO event_proposals (title, guest_id, description, location, url)
  VALUES($1, (SELECT people.id FROM people
  WHERE people.email = $2), $3, $4, $5)
  `, [title, guest_id, description, location, url])
    .catch(error => {
      console.log(error);
    });
};
module.exports = {
  createDescription
};
