import mongoose from 'mongoose';

import { serverError } from '../../utils/errorHandler.js';
import path from 'path';
import { productModel } from '../../models/ProductModel.js';
import { categoryModel } from '../../models/CategoryModel.js';
import { brandModel } from '../../models/BrandModel.js';

export const  featuredProduct = async (req,res,next) => {
  
    try {
        const productId = req.params.id;
        const product = await productModel.findById(productId);
        if(!product){
            return res.status(422).json({ message: 'Product not found' });
        }
        product.featured = product.featured === true?false:true;
        await product.save();
        return res.status(200).json({success:true ,message:  product.featured?'featured updated': 'Product is not featured'});
        

    }
    catch(err){
        next(serverError(err));

    }
};

export const productCreate = async (req, res, next) => {
    try {
        const {  product , productdescription,productprice ,category,brand} = req.body;
        let image;

        req.files?.forEach((file) => {
            if (file.fieldname == 'image') {
                image =  'uploads' + file.path.split(path.sep + 'uploads').at(1);
            }
        });
        const existmodel = await productModel.findOne({ name: product, deletedAt: null  });
        if (existmodel) {
            return res.status(422).json({ message: 'Product name already exist' });
        }
        if (!product) {
            return res.status(422).json({ message: 'Product name is required' });
        }

        await productModel.create({
            name: product,
            image:image,
            description:productdescription,
            price:productprice,
            category: category,
            brand:brand
        });
        return res.status(200).json({ message: 'Product is  created', success:true });
    } catch (err) {
       

        next(serverError(err));
    }
};

export const getAllProducts = async (req, res, next) => {
    try {
        const products = await productModel.aggregate([
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
                    product:'$name',
                    _id: 1,
                    image:1,
                    description :1,
                    price:1,
                    category:'$categories.name',
                    brand:'$brands.name',
                    featured:1
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

export const getproductbyId = async (req, res, next) => {
    try {
        const productId = req.params.id;
        // const category = await CategoryModel.({_id:categoryId});
        const products = (
            await productModel.aggregate([
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(productId),
                        deletedAt: null,
                    },
                },
                {
                    $project: {
                        name: 1,
                        _id: 1,
                        description:1,
                        price:1,
                        category:1,
                        brand:1,
                        image:1
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

export const updateproduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const {  product, productdescription,productprice,category,brand } = req.body;
        if (!product) {
            return res.status(422).json({ message: 'Product name is required' });
        }
        console.log(req.files);
        console.log(req.body);
        let imageFile = req.body.image;
        if(req.files){
            req.files.forEach((file) => {
                if (file.fieldname == 'image') {
                    imageFile =  'uploads' + file.path.split(path.sep + 'uploads').at(1);
                }
            });
        }
        const existmodel = await productModel.findOne({ name: product, _id: { $ne: productId } });
        if (existmodel) {
            return res.status(422).json({ message: 'Product name already exist' });
        }
        console.log(imageFile);
        const products = await productModel.findOne({
            _id: productId,
            deletedAt: null,
        });
        products.name = product;
        products.image=imageFile;
        products.description=productdescription;
        products.price =productprice;
        products.category=category;
        products.brand=brand;
        await products.save();
        return res.status(200).json({ message: 'updated succesfully', success:true ,data:products});
    } catch (err) {
        console.log(err);
        next(serverError());
    }
};

export const deleteProducts = async (req, res, next) => {
    try {
        const productId = req.params.id;
        // await categoryModel.deleteOne({_id : categoryId})
        const products = await productModel.findOne({
            _id: productId,
        });
        products.deletedAt = new Date();
        await products.save();
        return res.status(200).json({
            message: 'Delete succesfully',
            success:true
        });
    } catch (err) {
        console.log(err);
        next(serverError());
    }
};
