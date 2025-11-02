import express from "express";
import { logger } from '../utils/logger.js';

const router = express.Router();

router.get("/", async (req, res) => {

    try {
        logger.info("Sample API called.");
        return res.json({
            "success": "true",
            "message": "Hello World"
        });
    } catch(error) {
        logger.error(`Got an error: ${error.message}`)
        return res.json({
            "success": "false",
            "error": error.message
        });
    }

    res.json(resutlt);
});

export default router;