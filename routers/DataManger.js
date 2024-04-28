import { PurchaseModel, createDoc, getDoc, getDocById, updateDocById, deleteDocById } from "../models/first_model.js";
import formateDate from '../public/formatDate.js';
import express from "express";
const router = express.Router();

router.get('/', (req, res) => {
    return res.render("data-handle")
})

router.get('/new',(req,res)=>{
    return res.render("new")
})
router.post('/new', (req, res) => {
    console.log(`Purchase initiated by: ${req.body.name}`);
    //createDoc("Uvaish",8181881,400,"2024-04-28",true,true);
    
    // formatting date to look nice.
    const GoodLookingDate = formateDate(req.body.date);
    createDoc(
        req.body.name,
        req.body.item,
        req.body.uid,
        req.body.price,
        GoodLookingDate,
        req.body.date,
        req.body.isPurchase === 'true' ? true : false,
        req.body.isPaid === 'true' ? true : false)
    console.log(`Purchase Logged and is successful!`)
    return res.redirect("/Data-Handler/success");
})

router.get('/success', (req,res)=>{
    return res.render("success")
})

router.get('/details', async (req, res) => {
    
    const allDataFromDB = await getDoc(); // It will return An Array of Objects so we are accessing through each element of Array through index.
    return res.render("details", {allDataFromDB})
})

router.get('/modify/:id',async(req,res)=>{
    const CustomerID = await getDocById(req.params.id);
    const mongoDBFilter = CustomerID.PublicpurchaseDate; // making date compatible so it will get set into value in HTML
    const formattedDate = mongoDBFilter.toISOString().split('T')[0]; // converting date into supported value format

    const S_isPurchase = CustomerID.isPurchase ===true? "true" : "false";
    const S_isPaid = CustomerID.isPaid ===true? "true" : "false";

    return res.render("modify",{CustomerID, idNumber: req.params.id, dateProper: formattedDate, S_isPurchase, S_isPaid})
})
router.post('/modify/id/save/:id',(req,res)=>{
    console.log(`Purchase Details modified for: ${req.body.name}`);
    const GoodLookingDate = formateDate(req.body.date);
    const DATABASE_ID = req.params.id;
    updateDocById(
        DATABASE_ID,
        req.body.name,
        req.body.item,
        req.body.uid,
        req.body.price,
        GoodLookingDate,
        req.body.date,
        req.body.isPurchase === 'true' ? true : false,
        req.body.isPaid === 'true' ? true : false
    );
    console.log(`Purchase Data has been successfully modified`)
    return res.redirect("/Data-Handler/success");
})

router.get('/delete/:id',async(req,res)=>{
    const CustomerID = await getDocById(req.params.id);
    return res.render("delete",{CustomerID, idNumber: req.params.id})
})

router.post('/delete/id/del/:id',(req,res)=>{
    console.log(`Purchase Details Deleted for for: ${req.body.name}`);
    const DATABASE_ID = req.params.id;
    const confirmation = req.body.confirmation;
    if(confirmation === 'yes')
    {
        deleteDocById(DATABASE_ID);
        console.log(`Purchase Data has been successfully deleted from the database!`)
        return res.redirect("/Data-Handler/success");
    }else{
        return res.redirect("/Data-Handler/details");
    }
})

export default router;