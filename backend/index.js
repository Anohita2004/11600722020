import express from "express";
import cors from "cors";
import urlRoutes from "./routes/UrlRoute.js";
import {  redirectUrl } from "./controller/UrlController.js";
import { Log } from "./middleware/logger.js";


const app = express();
const PORT =  4000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  Log("backend", "info", "request", `${req.method} ${req.url}`);
  next();
});


app.use("/shorturls", urlRoutes);
app.get("/:code", redirectUrl);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
