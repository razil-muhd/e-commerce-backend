import express from 'express';
import dashboardPrivateRouter from './DashboardPrivate.js';
const dashboardRoutes = express.Router();
dashboardRoutes.use(dashboardPrivateRouter);
export default dashboardRoutes;
