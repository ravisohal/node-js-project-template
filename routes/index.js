import express from 'express';

import healthRoute from './health.js';
import sampleRoue from './sample.js';

const router = express.Router();
const apiBasePath = "/api/v0.1";

router.use(`${apiBasePath}/health`, healthRoute);
router.use(`${apiBasePath}/sample/`, sampleRoue);

export default router;
