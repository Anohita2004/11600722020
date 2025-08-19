// index.js
const axios = require("axios");

const LOG_API_URL = "http://20.244.56.144/evaluation-service/logs";

/**
 * Reusable Log function
 */
async function Log(stack, level, pkg, message) {
  try {
    const payload = { stack, level, package: pkg, message };

    const response = await axios.post(LOG_API_URL, payload, {
      headers: { "Content-Type": "application/json" }
    });

    console.log("Log sent:", response.status);
  } catch (error) {
    console.error("Failed to send log:", error.message);
  }
}

module.exports = Log;
