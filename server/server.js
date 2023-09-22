const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

// Khởi tạo server
const server = express();

// Require các routes
const authRoutes = require("./routes/auth.routes");
const categoryRoutes = require("./routes/category.routes");
const mediaRoutes = require("./routes/media.routes");
const orderRoutes = require("./routes/order.routes");
const productRoutes = require("./routes/product.routes");
const tagRoutes = require("./routes/tag.routes");
const userRoutes = require("./routes/user.routes");

// Sử dụng các packages
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(cors());
server.use(express.static("public"));

// Sử dụng routes
server.use("/api/v1/auth", authRoutes);
server.use("/api/v1/categories", categoryRoutes);
server.use("/api/v1/media", mediaRoutes);
server.use("/api/v1/orders", orderRoutes);
server.use("/api/v1/products", productRoutes);
server.use("/api/v1/tags", tagRoutes);
server.use("/api/v1/users", userRoutes);

// Khởi tạo routes
server.get("/", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

// Lắng nghe server tại cổng
server.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});
