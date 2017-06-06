var express = require("express");
var router = express.Router();
const entries = require("./entries");
/* GET home page. */
router.get("/", entries.list);

module.exports = router;
