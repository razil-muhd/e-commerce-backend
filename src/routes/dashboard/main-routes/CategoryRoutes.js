import express from 'express'
import { categoryCreate, getAllCategory, getCategoryByid } from '../../../controllers/dashboard/CategoryController.js';
const categoryRouter = express.Router();
categoryRouter.post("/create", categoryCreate)
categoryRouter.get("/get-all", getAllCategory)
categoryRouter.get("/get-one/:Id", getCategoryByid)

export default categoryRouter
