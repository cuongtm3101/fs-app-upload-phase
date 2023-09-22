const express = require("express");
const router = express.Router();

router.get("/signIn", (req, res) => {
  res.json({
    message: "SIGN IN USER SUCCESSFULLY",
  });
});

module.exports = router;
