// backend-test-submission/server.js
const express = require("express");
const Log = require("../Logging_Middleware"); // import the logger

const app = express();
const PORT = 3000;

// test route
app.get("/", async (req, res) => {
  await Log("backend", "info", "route", "Root endpoint was called");
  res.send("Hello from backend test submission!");
});

// simulate error
app.get("/error", async (req, res) => {
  try {
    throw new Error("Simulated error in handler");
  } catch (err) {
    await Log("backend", "error", "handler", err.message);
    res.status(500).send("Error logged!");
  }
});

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
