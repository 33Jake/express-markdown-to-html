const express = require("express");
const showdown = require("showdown");
const bodyParser = require("body-parser");
const passport = require("passport");
const jwt = require("jwt-simple");
const path = require("path");
const LocalStrategy = require("passport-local").Strategy;

let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "build")));

let converter = new showdown.Converter();

const ADMIN = "username";
const ADMIN_PASSWORD = "password";
const SECRET = "secret";

passport.use(
  new LocalStrategy(function(username, password, done) {
    if (username === ADMIN && password === ADMIN_PASSWORD) {
      done(null, jwt.encode({ username }, SECRET));
      return;
    }
    done(null, false);
  })
);

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.post("/login", passport.authenticate("local", { session: false }), function(
  req,
  res
) {
  res.send("Authenticated");
});

app.post(
  "/convert",
  passport.authenticate("local", { session: false, failWithError: true }),
  function(req, res, next) {
    if (typeof req.body.content == "undefined" || req.body.content == null) {
      res.json(["error", "No data found"]);
    } else {
      let text = req.body.content;
      let html = converter.makeHtml(text);
      res.json(["markdown", html]);
    }
  },
  function(err, req, res, next) {
    return res.status(401).send({ success: false, message: err });
  }
);

const port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log(`Server running on port ${port}`);
});
