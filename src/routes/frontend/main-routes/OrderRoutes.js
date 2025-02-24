import express from 'express';
import { createOrder } from '../../../controllers/frontend/Ordercontroller.js';

const OrderRouter = express.Router();
OrderRouter.post('/', createOrder);

export default OrderRouter;
