import express from 'express';
import {
	brandCreate,
	deleteBrands,
	getallBrands,
	getbrandByid,
	updatebrand,
} from '../../../controllers/dashboard/BrandController.js';
const brandrouter = express.Router();
brandrouter.post('/create', brandCreate);
brandrouter.get('/get-all', getallBrands);
brandrouter.get('/get-one/:id', getbrandByid);
brandrouter.put('/update/:id', updatebrand);
brandrouter.delete('/delete/:id', deleteBrands);
export default brandrouter;
