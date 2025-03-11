import mongoose from 'mongoose';
import Autoincrement from 'mongoose-sequence';

const AutoincrementInc = Autoincrement(mongoose);
const orderSchema = new mongoose.Schema(
	{
		orderNumber: {
			type: Number,
			required: false,
		},
		userId: {
			type: mongoose.Types.ObjectId,
			required: true,
		},
		items: [
			{
				productId: {
					type: mongoose.Types.ObjectId,
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
				},
				price: {
					type: Number,
					required: true,
				},
			},
		],

		subTotal: {
			type: Number,
			required: true,
		},
		grandTotal: {
			type: Number,
			required: true,
		},
		tax: {
			type: Number,
			required: true,
		},
		shippingCost: {
			type: Number,
			required: true,
		},

		billingdetails: {
			name: {
				type: String,
				required: true,
			},
			lastname: {
				type: String,
				required: false,
			},
			email: {
				type: String,
				required: true,
			},
			phone: {
				type: Number,
				required: true,
			},
			address: {
				type: String,
				required: true,
			},
			pincode: {
				type: Number,
				required: true,
			},
			country: {
				type: String,
				required: false,
			},
		},

		payment: {
			

			payment_order_Id: {
				type: String,
				required: false,
			},
			paymentStatus: {
				type: String,
				default: 'created',
			},
			updatedon:{
				type:Date,
				required:false,
			}
		},
		deletedAt: {
			type: Date,
			required: false,
			default: null,
		},
	},
	{ timestamps: true },
);

orderSchema.plugin(AutoincrementInc, {
	inc_field: 'orderNumber',
	start: 1,
});

export const OrderModel = mongoose.model('orders', orderSchema);
