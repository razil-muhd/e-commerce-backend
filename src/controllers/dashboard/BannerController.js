import mongoose from 'mongoose';
import { bannerModel } from '../../models/BannerModel.js';
import { serverError } from '../../utils/errorHandler.js';
import path from 'path';

export const bannerCreate = async (req, res, next) => {
	try {
		const { bannername, category } = req.body;
		let image;
		
				req.files.forEach((file) => {
					if (file.fieldname == 'image') {
						image =  'uploads' + file.path.split(path.sep + 'uploads').at(1);
					}
				});
		const existmodel = await bannerModel.findOne({ name: bannername });
		if (existmodel) {
			return res.status(422).json({ message: 'Banner name already exist' });
		}
		if (!bannername) {
			return res.status(422).json({ message: 'Banner name is required' });
		}

		await bannerModel.create({
			name: bannername,
			category: category,
			image:image
		});
		return res.status(200).json({ message: 'Banner created' });
	} catch (err) {
		console.log('hai:::',err);
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
				$project: {
					name: 1,
					category: 1,
					_id: 1,
					image:1
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
					},
				},
			])
		).at(0);
		return res.status(200).json({
			message: 'fetched banners',
			data: banners,
		});
	} catch(err) {
		console.log(err);
		next(serverError());
		console.log('catcgg:', err);
	}
};
export const updatebanner = async (req, res, next) => {
	try {
		const bannerid = req.params.id;
		const { bannername } = req.body;
		if (!bannername) {
			return res.status(422).json({ message: 'Banner name is required' });
		}
		let imageFile = req.body.image;
				if(req.files){
					req.files.forEach((file) => {
						if (file.fieldname == 'image') {
							imageFile =  'uploads' + file.path.split(path.sep + 'uploads').at(1);
						}
					});
					
				}
		const existmodel = await bannerModel.findOne({ name: bannername, _id: { $ne: bannerid } });
		if (existmodel) {
			return res.status(422).json({ message: 'Banner name already exist' });
		}

		const banners = await bannerModel.findOne({
			_id: bannerid,
			deletedAt: null,
		});
		banners.name = bannername;
		banners.image=imageFile;

		await banners.save();
		return res.status(200).json({ message: 'updated succesfully', data: banners });
	} catch (err) {
		console.log('helo:::',err);
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
		});
	} catch (err) {
		console.log('hai:', err);
		next(serverError());
	}
};
