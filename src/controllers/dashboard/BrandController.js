import mongoose from 'mongoose';
import { brandModel } from '../../models/BrandModel.js';
import { serverError } from '../../utils/errorHandler.js';
import path from 'path';

export const brandCreate = async (req, res, next) => {
	try {
		const { brandname } = req.body;
		let image;
				
						req.files.forEach((file) => {
							if (file.fieldname == 'image') {
								image =  'uploads' + file.path.split(path.sep + 'uploads').at(1);
							}
						});
		const existmodel = await brandModel.findOne({ name: brandname });
		if (existmodel) {
			return res.status(422).json({ message: 'brand name already exist' });
		}
		if (!brandname) {
			return res.status(422).json({ message: 'brand name is required' });
		}
		await brandModel.create({
			name: brandname,
			image:image
		});
		return res.status(200).json({ message: 'Brand name created' });
	} catch (err) {
		next(serverError());
	}
};

export const getallBrands = async (req, res, next) => {
	try {
		const brands = await brandModel.aggregate([
			{
				$match: {
					deletedAt: null,
				},
			},

			{
				$project: {
					brand: '$name',
					_id: 1,
					image:1
				},
			},
		]);

		return res.status(200).json({
			message: 'fetched brands',
			data: brands,
		});
	} catch (err) {
		console.log(err);
		next(serverError());
	}
};

export const getbrandByid = async (req, res, next) => {
	try {
		const brandId = req.params.Id;
		// const category = await CategoryModel.({_id:categoryId});
		const brand = (
			await brandModel.aggregate([
				{
					$match: {
						_id: new mongoose.Types.ObjectId(brandId),
						deletedAt: null,
					},
				},
				{
					$project: {
						name: 1,
						_id: 1,
					},
				},
			])
		).at(0);
		return res.status(200).json({
			message: 'fetched brand',
			data: brand,
		});
	} catch (err) {
		console.log(err);
		next(serverError());
		console.log('catcgg:', err);
	}
};
export const updatebrand = async (req, res, next) => {
	try {
		const brandId = req.params.id;
		const { brandname } = req.body;
		if (!brandname) {
			return res.status(422).json({ message: 'Brand name is required' });
		}
		let imageFile = req.body.image;
						if(req.files){
							req.files.forEach((file) => {
								if (file.fieldname == 'image') {
									imageFile =  'uploads' + file.path.split(path.sep + 'uploads').at(1);
								}
							});
							
						}
		const existmodel = await brandModel.findOne({ name: brandname, _id: { $ne: brandId } });
		if (existmodel) {
			return res.status(422).json({ message: 'brand name already exist' });
		}

		const brand = await brandModel.findOne({
			_id: brandId,
			deletedAt: null,
		});
		brand.name = brandname;
		brand.image = imageFile;
		await brand.save();
		return res.status(200).json({ message: 'updated succesfully', data: brand });
	} catch (err) {
		console.log(err);
		next(serverError());
	}
};

export const deleteBrands = async (req, res, next) => {
	try {
		const brandId = req.params.id;
		// await categoryModel.deleteOne({_id : categoryId})
		const brand = await brandModel.findOne({
			_id: brandId,
		});
		brand.deletedAt = new Date();
		await brand.save();
		return res.status(200).json({
			message: 'Delete succesfully',
		});
	} catch (err) {
		console.log(err);
		next(serverError());
	}
};
