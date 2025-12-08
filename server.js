const express = require("express");
const app = express();

// Middleware to parse JSON body
app.use(express.json());

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
