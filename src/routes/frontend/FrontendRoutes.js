import express from 'express';
import frontendPublicRouter from './FrontendPublic.js';
import frontendPrivateRouter from './FrontendPrivate.js';
const frontendRoutes = express.Router();
frontendRoutes.use(frontendPublicRouter);
frontendRoutes.use(frontendPrivateRouter);
export default frontendRoutes;
