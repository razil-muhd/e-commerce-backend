import { categoryModel } from '../../models/CategoryModel.js';
import { serverError } from '../../utils/errorHandler.js';

export const getAllCategories = async (req, res, next) => {
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
