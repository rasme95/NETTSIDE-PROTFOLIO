var express = require("express");
var router = express.Router();

// For index route
router.get("/", function (req, res, next) {
  res.render("prosjekter");
});

module.exports = router;
