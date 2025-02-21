import express from 'express';
import {
	brandCreate,
	deleteBrands,
	getallBrands,
	getbrandByid,
	updatebrand,
} from '../../../controllers/dashboard/BrandController.js';
import { uploadFile } from '../../../utils/fileuploader.js';

const brandrouter = express.Router();

brandrouter.post('/create',uploadFile('brand').any(), brandCreate);
brandrouter.get('/get-all', getallBrands);
brandrouter.get('/get-one/:id', getbrandByid);
brandrouter.put('/update/:id',uploadFile('brand').any(), updatebrand);
brandrouter.delete('/delete/:id', deleteBrands);
export default brandrouter;
