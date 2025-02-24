import express from 'express';
import OrderRouter from './main-routes/OrderRoutes.js';
import { userMiddleware } from '../../middleware/UserMiddleware.js';
const frontendPrivateRouter = express.Router();
frontendPrivateRouter.use(userMiddleware);
frontendPrivateRouter.use('/order',OrderRouter);
export default frontendPrivateRouter;