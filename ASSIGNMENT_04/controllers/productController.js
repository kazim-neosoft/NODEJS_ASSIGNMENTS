const productModel = require("../models/productModel");

const showAddProductPage=(req,res)=>{
    res.render("addproduct")
}

const showUpdateProduct=async(req,res)=>{
    const {id}=req.params;
    console.log(id);
    try {

        let data=await productModel.findOne({_id:id});
        console.log(data);
        return res.render("updateproduct",{data:data})
        
    } catch (error) {
        
    }
    res.render("updateproduct")
}

const saveProduct=async(req,res)=>{

    const bodyData=req.body;
    const product=new productModel(bodyData);

    try {
        await product.save();
        res.redirect("/")
    } catch (error) {
        console.log(error);
    }

}

const deleteProduct=async(req,res)=>{

    const {id}=req.params;
    try {
        await productModel.findByIdAndRemove({_id:id})
        res.redirect("/")
    } catch (error) {
        console.log(error);
    }    
}

const getAllProducts=async(req,res)=>{
    try {
        let products = await productModel.find({});
        console.log(products);
        res.render("index",{products:products})
    } catch (error) {
        console.log(error);
    }
}

const updateProduct=async(req,res)=>{
    try {

        const bodyData=req.body;
        const {id}=req.params;
        await productModel.findByIdAndUpdate({_id:id},{$set:bodyData})
        res.redirect("/")
        
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    getAllProducts,
    updateProduct,
    deleteProduct,
    saveProduct,
    showAddProductPage,
    showUpdateProduct
}