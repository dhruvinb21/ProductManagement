const db = require('../db');
const Product = require('../models/productModel');

module.exports={

getProductsByPage:async(req,res)=>{
    const page=parseInt(req.query.page) ||1;
    const pageSize=parseInt(req.query.pageSize) ||10;
    const offset=(page-1)*pageSize;
    try {
        const[data]=await Product.getProducts(pageSize,offset);
        if(data.length===0){
            return res.status(404).json({message:"No Products Found"});
        }
        const[countData]=await Product.count();
        const totalItems=countData[0].count;
        const totalPages=Math.ceil(totalItems/pageSize);
        return res.json({
            page,
            pageSize,
            totalItems,
            totalPages,
            data
        });
    } catch (error) {
        return res.status(500).json({message:"Server Error"});
    }
},

    getAll:async(req,res)=>{
        try {
            const[data]=await Product.getAll();
            if(data.length===0){
                return res.status(404).json({message:"No Products Found"});
            }
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({message:"Server Error"});
        }

    },
    addProduct:async(req,res)=>{
        const{name,c_id}=req.body;
        try {
            const [data]=await Product.add(name,c_id);
            if(data.affectedRows===0){
                return res.status(400).jsom({message:"Product not added"});
            }
            return res.status(200).json({id:data.insertId,name,c_id});
        } catch (error) {
            return res.status(500).json({message:"Server Error or Invalid Category ID"});
        }
    },
    updateProduct:async(req,res)=>{
        const{id}=req.params;
        const{name,c_id}=req.body;
        try{
            const[data]=await Product.update(id,name,c_id);
            if(data.affectedRows===0){
                return res.status(400).json({message:"Product not updated"});
            }
            return res.status(200).json({id,name,c_id});
        }catch(error){
            return res.status(500).json({message:"Server Error"});
        }
    },
    deleteProduct:async(req,res)=>{
        const{id}=req.params;
        try{
            const[data]=await Product.delete(id);
            if(data.affectedRows===0){
                return res.status(400).json({message:"Product not deleted"});
            }
            return res.status(200).json({message:"Product deleted"});
        }catch(error){
            return res.status(500).json({message:"Server Error"});
        }
    }
}