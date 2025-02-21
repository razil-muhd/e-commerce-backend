import { bannerModel } from '../../models/BannerModel.js';
import { categoryModel } from '../../models/CategoryModel.js';
import { productModel } from '../../models/ProductModel.js';
import { serverError } from '../../utils/errorHandler.js';

export const homepageData = async (req, res, next) => {
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
                    category:1,
                    _id: 1,
                    image: 1,
                },
            },
        ]);
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
                const featuredproducts = await productModel.aggregate([
                    {
                        $match: {
                            deletedAt: null,
                            featured:true
                        },
                    },
               
                               
                             
                    {
                        $project: {
                            product:'$name',
                            _id: 1,
                            image:1,
                            description :1,
                            price:1,
                            featured:1
                        },
                    },
                ]);
        return res.status(200).json({
            message: 'fetched all',
            data:{banners:banners,categories:categories,featuredproducts:featuredproducts},
        });
    } catch (err) {
     
        next(serverError());
    }
   
};
