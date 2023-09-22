const express = require("express");
const { getDate } = require("../helpers");
const db = require("../utils/db");
const mysql = require("mysql2");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "GET ALL ORDERS",
  });
});

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let sql = `SELECT od.order_id, od.email, od.order_name, od.phone,
  od.province, od.district, od.ward, o.number, p.number as stock,
  p.name, p.price, p.sale, p.product_id FROM ?? as o 
  INNER JOIN ?? as od 
  ON o.order_id = od.order_id 
  INNER JOIN ?? as p 
  ON o.product_id = p.product_id
  WHERE o.order_id = ?`;

    let inserted = ["order_detail", "order", "product", id];
    sql = mysql.format(sql, inserted);

    let result = await db.execute(sql);

    res.json(result[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  let { name, email, phone, address, province, district, ward, cart } =
    req.body;
  try {
    // Thêm dữ liệu vào bảng order - Tạo ra 1 order mới
    let sql = mysql.format(
      `INSERT INTO ?? (order_name, user_id, created_at, status, email, phone, address, province, district, ward) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        "order",
        name,
        null,
        getDate(),
        "pending",
        email,
        phone,
        address,
        province,
        district,
        ward,
      ]
    );

    let result = await db.execute(sql);

    // Thêm dữ liệu vào bảng order_detail - Thêm các sản phẩm vào trong order nào
    let orderDetailSql = `INSERT INTO order_detail (number, order_id, product_id) VALUES`;
    let inserted = [];
    cart.forEach((element) => {
      orderDetailSql += ` (?, ?, ?),`;
      inserted.push(element.clickNumber);
      inserted.push(result[0].insertId);
      inserted.push(element.product_id);
    });
    let sqlQuery = orderDetailSql.slice(0, -1);
    sqlQuery = mysql.format(sqlQuery, inserted);

    let result2 = await db.execute(sqlQuery);
    res.status(201).json({
      message: "Đặt hàng thành công",
      orderId: result[0].insertId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
