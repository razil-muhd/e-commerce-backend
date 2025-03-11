import Stripepackage from 'stripe';
import env from '../../env.js';
import { serverError } from '../utils/errorHandler.js';
import { OrderModel } from '../models/OrderModel.js';

export const webhooksCreate = async (req, res, next) => {
	try {
		console.log('heloooooo::');
		const stripe = Stripepackage(env.STRIPE_SECRET_KEY);
		const endpoint = env.ENDPOINT_SECRET;
		let event = req.body;
		// console.log('event:', event);
		// console.log('headers', req.headers);
		if (endpoint) {
			// console.log('hello')
			const signature = req.headers['stripe-signature'];
			// console.log('signature',signature);
			try {
				event = stripe.webhooks.constructEvent(req.body, signature, endpoint);
				// console.log('webhooks-event:', event);
			} catch (err) {
				return res.sendStatus(400);
			}
		}

		const { orderId } = event.data.object.metadata;
		let paymentIntent;
		let order;
		console.log('type:::', event.type);
		switch (event.type) {
			case 'payment_intent.succeeded':
				paymentIntent = event.data.object;
				console.log('paymintent:', paymentIntent);

				order = await OrderModel.findOne({
					_id: orderId,
				});
				console.log('order:::::', order);
				order.payment.payment_order_Id = paymentIntent.id;
				order.payment.paymentStatus = 'success';
				order.payment.updatedon = new Date();
				await order.save();

				console.log('order:::::', order);
				// console.log('paymentInent:', paymentIntent);
				console.log('Payment Succesfull');
				break;

			case 'payment_intent.payment_failed':
				paymentIntent = event.data.object;
				// console.log('paymentInent:', paymentIntent);
				order = await OrderModel.findOne({
					_id: orderId,
				});
				order.payment.payment_order_Id = paymentIntent.id;
				order.payment.paymentStatus = 'failed';
				order.payment.updatedon = new Date();
				await order.save();
                console.log('Payment failed',);
				break;

			default:
				console.log('Payment error');
				break;
		}
	} catch (error) {
		return next(serverError(error));
	}
};
