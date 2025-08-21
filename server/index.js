import express from "express";
import dotenv from "dotenv"
import {connectDb} from "./database/Db.js";
import cors from "cors"
dotenv.config()

const app=express();
const port=process.env.PORT;
// app.get("/",(req,res)=>{
//     res.send("server is work")
// })

app.use(express.json())
app.use(cors())
import userRout from "./router/userRouter.js";
import progressRout from "./router/progressRouter.js"
import habitRout from "./router/habitRouter.js"
;
app.use('/api/user',userRout);
app.use('/api/progress',progressRout);
app.use('/api/habit',habitRout);
app.listen(port,()=>{
    console.log(`server is running on http://localhost:${port}`)
    connectDb();
})