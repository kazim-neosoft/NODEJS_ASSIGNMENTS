const express=require('express');
const { getAllProducts,showAddProductPage, saveProduct, deleteProduct, showUpdateProduct, updateProduct } = require('../controllers/productController');
const router=express.Router();

router.get("/",getAllProducts);
router.get("/addproduct",showAddProductPage);
router.post("/addproduct",saveProduct);
router.get("/deleteproduct/:id",deleteProduct);
router.get("/updateproduct/:id",showUpdateProduct);
router.post("/updateproduct/:id",updateProduct);

module.exports=router;