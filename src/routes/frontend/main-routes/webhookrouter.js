import express from 'express';
import { webhooksCreate } from '../../../webhook/PaymentWebhook.js';

export const webhookRouter = express.Router();
webhookRouter.post('/stripe', webhooksCreate);
