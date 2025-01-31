import mongoose from 'mongoose';
const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		image: {
			type: String,
			required: false,
		},
		deletedAt: {
			type: Date,
			required: false,
			default: null,
		},
		category: {
			type: mongoose.Types.ObjectId,
			required: false,
		},
		brand: {
			type: mongoose.Types.ObjectId,
			required: false,
		},
	},
	{ timestamps: true },
);
export const productModel = mongoose.model('products', productSchema);
