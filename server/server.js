const express = require("express");
const cors = require("cors");

const RoundsPlayedController = require("./controllers/RoundsPlayedController");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Health Check Endpoint
app.get("/health", (req, res) => {
  res.send("Server is healthy");
});

// API Endpoints

app.get("/rounds-played", RoundsPlayedController.getRoundsPlayedData);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});