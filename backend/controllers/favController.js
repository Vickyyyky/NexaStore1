import userModel from "../models/userModel.js"

//add item to favourites
const addToFav= async(req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let favData = await userData.favData;
        if (!favData[req.body.itemId]) {
            favData[req.body.itemId] = 1;
        }
        else{
            favData[req.body.itemId]+= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{favData});
        res.json({success:true,message:"Added To Favourites"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//remove items from favourites
const removeFromFav= async(req,res)=>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let favData= await userData.favData;
        if (favData[req.body.itemId]>0) {
            favData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{favData});
        res.json({success:true,message:"Removed From Favourites"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//fetch favourites data
const getFav= async(req,res)=>{
    try {
        let userData= await userModel.findById(req.body.userId);
        let favData= await userData.favData;
        res.json({success:true,favData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {addToFav,removeFromFav,getFav}