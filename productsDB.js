require("dotenv").config();

const connectDB=require("./db/connect");

const Product=require("./models/products");
const ProductJson=require("./products.json");

const start=async()=>{
    try {
       await connectDB(process.env.MONGODB_URL);
       await Product.deleteMany();
       await Product.create(ProductJson);
       console.log("successfully added");
    } catch (error) {
        console.log(error);
    }
}

start()