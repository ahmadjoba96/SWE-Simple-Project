const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Connect DB
const connectDB = require("./src/config/db");
connectDB();

// Routes
app.get("/", (req, res) => {
    res.send("API is running");
});

app.use("/api/auth", require("./src/routes/auth.routes"));
app.use("/api/categories", require("./src/routes/category.routes"));
app.use("/api/products", require("./src/routes/product.routes"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
