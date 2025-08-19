
import fetch from "node-fetch"; 

export async function Log(stack, level, pkg, message) {
  const logEntry = {
    stack,
    level,
    package: pkg,
    message,
    timestamp: new Date().toISOString(),
  };

  try {
    
    await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(logEntry),
    });

    console.log("Log sent:", logEntry);
  } catch (err) {
    console.error("Failed to send log:", err.message);
  }
}
