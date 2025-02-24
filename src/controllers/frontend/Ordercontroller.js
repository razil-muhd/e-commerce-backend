import { OrderModel } from '../../models/OrderModel.js';
import { productModel } from '../../models/ProductModel.js';
import { serverError } from '../../utils/errorHandler.js';
export const createOrder = async (req, res, next) => {
    try{
	const { billingdetails, items } = req.body;
	const  {adminId}  = req.user;
    if(!items){
        return res.status(400).json({
            message:'Items are required'});
        }
        const shippingCost = 30;
        const productIds = items.map((items) => items.id);
        const matchedProducts = [];
        for(const productId of productIds){
            const products = await productModel.find({_id:productId,deletedAt:null}).lean();
            matchedProducts.push(...products);
        }

        if(matchedProducts.length !== items.length){
            return res.status(404).json({
                success:false,
                message:'All products not found',
                data:{}
            });

        }
        let total = 0;
        const orderItems = items.map((cartItem) => {
            const price = matchedProducts.find((item) => item._id.toString() === cartItem.id.toString())?.price;
            total = total + cartItem.quantity * price;
            return {
                productId:cartItem.id,
                quantity:cartItem.quantity,
                price:price,
            };

        
    });

    const tax = total * 0.18;
    const grandTotal = total + tax + shippingCost;
    const order = await OrderModel.create({
        billingdetails: billingdetails,
        items:orderItems,
        subTotal:total,
        grandTotal:grandTotal,
        tax:tax,
        shippingCost:shippingCost,
        userId:adminId,
    });
    console.log(order)
    return res.status(200).json({
        success:true,
        message:'Order created',
        data:{
            orderId : order._id
        }
    });
}
catch(err){
    console.log('err:',err);
    next(serverError());
}

};
