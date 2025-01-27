import mongoose from "mongoose";
import { categoryModel } from "../../models/CategoryModel.js";
import { serverError } from "../../utils/errorHandler.js";

export const categoryCreate = async(req,res,next)=> {
    try{
        const {categoryname}=req.body;
        const existmodel = await categoryModel.findOne({name:categoryname})
        if(existmodel){
            return res.status(422).json({message:"Category name already exist"})
        }
        if(!categoryname){
            return res.status(422).json({message:"Category name is required"});
        }

        await categoryModel.create({
            name:categoryname,
        })
        return res.status(200).json({message: "Category created"});

    }catch(err){
       console.log(err);
       next(serverError());
    }
}


export const  getAllCategory = async (req,res,next)=> {
    try{
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
                }
            }
        ]);
        return res.status(200).json({
            message: "fetched categories",
            data: categories,
        })

    }catch(err){
       console.log(err);
       next(serverError());
    }
}

export const getCategoryByid = async (req,res,next)=>{
    try{
        const categoryId = req.params.Id;
       // const category = await CategoryModel.({_id:categoryId});
        const category = (await categoryModel.aggregate([
            {
                $match: {
                    _id : new mongoose.Types.ObjectId(categoryId),
                    deletedAt: null,
                },
            },
            {
                $project:{
                    name:1,
                    _id:1
                },
            },
        ])).at(0);
        return res.status(200).json({
            message: "fetched category",
            data: category,
        })


    
}catch(err){
    console.log(err);
    next(serverError());
    console.log("catcgg:",err)
 }
}


