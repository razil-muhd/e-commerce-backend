import express from 'express';
import categoryRouter from './main-routes/CategoryRoutes.js';
import brandrouter from './main-routes/BrandRoutes.js';
import bannerRouter from './main-routes/BannerRoutes.js';
const dashboardPrivateRouter = express.Router();
dashboardPrivateRouter.use('/categories', categoryRouter);
dashboardPrivateRouter.use('/brands', brandrouter);
dashboardPrivateRouter.use('/banners', bannerRouter);
export default dashboardPrivateRouter;
