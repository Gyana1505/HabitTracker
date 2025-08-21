import TryCatch from "../middleware/trycatch.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const registerUser=TryCatch(async(req,res)=>{
    const {name,email,password}=req.body;
    let user=await User.findOne({email});
    console.log(user)
    if (user) {
        return res.json({
           message:"user already exist",
        })
    }else{
        const hasPassword=await bcrypt.hash(password,10);
        await User.create({  
        name:name,
        email:email,
        password:hasPassword,
    });

    res.json({
        message:"User register sucessfully"
    });
    }
});

export const loginUser=TryCatch(async(req,res)=>{
    const {email,password}=req.body
    const user=await User.findOne({email})
    if(!user) 
    return res.status(400).json({
        message:"no user is present with this email"
    })
    const mathPassword=await bcrypt.compare(password,user.password)
    console.log("hello")
    if(!mathPassword) 
    return  res.status(400).json({
        message:"wrong password"
    })

    const token=jwt.sign({_id:user._id},process.env.JWT_SECRET,{
        expiresIn:"15d"
    })

    res.json({
        message:`welcome back ${user.name}`,
        token,
        user,
    })
})