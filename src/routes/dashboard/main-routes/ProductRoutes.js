import express from 'express';
import { uploadFile } from '../../../utils/fileuploader.js';

import { deleteProducts, featuredProduct, getAllProducts, getproductbyId, productCreate, updateproduct } from '../../../controllers/dashboard/ProductController.js';

const productRouter = express.Router();

productRouter.post('/create',uploadFile('product').any(),productCreate);
productRouter.get('/get-all', getAllProducts);
productRouter.get('/get-one/:id', getproductbyId);
productRouter.put('/update/:id',uploadFile('category').any(), updateproduct);
productRouter.put('/featured/:id',featuredProduct);
productRouter.delete('/delete/:id', deleteProducts);
export default productRouter;