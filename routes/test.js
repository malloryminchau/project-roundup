require("dotenv").config({ path: __dirname + "/.env" });
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log("test", require("dotenv").config());
console.log(
  "Your environment variable TWILIO_ACCOUNT_SID has the value: ",
  process.env.TWILIO_ACCOUNT_SID
);

console.log("DB user", process.env.DB_USER);

console.log("SENDGRID API KEY", process.env.SENDGRID_API_KEY);

const msg = {
  to: "duongandrews@gmail.com",
  from: "duongandrews@example.com",
  subject: "Sending with SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>"
};
sgMail.send(msg);
