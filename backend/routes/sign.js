const express = require("express"),
  router = express.Router(),
  sign = require("../controllers/sign");

router.get("/", sign.sign);

module.exports = router;
