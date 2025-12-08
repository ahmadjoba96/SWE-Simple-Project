const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./src/config/db");

// Middleware to parse JSON body
app.use(express.json());

// Routes
const authRoutes = require("./src/routes/auth.routes");
const categoryRoutes = require("./src/routes/category.routes");

// Connect DB
connectDB();

app.get("/", (req, res) => {
  res.send("API is running");
});

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const productRoutes = require("./src/routes/product.routes");
app.use("/api/products", productRoutes);

