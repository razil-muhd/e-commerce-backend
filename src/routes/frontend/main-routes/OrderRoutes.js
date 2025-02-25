import express from 'express';
import { createOrder, payment } from '../../../controllers/frontend/Ordercontroller.js';

const OrderRouter = express.Router();
OrderRouter.post('/create', createOrder);
OrderRouter.post('/payment',payment);

export default OrderRouter;
