const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const mysql = require("mysql2");
const multer = require("multer");

const storageMulti = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/../public/images`);
  },
  filename: function (req, file, cb) {
    let extArr = file.originalname.split(".");
    let ext = extArr[extArr.length - 1];
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + `.${ext}`;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const uploadMulti = multer({ storage: storageMulti }).array("images", 5);

router.get("/", async (req, res) => {
  try {
    let sql = "SELECT * from media WHERE product_id IS ?";
    let inserted = [null];
    sql = mysql.format(sql, inserted);
    //
    let result = await db.execute(sql);
    //
    let [rows] = result;
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
});

router.post("/", (req, res) => {
  uploadMulti(req, res, async function (err) {
    try {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        Promise.reject(err);
      } else if (err) {
        // An unknown error occurred when uploading.
        Promise.reject(err);
      } else {
        let { files } = req;
        let result = [];
        for await (let file of files) {
          let response = db.execute(
            "INSERT INTO media(type, source) VALUES(?, ?)",
            ["image", `http://localhost:3000/images/${file.filename}`]
          );
          result.push(response);
        }
        let response = await Promise.all(result);
        let returnData = [];
        files.forEach((e, i) => {
          returnData.push({
            media_id: response[i][0].insertId,
            source: `http://localhost:3000/images/${e.filename}`,
          });
        });
        res.json({
          uploadedData: returnData.sort((a, b) => a.media_id - b.media_id),
          message: "Upload successfully",
        });
      }
    } catch (error) {
      res.status(500).json(error);
    }
    // Everything went fine.
  });
});

module.exports = router;
