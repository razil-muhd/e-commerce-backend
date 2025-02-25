import env from '../../../env.js';
import { OrderModel } from '../../models/OrderModel.js';
import { productModel } from '../../models/ProductModel.js';
import { serverError } from '../../utils/errorHandler.js';
import Stripe from 'stripe';
export const createOrder = async (req, res, next) => {
	try {
		const { billingdetails, items } = req.body;
		const { adminId } = req.user;
		if (!items) {
			return res.status(400).json({
				message: 'Items are required',
			});
		}
		const shippingCost = 30;
		const productIds = items.map((items) => items.id);
		const matchedProducts = [];
		for (const productId of productIds) {
			const products = await productModel.find({ _id: productId, deletedAt: null }).lean();
			matchedProducts.push(...products);
		}

		if (matchedProducts.length !== items.length) {
			return res.status(404).json({
				success: false,
				message: 'All products not found',
				data: {},
			});
		}
		let total = 0;
		const orderItems = items.map((cartItem) => {
			const price = matchedProducts.find((item) => item._id.toString() === cartItem.id.toString())?.price;
			total = total + cartItem.quantity * price;
			return {
				productId: cartItem.id,
				quantity: cartItem.quantity,
				price: price,
			};
		});

		const tax = total * 0.18;
		const grandTotal = total + tax + shippingCost;
		const order = await OrderModel.create({
			billingdetails: billingdetails,
			items: orderItems,
			subTotal: total,
			grandTotal: grandTotal,
			tax: tax,
			shippingCost: shippingCost,
			userId: adminId,
		});

		return res.status(200).json({
			success: true,
			message: 'Order created',
			data: {
				orderId: order._id,
			},
		});
	} catch (err) {
		console.log('err:', err);
		next(serverError());
	}
};

export const payment = async (req, res, next) => {
	try {
		const stripe = Stripe(env.STRIPE_SECRET_KEY);
		const { orderId } = req.query;
        const order = await OrderModel.findOne({_id:orderId});

         const customer = await stripe.customers.create({
            name: order.billingdetails.name,
            address: {
                line1: order.billingdetails.address,
                postal_code: order.billingdetails.pincode,
                city: 'Kannur',
                state: 'Kerala',
                country: 'india',
            },
         });

         const session = await stripe.paymentIntents.create({
            customer: customer.id,
            amount: order.grandTotal * 100,
            currency: 'inr',
            shipping: {
                name:order.billingdetails.name,
                address: {
                    line1: order.billingdetails.address,
                    postal_code: order.billingdetails.pincode,
                    city: 'Kannur',
                    state: 'Kerala',
                    country: 'india',
            },
        },
        automatic_payment_methods:{
            enabled:true,
        },
        description:'order',
        metadata:{
            orderId: orderId.toString(),
        },
        receipt_email:order.email,

         });

          return res.status(200).json({
            success:true,
            message:'payment created',
            data:{
                sessionId:session.client_secret,
                amount:order.grandTotal,
            }
          });
	} catch (err) {
        console.log('errrrorrr:',err);
		next(serverError());
	}
};
