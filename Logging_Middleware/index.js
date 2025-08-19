require('dotenv').config();

const axios = require("axios");

const LOG_API_URL = process.env.LOG_API_URL || "http://20.244.56.144/evaluation-service/logs";
const LOG_API_TOKEN = process.env.LOG_API_TOKEN;
const LOG_API_KEY = process.env.LOG_API_KEY;

/**
 * Reusable Log function with authentication support
 * @param {string} stack - "backend" or "frontend"
 * @param {string} level - "debug" | "info" | "warn" | "error" | "fatal"
 * @param {string} pkg - "db", "handler", "route", "auth", etc.
 * @param {string} message - log message
 */
async function Log(stack, level, pkg, message) {
  try {
    const payload = {
      stack,
      level,
      package: pkg,
      message
    };
    
    // Prepare headers with authentication
    const headers = {
      "Content-Type": "application/json"
    };
    
    // Add authentication based on available credentials
    if (LOG_API_TOKEN) {
      headers["Authorization"] = `Bearer ${LOG_API_TOKEN}`;
    } else if (LOG_API_KEY) {
      headers["X-API-Key"] = LOG_API_KEY;
    } else {
      console.warn("No authentication credentials provided. Log may fail with 401.");
    }

    const response = await axios.post(LOG_API_URL, payload, { headers });

    if (response.status === 200 || response.status === 201) {
      console.log(`Log created successfully`);
    } else {
      console.warn("Log request returned:", response.status);
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Authentication failed: Invalid or missing credentials");
      console.error("Please check your LOG_API_TOKEN or LOG_API_KEY in the .env file");
    } else {
      console.error("Failed to send log:", error.message);
    }
    
    // Fallback to console logging
    console.log("[FALLBACK LOG]", { timestamp: new Date().toISOString(), stack, level, package: pkg, message });
  }
}

module.exports = Log;
