import express from "express";
import dotenv from "dotenv"
import {connectDb} from "./database/Db.js";

dotenv.config()

const app=express();
const port=process.env.PORT;
// app.get("/",(req,res)=>{
//     res.send("server is work")
// })
app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
    connectDb();
})