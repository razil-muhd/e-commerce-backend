import mongoose from 'mongoose';
import { productModel } from '../../models/ProductModel.js';
import { serverError } from '../../utils/errorHandler.js';
import { categoryModel } from '../../models/CategoryModel.js';
import { brandModel } from '../../models/BrandModel.js';

export const getProductpage = async (req, res, next) => {
	try {
		const categoryid = req.params.id;
		const products = await productModel.aggregate([
			{
				$match: {
					deletedAt: null,
					category: new mongoose.Types.ObjectId(categoryid),
				},
			},

			{
				$project: {
					product: '$name',
					_id: 1,
					image: 1,
					description: 1,
					price: 1,
				},
			},
		]);
		return res.status(200).json({
			message: 'fetched poducts',
			data: products,
		});
	} catch (err) {
		console.log(err);
		next(serverError());
	}
};
export const Singleproduct = async (req, res, next) => {
	try {
		const productId = req.params.id;

		const products = (
			await productModel.aggregate([
				{
					$match: {
						_id: new mongoose.Types.ObjectId(productId),
						deletedAt: null,
					},
				},
				{
					$lookup: {
						from: categoryModel.modelName,
						localField: 'category',
						foreignField: '_id',
						as: 'categories',
						pipeline: [
							{
								$project: {
									_id: 0,
									name: 1,
								},
							},
						],
					},
				},
				{
					$unwind: {
						path: '$categories',
						preserveNullAndEmptyArrays: true,
					},
				},
				{
					$lookup: {
						from: brandModel.modelName,
						localField: 'brand',
						foreignField: '_id',
						as: 'brands',
						pipeline: [
							{
								$project: {
									_id: 0,
									name: 1,
								},
							},
						],
					},
				},
				{
					$unwind: {
						path: '$brands',
						// preserveNullAndEmptyArrays: true,
					},
				},
				{
					$project: {
						name: 1,
						_id: 1,
						description: 1,
						price: 1,
						category: '$categories.name',
						brand: '$brands.name',
						image: 1,
					},
				},
			])
		).at(0);
		return res.status(200).json({
			message: 'fetched products',
			data: products,
		});
	} catch (err) {
		console.log(err);
		next(serverError());
		console.log('catcgg:', err);
	}
};
