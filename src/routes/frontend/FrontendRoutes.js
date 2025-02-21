import express from 'express';
import frontendPublicRouter from './FrontendPublic.js';
const frontendRoutes = express.Router();
frontendRoutes.use(frontendPublicRouter);
export default frontendRoutes;
