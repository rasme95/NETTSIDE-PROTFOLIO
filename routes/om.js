var express = require("express");
var router = express.Router();

// For index route
router.get("/", function (req, res, next) {
  res.render("om");
});

module.exports = router;
