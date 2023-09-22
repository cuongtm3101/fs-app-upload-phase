const mysql = require("mysql2");

const pool = mysql.createPool({
  database: "cuong_dz_nhat_hn",
  user: "root",
  password: "12345678",
  host: "localhost",
  port: "3306",
});

module.exports = pool.promise();
