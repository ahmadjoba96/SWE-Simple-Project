const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => res.send("API is running"));
app.use("/api/auth", require("./src/routes/auth.routes"));
app.use("/api/categories", require("./src/routes/category.routes"));
app.use("/api/products", require("./src/routes/product.routes"));

module.exports = app;
