const express = require("express");
const Log = require("../Logging_Middleware");

const app = express();
const PORT = 3000;

// Middleware for parsing JSON
app.use(express.json());

// Request logging middleware
app.use(async (req, res, next) => {
  const start = Date.now();
  await Log("backend", "info", "middleware", `Request: ${req.method} ${req.path}`);
  
  res.on('finish', async () => {
    const duration = Date.now() - start;
    await Log("backend", "info", "middleware", `Response: ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`);
  });
  
  next();
});

// Root endpoint
app.get("/", async (req, res) => {
  await Log("backend", "info", "route", "Root endpoint called");
  res.json({
    message: "Hello from backend test submission!",
    timestamp: new Date().toISOString(),
    endpoints: [
      "GET /",
      "GET /health",
      "GET /error",
      "GET /test-auth",
      "POST /log-test",
      "GET /user/:id",
      "POST /data"
    ]
  });
});

// Health check endpoint
app.get("/health", async (req, res) => {
  await Log("backend", "info", "route", "Health check endpoint called");
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error endpoint
app.get("/error", async (req, res) => {
  try {
    throw new Error("received string, expected bool");
  } catch (err) {
    await Log("backend", "error", "handler", err.message);
    res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Test authentication endpoint
app.get("/test-auth", async (req, res) => {
  await Log("backend", "info", "auth", "Testing authentication with evaluation service");
  res.json({
    message: "Authentication test initiated",
    timestamp: new Date().toISOString()
  });
});

// Test logging endpoint
app.post("/log-test", async (req, res) => {
  const { level, message } = req.body;
  
  if (!level || !message) {
    await Log("backend", "warn", "validation", "Missing required fields in log-test");
    return res.status(400).json({
      error: "Missing required fields: level and message"
    });
  }

  await Log("backend", level, "test", message);
  res.json({
    success: true,
    logged: { level, message },
    timestamp: new Date().toISOString()
  });
});

// User endpoint with parameter
app.get("/user/:id", async (req, res) => {
  const userId = req.params.id;
  
  if (!userId || isNaN(userId)) {
    await Log("backend", "warn", "validation", `Invalid user ID: ${userId}`);
    return res.status(400).json({
      error: "Invalid user ID"
    });
  }

  await Log("backend", "info", "route", `User endpoint called for ID: ${userId}`);
  res.json({
    user: {
      id: parseInt(userId),
      name: `User ${userId}`,
      email: `user${userId}@example.com`
    },
    timestamp: new Date().toISOString()
  });
});

// Data endpoint with POST
app.post("/data", async (req, res) => {
  const { name, value } = req.body;
  
  if (!name || !value) {
    await Log("backend", "warn", "validation", "Missing required fields in data endpoint");
    return res.status(400).json({
      error: "Missing required fields: name and value"
    });
  }

  await Log("backend", "info", "route", `Data received: ${name} = ${value}`);
  res.json({
    success: true,
    received: { name, value },
    id: Math.floor(Math.random() * 1000),
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use(async (req, res) => {
  await Log("backend", "warn", "route", `404 - Route not found: ${req.method} ${req.path}`);
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.method} ${req.path} not found`,
    timestamp: new Date().toISOString()
  });
});

// Error handler
app.use(async (err, req, res, next) => {
  await Log("backend", "error", "handler", `Unhandled error: ${err.message}`);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, async () => {
  await Log("backend", "info", "server", `Server starting on port ${PORT}`);
  console.log(`Server running at http://localhost:${PORT}`);
});
