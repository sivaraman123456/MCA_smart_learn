import express from "express"
import cors from "cors"
import userAuth from "./routes/user.js"
import upload from "./routes/file.js"
import { connectDB } from "./config/db.js"
const PORT=5000
const app=express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))//--destructure req.body
connectDB()
app.use("/api/auth",userAuth)
app.use("/api",upload)
app.listen(PORT,()=>
{
console.log("Server running successfully on:",PORT);
})


