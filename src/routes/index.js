import express from 'express';

import siteChatBotRoute from "../modules/site/chatbot.js";
import siteROICalculatorRoute from "../modules/site/roi.calculator.js";
import siteContactRoute from "../modules/site/contact.js";
import demoChatbotRoute from "../modules/demo/chatbot.js";
import demoWorkflowDemoRoute from "../modules/demo/workflow.js";
import demoWorkflowMockCrmFetchRoute from "../modules/demo/workflow.mock.crm.fetch.js";
import demoWorkflowMockCrmPushRoute from "../modules/demo/workflow.mock.crm.push.js";
import demoAiAgentForHomeSellerRoute from "../modules/demo/ai.agent.for.home.seller.js";
import leadRoute from "../modules/lead/lead.collection.js";
import assistantRoute from "../modules/assistant/assistant.js";
import googleCalendarOAuthRoute from "../modules/integrations/google.calendar.oauth.js";
import healthRoute from './health.js';

const router = express.Router();
const apiBasePath = "/api/v0.1";

router.use(`${apiBasePath}/health`, healthRoute);
router.use(`${apiBasePath}/site/`, siteChatBotRoute);
router.use(`${apiBasePath}/site/`, siteROICalculatorRoute);
router.use(`${apiBasePath}/site/`, siteContactRoute);
router.use(`${apiBasePath}/demo/chatbot`, demoChatbotRoute);
router.use(`${apiBasePath}/demo/workflow`, demoWorkflowDemoRoute);
router.use(`${apiBasePath}/demo/workflow/mock/crm/fetch`, demoWorkflowMockCrmFetchRoute);
router.use(`${apiBasePath}/demo/workflow/mock/crm/push`, demoWorkflowMockCrmPushRoute);
router.use(`${apiBasePath}/demo/aiagent/home/seller`, demoAiAgentForHomeSellerRoute);
router.use(`${apiBasePath}/lead`, leadRoute);
router.use(`${apiBasePath}/assistant`, assistantRoute);
router.use(`${apiBasePath}/integrations/google/calendar/oauth`, googleCalendarOAuthRoute);

export default router;
