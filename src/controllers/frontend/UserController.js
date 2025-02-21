import bcrypt from 'bcrypt';
import env from '../../../env.js';

import { UserModel } from '../../models/UserModel.js';
import { serverError } from '../../utils/errorHandler.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
	try {
		
		const { email, name, password, confirmpassword } = req.body;
		const user = await UserModel.findOne({ email: email });
		if (user) {
			return res.status(422).send('email already exist');
		}

		if (password !== confirmpassword) {
			return res.status(400).send('Passwords do not match');
		}
        const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password, salt);

		await UserModel.create({
			email: email,
			name: name,
			password: hash,
		});
		return res.status(200).json({
			message: 'Account created Successfully', success:true,
		});
	} catch (err) {
		console.log(err);
		next(serverError());
	}
};
export const login = async (req,res,next) => {
    try{
        const{email,password}=req.body;
        const user = await UserModel.findOne({email:email});
        if(!user){
            return res.status(422).send('user not found');
        }
        const isPasswordValid = bcrypt.compareSync(password,user.password);
        if(!isPasswordValid){
            return res.status(422).send('password is incorrect');
        }
        const accessToken = jwt.sign({adminId:user._id}, env.USER_JWT_SECRET_KEY,{
            expiresIn:env.JWT_EXPIRES,
        });

        const userData = {email: user.email};
        return res.status(200).json({
            success:true,
            accessToken,
            userData
        });
    }
    catch(err){
        next(serverError());

    }
};
