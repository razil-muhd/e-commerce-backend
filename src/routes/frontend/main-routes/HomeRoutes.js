import express from 'express';
import { homepageData } from '../../../controllers/frontend/homepage.js';
const HomeRoutes = express.Router();
HomeRoutes.get('/',homepageData);

export default  HomeRoutes;