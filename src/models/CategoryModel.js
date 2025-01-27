import mongoose from "mongoose";
const categorySchema =  new mongoose.Schema(
    {
        name:{
            type : String,
            required: true,
        },
        image:{
            type : String,
            required : false,
        },
        deletedAt: {
            type : Date,
            required: false,
            default : null
        }
    },
    {timestamps: true}
);
    export const categoryModel = mongoose.model("categories",categorySchema);

