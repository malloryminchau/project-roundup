// load .env data into process.env
require("dotenv").config();
const createUsers = require("./lib/createUsers.js");
const createEventProposals = require("./lib/createEventProposals.js");
const createAvailabilities = require("./lib/createAvailabilities.js");
const renderPageInfo = require("./lib/renderPageInfo.js");
const renderAvailability = require("./lib/renderAvailability.js");
const rsvpNameInfo = require("./lib/rsvpNameInfo.js");
const voteInsert = require("./lib/voteInsert.js");
const editVotePage = require("./lib/editVotePage.js")
const renderTable = require("./lib/renderTable.js")

//Twilio API
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/styles",
  sass({
    src: __dirname + "/styles",
    dest: __dirname + "/public/styles",
    debug: true,
    outputStyle: "expanded"
  })
);
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

//testPage to build table view
app.get("/testview", (req, res) => {
  res.render("testview");
});

app.post("/api/name", (req, res) => {
  // console.log(req.body.nameInput[0])
  // console.log(req.body.nameInput[1])
  let email = req.body.nameInput[1];

  createUsers.createEventProposalsUsers(
    db,
    req.body.nameInput[0],
    req.body.nameInput[1]
  );
  return res.send(email);
});

function generateRandomString() {
  // this function generates a random 10 character string of alphanumeric characters
  let stringId = "";
  let alphaNumeric =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0987654321";
  for (let i = 0; i < 10; i++) {
    stringId += alphaNumeric.charAt(
      Math.floor(Math.random() * alphaNumeric.length)
    );
  }
  return stringId;
}

app.post("/api/eventdesc", (req, res) => {
  console.log("post event desc");
  let url = generateRandomString();
  createEventProposals.createDescription(db, req.body.eventInput[0],
    req.body.eventInput[1],
    req.body.eventInput[2],
    req.body.eventInput[3],
    url
  );
  res.send(url);
});

app.post("/api/availabilities", (req, res) => {
  // console.log(req.body.availabilities[1])
  createAvailabilities.createAvailabilities(
    db,
    req.body.availabilities[0],
    req.body.availabilities[1]
  );
  res.send("blah");
});

app.post("/api/sendMail", (req, res) => {
  console.log("what is the request", req.body);
  const msg = {
    to: `${req.body.link[1]}`,

    from: "donotreply@roundup.com",
    subject: "RoundUp - Invitation Link",
    text: `Hi ${req.body.link[2]},

    Please forward this link: ${req.body.link[0]} to all users.

    Regards,

    RoundUp Crew`
  };
  sgMail.send(msg);

  res.send("test");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

app.get("/event/:url", (req, res) => {
  // let urlsIndex = { url: req.body }
  console.log("reqparams" + req.params.url);
  console.log("about to render or redirect to new page");
  let url = req.params.url;
  renderPageInfo
    .renderPageInfo(db, url)
    .then(response => {
      res.render("testview", {
        url: req.params.url,
        title: response.rows[0].title,
        location: response.rows[0].location,
        description: response.rows[0].description
      });
    })
    .catch(error => {
      console.log(error);
    });
});

app.get("/api/testrender", (req, res) => {
  let rsvpData = req.query.rsvpData;
  let url = req.query.rsvpData[2];
  console.log("1", req.query.url);
  // console.log("the URL is: " + url)
  renderAvailability.renderAvailability(db, url)
    .then(response => {
      console.log(response);
      console.log("response success");
      res.send(response.rows);
      rsvpNameInfo.rsvpNameInfo(db, req.query.rsvpData[0], req.query.rsvpData[1]);
    })
    .catch(error => {
      console.log(error);
    });
});

app.post("/api/insertvote", (req, res) => {
  console.log(req.body.proposalData)
  voteInsert.voteInsert(db, req.body.proposalData[0], req.body.proposalData[1], req.body.proposalData[2], req.body.proposalData[3])
  res.send('boo')
})

app.get("/api/editvoteinput", (req, res) => {
  let url = req.query.editData
  console.log("I HAVE RECEIVED THE AJAX REQUEST AND AM ABOUT TO WRITE: " + url)
  renderAvailability.renderAvailability(db, url)
  .then(response => {
    res.send(response.rows)
  })
})

app.post("/api/editvote", (req, res) => {
  editVotePage.editVotePage(db, req.body.proposalData[0], req.body.proposalData[1], req.body.proposalData[2], req.body.proposalData[3])
  .then(response => {
    console.log("THE DATABASE HAS PROBABLY BEEN EDITED NOW OKAY PLEASE")
    res.send(response.rows)
  })
})

app.get("/api/loadtable", (req, res) => {
  console.log("HEEERE ", req.query.url)
  renderTable.renderTable(db, req.query.url)
  .then(response => {
    // console.log(response)
    res.send(response.rows)
  })
})
