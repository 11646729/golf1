var express = require("express");
var router = express.Router();

/* GET index listing. */
router.get("/", function(req, res, next) {
  console.log("In the newIndex.js file");

  res.send("respond with a resource");
});

module.exports = router;
