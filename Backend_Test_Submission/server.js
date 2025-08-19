const express = require("express");
const Log = require("../Logging_Middleware");

const app = express();
const PORT = 3000;

app.get("/", async (req, res) => {
  await Log("backend", "info", "route", "Root endpoint called");
  res.send("Hello from backend test submission!");
});

app.get("/error", async (req, res) => {
  try {
    throw new Error("received string, expected bool");
  } catch (err) {
    await Log("backend", "error", "handler", err.message);
    res.status(500).send("Error logged successfully!");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
