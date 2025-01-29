import express from 'express';
import {
	categoryCreate,
	deleteCategory,
	getAllCategory,
	getCategoryByid,
	updatecategory,
} from '../../../controllers/dashboard/CategoryController.js';
import { uploadFile } from '../../../utils/fileuploader.js';
const categoryRouter = express.Router();
categoryRouter.post('/create',uploadFile('category').any(),categoryCreate);
categoryRouter.get('/get-all', getAllCategory);
categoryRouter.get('/get-one/:id', getCategoryByid);
categoryRouter.put('/update/:id', updatecategory);
categoryRouter.delete('/delete/:id', deleteCategory);
export default categoryRouter;
