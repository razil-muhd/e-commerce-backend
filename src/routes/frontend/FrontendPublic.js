import express from 'express';
import HomeRoutes from './main-routes/HomeRoutes.js';
import CategoryRoutes from './main-routes/CategoryRoutes.js';
import ProductRoutes from './main-routes/ProductRoutes.js';
import UserRouter from './main-routes/UserRoutes.js';

const frontendPublicRouter = express.Router();
frontendPublicRouter.use('/home', HomeRoutes);
frontendPublicRouter.use('/categories',CategoryRoutes);
frontendPublicRouter.use('/products',ProductRoutes);
frontendPublicRouter.use('/users',UserRouter);
frontendPublicRouter.use('/users',UserRouter);

 export default frontendPublicRouter;
