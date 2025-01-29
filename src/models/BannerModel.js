import mongoose from 'mongoose';
const bannerSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        image:{
            type : String,
            required : false,
        },
        deletedAt: {
            type : Date,
            required: false,
            default : null
        },
        category : {
            type: mongoose.Types.ObjectId,
            required:true,
            
        }
    },
    {timestamps:true}
);
export const bannerModel = mongoose.model('banners',bannerSchema);