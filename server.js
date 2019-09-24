// load .env data into process.env
require('dotenv').config();
const createUsers = require('./lib/createUsers.js')
const createEventProposals = require('./lib/createEventProposals.js')
const createAvailabilities = require('./lib/createAvailabilities.js')

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
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
  let email = req.body.nameInput[1]

  createUsers.createEventProposalsUsers(db, req.body.nameInput[0], req.body.nameInput[1])
  return res.send(email)

})

function generateRandomString() { // this function generates a random 10 character string of alphanumeric characters
  let stringId = '';
  let alphaNumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0987654321';
  for (let i = 0; i < 10; i++) {
    stringId += alphaNumeric.charAt(Math.floor(Math.random() * alphaNumeric.length));
  }
  return stringId;
}

app.post("/api/eventdesc", (req, res) => {
  console.log('post event desc')
  let url = generateRandomString();
  createEventProposals.createDescription(db, req.body.eventInput[0], req.body.eventInput[1], req.body.eventInput[2], req.body.eventInput[3], url)
  res.send(url)
})

app.post("/api/availabilities", (req, res) => {
  // console.log(req.body.availabilities[1])
  createAvailabilities.createAvailabilities(db, req.body.availabilities[0], req.body.availabilities[1])
  res.send("blah")
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

