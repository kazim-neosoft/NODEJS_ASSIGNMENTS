const productModel = require("../models/productModel");//getting a productModel i.e a schema of product

const showAddProductPage=(req,res)=>{
    res.render("addproduct")
};//rendering a add product page

//implementing a showUpdateProduct basically a update product page
const showUpdateProduct=async(req,res)=>{
    const {id}=req.params;//getting id through params 
    try {
        let data=await productModel.findOne({_id:id});//finding a data(document) oject using object id->userid
        return res.render("updateproduct",{data:data});//rendering update product and passing document data
        
    } catch (error) {
        console.log(error);//to handle error if promise reject
    }
    res.render("updateproduct");//rednering a update product form/page
};

// implementing a saveproduct function using async await
const saveProduct=async(req,res)=>{

    const bodyData=req.body;//getting form field in oject format
    const product=new productModel(bodyData);//creating a new instance of product model and pass data in schema

    try {
        await product.save();//saving data in DB
        res.redirect("/");//after saving data redirecting to home
    } catch (error) {
        console.log(error);//to catch a error
    }
};

// implementing a delete product function using async-await
const deleteProduct=async(req,res)=>{

    const {id}=req.params;//getting id through params 
    try {
        await productModel.findByIdAndRemove({_id:id})//finding and removing document using userId
        res.redirect("/")
    } catch (error) {
        console.log(error);//error handling
    }    
};

// implementing a getAllproducts function using async-await
const getAllProducts=async(req,res)=>{
    try {
        let products = await productModel.find({}); //find all documents and saving in products variable
        res.render("index",{products:products});//rednering homepage and passing products data
    } catch (error) {
        console.log(error);//error handling
    }
};

// implementing a updateProduct function using async-await
const updateProduct=async(req,res)=>{
    try {
        const bodyData=req.body;//getting body data in object format
        const {id}=req.params;//getting id through params
        await productModel.findByIdAndUpdate({_id:id},{$set:bodyData});//updating data using $set query
        res.redirect("/"); //once updated redirect to homepage
        
    } catch (error) {
        console.log(error);//error handling
    }
}

module.exports={
    getAllProducts,
    updateProduct,
    deleteProduct,
    saveProduct,
    showAddProductPage,
    showUpdateProduct
};//exporting all the functions