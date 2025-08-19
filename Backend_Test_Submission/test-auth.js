#!/usr/bin/env node

/**
 * Test script to verify the authentication token works with the evaluation service
 */

require('dotenv').config();
const axios = require('axios');

const LOG_API_URL = process.env.LOG_API_URL || "http://20.244.56.144/evaluation-service/logs";
const LOG_API_TOKEN = process.env.LOG_API_TOKEN;

async function testAuthentication() {
  console.log("🔍 Testing authentication with evaluation service...");
  console.log("📍 API URL:", LOG_API_URL);
  console.log("🔑 Token configured:", LOG_API_TOKEN ? "Yes" : "No");

  if (!LOG_API_TOKEN) {
    console.error("❌ No LOG_API_TOKEN found in environment variables");
    console.log("💡 Please copy the provided token to your .env file:");
    console.log("   LOG_API_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...");
    return;
  }

  try {
    console.log("\n🧪 Testing authentication...");
    
    const testPayload = {
      stack: "backend",
      level: "info",
      package: "test",
      message: "Authentication test from backend test submission"
    };

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${LOG_API_TOKEN}`
    };

    console.log("📤 Sending test log...");
    const response = await axios.post(LOG_API_URL, testPayload, { headers });

    if (response.status === 200 || response.status === 201) {
      console.log("✅ Authentication successful!");
      console.log("📊 Response:", response.data);
    } else {
      console.warn("⚠️ Unexpected response:", response.status, response.data);
    }

  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        console.error("❌ Authentication failed - Invalid or expired token");
        console.log("💡 Please verify your token is correct and not expired");
      } else {
        console.error("❌ API Error:", error.response.status, error.response.data);
      }
    } else if (error.request) {
      console.error("❌ Network Error:", error.message);
    } else {
      console.error("❌ Error:", error.message);
    }
  }
}

async function testAllEndpoints() {
  console.log("\n🚀 Testing all server endpoints...");
  
  const baseUrl = "http://localhost:3000";
  const endpoints = [
    { method: "GET", path: "/" },
    { method: "GET", path: "/health" },
    { method: "GET", path: "/error" },
    { method: "GET", path: "/test-auth" },
    { method: "POST", path: "/log-test", body: { level: "info", message: "Test message" } },
    { method: "GET", path: "/user/123" },
    { method: "POST", path: "/data", body: { name: "test", value: "sample" } }
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`\n📡 Testing ${endpoint.method} ${endpoint.path}`);
      
      const config = {
        method: endpoint.method,
        url: `${baseUrl}${endpoint.path}`,
        headers: { "Content-Type": "application/json" }
      };

      if (endpoint.body) {
        config.data = endpoint.body;
      }

      const response = await axios(config);
      console.log(`✅ ${endpoint.method} ${endpoint.path} - ${response.status}`);
      
    } catch (error) {
      console.error(`❌ ${endpoint.method} ${endpoint.path} - ${error.response?.status || error.message}`);
    }
  }
}

// Main execution
async function main() {
  console.log("🎯 Backend Test Submission - Authentication & Endpoint Testing");
  console.log("=".repeat(60));
  
  await testAuthentication();
  
  console.log("\n🔄 Starting server tests...");
  console.log("💡 Make sure your server is running: npm start");
  console.log("   Then run: node test-auth.js");
}

// Run tests if this file is executed directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { testAuthentication, testAllEndpoints };
