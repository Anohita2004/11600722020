import express from "express";
import { createShortUrl, redirectUrl,getStats } from "../controller/UrlController.js";

const router = express.Router();


router.post("", createShortUrl);
router.get("", getStats); 



export default router;
