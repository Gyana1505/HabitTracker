import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";
export const isAuth=async(req,res,next)=>{
    try {
        const token=req.headers.token;
    
        if(!token)
        return res.status(403).json({
            message:"Please Login",
        })
        console.log(token)
        const decodedData=jwt.verify(token,process.env.JWT_SECRET)
        console.log(decodedData)
        req.user=await User.findById(decodedData._id)
        console.log("hiiii",req.user)
        next()
    } catch (error) {
        res.status(500).json({
            message:"Login first"
        })
    }
}
