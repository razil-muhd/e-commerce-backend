import mongoose from 'mongoose';
import { bannerModel } from '../../models/BannerModel.js';
import { categoryModel } from '../../models/CategoryModel.js';
import { serverError } from '../../utils/errorHandler.js';
import path from 'path';

export const bannerCreate = async (req, res, next) => {
	try {
		const { banner, category } = req.body;
		let image;

		req.files.forEach((file) => {
			if (file.fieldname == 'image') {
				image = 'uploads' + file.path.split(path.sep + 'uploads').at(1);
			}
		});
		const existmodel = await bannerModel.findOne({ name: banner, deletedAt: null });
		if (existmodel) {
			return res.status(422).json({ message: 'Banner name already exist' });
		}
		if (!banner) {
			return res.status(422).json({ message: 'Banner name is required' });
		}

		await bannerModel.create({
			name: banner,
			category: category,
			image: image,
		});
		return res.status(200).json({ message: 'Banner created', success: true });
	} catch (err) {
		console.log('hai:::', err);
		next(serverError());
	}
};
export const getAllBanners = async (req, res, next) => {
	try {
		const banners = await bannerModel.aggregate([
			{
				$match: {
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
					// preserveNullAndEmptyArrays: true,
				},
			},

			{
				$project: {
					name: 1,
					x: '$categories.name',
					_id: 1,
					image: 1,
				},
			},
		]);
		return res.status(200).json({
			message: 'fetched banners',
			data: banners,
		});
	} catch (err) {
		//    console.log(err);
		next(serverError());
	}
};
export const getBannerbyid = async (req, res, next) => {
	try {
		const bannerid = req.params.id;
		const banners = (
			await bannerModel.aggregate([
				{
					$match: {
						_id: new mongoose.Types.ObjectId(bannerid),
						deletedAt: null,
					},
				},
				{
					$project: {
						name: 1,
						category: 1,
						_id: 1,
						image:1
					},
				},
			])
		).at(0);
		return res.status(200).json({
			message: 'fetched banners',
			data: banners,
		});
	} catch (err) {
		console.log(err);
		next(serverError());
		console.log('catcgg:', err);
	}
};
export const updatebanner = async (req, res, next) => {
	try {
		const bannerid = req.params.id;
		const { banner } = req.body;
		if (!banner) {
			return res.status(422).json({ message: 'Banner name is required' });
		}
		let imageFile = req.body.image;
		if (req.files) {
			req.files.forEach((file) => {
				if (file.fieldname == 'image') {
					imageFile = 'uploads' + file.path.split(path.sep + 'uploads').at(1);
				}
			});
		}
		const existmodel = await bannerModel.findOne({ name: banner, _id: { $ne: bannerid } });
		if (existmodel) {
			return res.status(422).json({ message: 'Banner name already exist' });
		}

		const banners = await bannerModel.findOne({
			_id: bannerid,
			deletedAt: null,
		});
		banners.name = banner;
		banners.image = imageFile;

		await banners.save();
		return res.status(200).json({ message: 'updated succesfully', data: banners, success: true });
	} catch (err) {
		console.log('helo:::', err);
		next(serverError());
	}
};

export const deleteBanners = async (req, res, next) => {
	try {
		const bannerid = req.params.id;
		// await categoryModel.deleteOne({_id : categoryId})
		const banners = await bannerModel.findOne({
			_id: bannerid,
		});
		banners.deletedAt = new Date();
		await banners.save();
		return res.status(200).json({
			message: 'Delete succesfully',
			success: true,
		});
	} catch (err) {
		console.log('hai:', err);
		next(serverError());
	}
};
