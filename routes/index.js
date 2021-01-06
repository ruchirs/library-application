const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
//   console.log("Here");
  res.redirect("/books");
});

module.exports = router;
