const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()

const app = express();

app.use(bodyParser.json());
app.use(cors());

function connectDB(){
    mongoose.connect(process.env.MONGODB_URL);
    console.log('Database connected successfully');
}

connectDB();

const productSchema=new mongoose.Schema({
    name :String,
    image:String,
    price : Number
});
const Product = new mongoose.model('Product',productSchema);


app.get('/',(req,res)=>{
    res.send('Hello world!')
});


app.post('/product', async(req,res)=>{
    const product=await Product.create({
        name : req.body.name,
        image : req.body.image,
        price : req.body.price
    });
    res.send(product);
});

app.get('/product',async(req,res)=>{
    const productData = await Product.find();
    res.send(productData);

});

app.listen(process.env.PORT, ()=>{
    console.log("Server stared on port 3000");
});


