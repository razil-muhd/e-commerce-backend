import mongoose from 'mongoose';
import { categoryModel } from '../../models/CategoryModel.js';
import { serverError } from '../../utils/errorHandler.js';
import { getFilePath } from '../../utils/filepath.js';
import path from 'path';

export const categoryCreate = async (req, res, next) => {
	try {
		const { categoryname } = req.body;
		let image;

		req.files.forEach((file) => {
			if (file.fieldname == 'image') {
				image =  'uploads' + file.path.split(path.sep + 'uploads').at(1);
			}
		});
		const existmodel = await categoryModel.findOne({ name: categoryname });
		if (existmodel) {
			return res.status(422).json({ message: 'Category name already exist' });
		}
		if (!categoryname) {
			return res.status(422).json({ message: 'Category name is required' });
		}

		await categoryModel.create({
			name: categoryname,
            image:image
		});
		return res.status(200).json({ message: 'Category created' });
	} catch (err) {
		console.log(err);
		next(serverError());
	}
};

export const getAllCategory = async (req, res, next) => {
	try {
		const categories = await categoryModel.aggregate([
			{
				$match: {
					deletedAt: null,
				},
			},
			{
				$project: {
					category: '$name',
					_id: 1,
					image:1
				},
			},
		]);
		return res.status(200).json({
			message: 'fetched categories',
			data: categories,
		});
	} catch (err) {
		console.log(err);
		next(serverError());
	}
};

export const getCategoryByid = async (req, res, next) => {
	try {
		const categoryId = req.params.id;
		// const category = await CategoryModel.({_id:categoryId});
		const category = (
			await categoryModel.aggregate([
				{
					$match: {
						_id: new mongoose.Types.ObjectId(categoryId),
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
			message: 'fetched category',
			data: category,
		});
	} catch (err) {
		console.log(err);
		next(serverError());
		console.log('catcgg:', err);
	}
};

export const updatecategory = async (req, res, next) => {
	try {
		const categoryId = req.params.id;
		const { categoryname } = req.body;
		if (!categoryname) {
			return res.status(422).json({ message: 'Category name is required' });
		}
		let imageFile = req.body.image;
		if(req.file){
			imageFile = getFilePath(req.file);
		}
		const existmodel = await categoryModel.findOne({ name: categoryname, _id: { $ne: categoryId } });
		if (existmodel) {
			return res.status(422).json({ message: 'Category name already exist' });
		}

		const category = await categoryModel.findOne({
			_id: categoryId,
			deletedAt: null,
		});
		category.name = categoryname;
		category.image=imageFile;
		await category.save();
		return res.status(200).json({ message: 'updated succesfully' });
	} catch (err) {
		console.log(err);
		next(serverError());
	}
};

export const deleteCategory = async (req, res, next) => {
	try {
		const categoryId = req.params.id;
		// await categoryModel.deleteOne({_id : categoryId})
		const category = await categoryModel.findOne({
			_id: categoryId,
		});
		category.deletedAt = new Date();
		await category.save();
		return res.status(200).json({
			message: 'Delete succesfully',
		});
	} catch (err) {
		console.log(err);
		next(serverError());
	}
};
