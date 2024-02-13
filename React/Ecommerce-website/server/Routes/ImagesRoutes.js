import express from "express";
import asyncHandler from "express-async-handler";
import { admin, protect } from "../Middleware/AuthMiddleware.js";
import Order from "./../Models/OrderModel.js";
import {MultimediaModel} from "../Models/MultimediaModel.js"

const routerImages = express.Router();

// // user register
// routerImages.post("/register",upload.single("photo"),async(req,res)=>{

//     const {filename} = req.file;
//     console.log(filename);
//     const {fname} = req.body;

//     if(!fname || !filename){
//         res.status(401).json({status:401,message:"fill all the data"})
//     }

//     try {

//         const date = moment(new Date()).format("YYYY-MM-DD");

//         const userdata = new users({
//             fname:fname,
//             imgpath:filename,
//             date:date
//         });

//         const finaldata = await userdata.save();

//         res.status(201).json({status:201,finaldata});

//     } catch (error) {
//         res.status(401).json({status:401,error})
//     }
// });


// // user data get
// routerImages.get("/getdata",async(req,res)=>{
//     try {
//         const getUser = await users.find();

//         res.status(201).json({status:201,getUser})
//     } catch (error) {
//         res.status(401).json({status:401,error})
//     }
// });


// // delete user data
// routerImages.delete("/:id",async(req,res)=>{

//     try {
//         const {id} = req.params;

//         const dltUser = await users.findByIdAndDelete({_id:id});

//         res.status(201).json({status:201,dltUser});

//     } catch (error) {
//         res.status(401).json({status:401,error})
//     }

// })


// GET SINGLE IMAGE
routerImages.get(
    "/:id",
    asyncHandler(async (req, res, next) => {
    try {
        if(req.params.id){
            const image = await MultimediaModel.findById(req.params.id);
            res.json(image);
        }
        else 
        {
            res.status(404);
            throw new Error("Image not Found");
        }
    } catch (error) {
        next(error);
    }
    })
);

export default routerImages;
