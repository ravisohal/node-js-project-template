import express from "express";
import { monitoring } from '../services/monitoring.service.js';

const router = express.Router();

router.get("/", async (req, res) => {
    const metrics = monitoring.getMetrics();
    const ttsStatus = metrics.ttsCleanup.status;
    
    const health = {
        status: ttsStatus === 'running' ? 'ok' : 'degraded',
        timestamp: new Date().toISOString(),
        services: {
            ttsCleanup: {
                status: ttsStatus,
                lastRun: metrics.ttsCleanup.lastRun,
                metrics: {
                    filesDeleted: metrics.ttsCleanup.filesDeleted,
                    bytesRecovered: metrics.ttsCleanup.bytesRecovered,
                    lastOperationDuration: metrics.ttsCleanup.operationDuration
                }
            }
        }
    };

    res.json(health);
});

export default router;