import express from 'express';
import { getAllCategories } from '../../../controllers/frontend/categorypage.js';
const CategoryRoutes = express.Router();
CategoryRoutes.get('/',getAllCategories);

export default  CategoryRoutes;