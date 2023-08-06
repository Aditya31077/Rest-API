require("dotenv").config();

const express=require('express');
const app=express();

const products_routes=require("./routes/products");
const connectDB=require("./db/connect");

const PORT=process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.send("Hellowrold");
});

app.use("/api/products",products_routes);


const start=async()=>{
    try{
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT,(req,res)=>{
            console.log(`${PORT} has started`);
    });
    }catch(error){
        console.log(error);
    }
};


start();