const express = require("express");
const app = express();
const authRoutes = require("./src/routes/auth.routes");
const connectDB = require("./src/config/db");
const dotenv = require("dotenv");
dotenv.config();

// Middleware to parse JSON body
app.use(express.json());

connectDB();
// Simple test route
app.get("/", (req, res) => {
  res.send("API is running ");
});

app.use("/api/auth", authRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const productRoutes = require("./src/routes/product.routes");
app.use("/api/products", productRoutes);

