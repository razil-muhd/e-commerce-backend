import express from 'express';
import AuthRouter from './main-routes/AuthRoutes.js';

const dashboardPublicRouter = express.Router();
dashboardPublicRouter.use('/auth', AuthRouter);

export default dashboardPublicRouter;