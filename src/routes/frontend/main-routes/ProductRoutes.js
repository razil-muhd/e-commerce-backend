import express from 'express';
import { getProductpage, Singleproduct } from '../../../controllers/frontend/Productpage.js';


const ProductRoutes = express.Router();

ProductRoutes.get('/:id',getProductpage);
ProductRoutes.get('/single/:id',Singleproduct);


export default  ProductRoutes ;