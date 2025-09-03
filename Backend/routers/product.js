const express = require('express');
const productController = require('../controllers/productController');
const router=express.Router();

router.get('/',productController.getAll);
router.get('/productlist',productController.getProductsByPage);
router.post('/',productController.addProduct);
router.put('/:id',productController.updateProduct);
router.delete('/:id',productController.deleteProduct);

module.exports=router;