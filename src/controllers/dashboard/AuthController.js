import bcrypt from  'bcrypt';
import env from '../../../env.js';
import { AuthModel } from '../../models/AuthModel.js';
import { serverError } from '../../utils/errorHandler.js';
import jwt from 'jsonwebtoken';
export const signup = async (req,res,next) => {
    try{
       const salt = bcrypt.genSaltSync(10);
       const hash = bcrypt.hashSync(env.ADMIN_PASSWORD,salt);

       await AuthModel.create({
        email:env.ADMIN_EMAIL,
        password:hash,
       });
       return res.status(200).json({
        message: 'user created',
      
    });

    }
    catch(err){
        console.log(err);
        next(serverError());
     

    }
};
export const login = async (req,res,next) => {
    try{
        const{email,password}=req.body;
        const user = await AuthModel.findOne({email:email});
        if(!user){
            return res.status(422).send('user not found');
        }
        const isPasswordValid = bcrypt.compareSync(password,user.password);
        if(!isPasswordValid){
            return res.status(422).send('password is incorrect');
        }
        const accessToken = jwt.sign({adminId:user._id}, env.JWT_SECRET_KEY,{
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