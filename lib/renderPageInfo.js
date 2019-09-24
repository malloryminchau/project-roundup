const renderPageInfo = (db, url) => {
  let info  = {}
  return info.title = db.query (
    `
    SELECT title, description, location FROM event_proposals
    WHERE url = $1
    `, [url])
    .catch(error => {
      console.log(error)
    })

    };

    module.exports = {
      renderPageInfo

    };
