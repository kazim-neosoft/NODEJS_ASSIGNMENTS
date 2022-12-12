const PizzaDetail = require("../models/PizzaDetail");
const User = require("../models/User");

const cartView=(req,res)=>{
    let data=req.session.cart;
    if(!data){
        return res.redirect('/menu')
    }
    let totalSum=0;
    data.forEach(element => {
        let sub=parseFloat(element.quantity * element.price).toFixed(2);
        totalSum += +sub;
        });
        req.session.totalPrice=totalSum;
    return res.render('cartpage',{data: data,total:totalSum})
}

// const cartHandler=async(req,res)=>{
//     const {id}=req.query;
//     console.log(id);
//     console.log(req.session.email);
//     let email=req.session.email;
//     try {

//         let userDetails=await User.findOne({email:email});
//         // console.log(userDetails);
//         let pizzaDetail=await PizzaDetail.findOne({_id:id});

//         const addToCart=new Cart({
//            image:pizzaDetail.image,
//            name:pizzaDetail.name,
//            price:pizzaDetail.price,
//            userId:userDetails._id
//         });

//         console.log(pizzaDetail);
//         // await Cart.findOneAndUpdate({userId:userDetails._id},pizzaDetail,{new:true});
//         await addToCart.save();
//         return res.send("cart done")
        
//     } catch (error) {
//         console.log('----cartContoller---');
//         console.log(error);
//     }

// }

const cartHandler=async(req,res)=>{
    const {id}=req.params;
    const action=req.query.action;
        try {
            let pizza=await PizzaDetail.findById(id);
            
            if(typeof req.session.cart == 'undefined'){
                req.session.cart=[];
                req.session.cart.push({
                    id:pizza._id,
                    name:pizza.name,
                    price:pizza.price,
                    quantity:1,
                    image:pizza.image
                });          
            }
            else{
                let cart=req.session.cart;
                let newItem=true;

                for(let i=0;i<cart.length;i++){
                    if(cart[i].name==pizza.name){
                        cart[i].quantity++;
                        newItem=false;
                        break;
                    }
                }
                if(newItem){
                    cart.push({
                        id:pizza._id,
                        name:pizza.name,
                        price:pizza.price,
                        quantity:1,
                        image:pizza.image
                    }); 
                    if(action=='remove'){
                        for(let i=cart.length;i>0;i--){
                            if(cart[i].name==pizza.name){
                                cart[i].quantity--;
                                console.log(cart[i].quantity);
                                newItem=false;
                                break;
                            }
                    }         

                }
            }           
            }

            let totalSum=0;
            let data=req.session.cart;
            data.forEach(element => {
                let sub=parseFloat(element.quantity * element.price).toFixed(2);
                totalSum += +sub;
            });
            req.session.totalPrice=totalSum;
            console.log(totalSum);
            return res.render('cartpage',{data: data,total:totalSum});            

        
        } 
        catch (error) {
            console.log(error);
        }
    }

    const cartUpdateHandler=(req,res)=>{
        const {name}=req.params;
        const action=req.query.action;
        try {
            console.log(name);
            console.log(action);
            let cart=req.session.cart;
            console.log('cartlength',cart.length);
            for(let i=0;i<cart.length;i++){
                if(cart[i].name===name){
                    switch (action) {
                        case "add":
                            cart[i].quantity++;
                            // console.log(cart[i].quantity);
                            break;
                        case "remove":
                            cart[i].quantity--;
                            // console.log(cart[i].quantity);
                            if (cart[i].quantity < 1)
                                cart.splice(i, 1);
                            break;
                        case "clear":
                            cart.splice(i, 1);
                            if (cart.length == 0)
                                delete req.session.cart;
                            break;
                        default:
                            console.log('unable to update');
                            break;
                    }
    
                }
                
            }
            res.redirect('/cart');
            
        } catch (error) {
            console.log(error);
        }
    }

    


module.exports={
    cartHandler,
    cartView,
    cartUpdateHandler
}