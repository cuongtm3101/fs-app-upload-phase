const express = require("express");
const router = express.Router();
const db = require("../utils/db");

router.get("/", async (req, res) => {
  try {
    let result = await db.execute("SELECT * FROM category");
    let [rows] = result;
    res.status(200).json(rows);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
