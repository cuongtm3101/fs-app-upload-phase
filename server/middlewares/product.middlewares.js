const db = require("../utils/db");
const mysql = require("mysql2");
module.exports.filterByCategory = async (req, res, next) => {
  let { category, page_index, page_number } = req.query;
  try {
    if (!category) {
      next();
    } else {
      let sql = `SELECT p.product_id, p.name, p.number, p.price, p.sale, c.category_id, c.name as description_name, c.description, c.banner FROM product as p INNER JOIN category as c ON p.category_id = c.category_id WHERE c.name = ? ${
        !page_number ? "" : "LIMIT ?"
      } ${!page_number ? "" : "OFFSET ?"}`;
      let inserted = [
        category,
        Number(page_number),
        Number(page_index - 1) * Number(page_number) || 0,
      ];
      sql = mysql.format(sql, inserted);

      let result = await db.execute(sql);
      let result2 = await db.execute(
        "SELECT COUNT(*) as count FROM product as p INNER JOIN category as c ON p.category_id = c.category_id WHERE c.name = ?",
        [category]
      );
      let [rows] = result;
      let [rows2] = result2;
      console.log(rows2);
      res.status(200).json({
        data: rows,
        length: rows2[0].count,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
};

module.exports.pagination = async (req, res, next) => {
  let { page_index, page_number } = req.query;
  try {
    if (!page_index || !page_number) {
      next();
    } else {
      let sql = `SELECT p.*, c.description from product AS p INNER JOIN category AS c ON c.category_id = p.category_id LIMIT ? OFFSET ? `;
      let inserted = [
        Number(page_number),
        (Number(page_index) - 1) * Number(page_number),
      ];
      sql = mysql.format(sql, inserted);
      console.log(sql);
      let result = await db.execute(sql);
      let result2 = await db.execute("SELECT COUNT(*) as count FROM product");

      let [rows] = result;
      let [rows2] = result2;

      res.status(200).json({
        data: rows,
        length: rows2[0].count,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
};
