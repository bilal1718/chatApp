import express from 'express';
const app=express();
import authRoutes from "./routes/authRoutes.js"
import dotenv from 'dotenv';
dotenv.config();
const PORT=process.env.PORT || 5000;
app.get('/',(req,res)=>{
    res.send('Hello World!!')
})
app.use('/api/auth',authRoutes);
app.listen(PORT,()=>console.log(`THE PORT IS RUNNING ON ${PORT}`))