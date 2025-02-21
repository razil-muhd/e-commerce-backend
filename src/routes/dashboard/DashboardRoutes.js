import express from 'express';
import dashboardPrivateRouter from './DashboardPrivate.js';
import dashboardPublicRouter from './DashboardPublicRoutes.js';
const dashboardRoutes = express.Router();
dashboardRoutes.use(dashboardPublicRouter);
dashboardRoutes.use(dashboardPrivateRouter);

export default dashboardRoutes;
