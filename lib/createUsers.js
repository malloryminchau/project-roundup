const createEventProposalsUsers = (db, name, email) => {

  return db.query(`
  INSERT INTO people (name, email)
  VALUES($1, $2);
  `, [name, email]).catch(error => {
    console.log(error);
  });
};

module.exports = {
  createEventProposalsUsers

};
