if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const showdown = require("showdown");
const bodyParser = require("body-parser");
const path = require("path");

let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "build")));

let converter = new showdown.Converter();

app.post("/convert", function(req, res) {
  if (typeof req.body.markdown == "undefined" || req.body.markdown == null) {
    res.json(["error", "No data found"]);
  } else {
    let text = req.body.markdown;
    let html = converter.makeHtml(text);
    res.json(html);
  }
});

const port = process.env.REACT_APP_API_PORT || 8080;
app.listen(port, function() {
  console.log(`Server running on port ${port}`);
});
