const express = require('express');
const categoryRouter = require('./routers/category');
const productRouter = require('./routers/product');
const cors = require('cors');
const app=express();
app.use(cors());
app.use(express.json());

app.use("/api/categories",categoryRouter);
app.use("/api/products",productRouter);

app.listen(2000,()=>{
    console.log("Server is running on port 2000");
});



