import { PurchaseModel, createDoc, getDoc, getDocById, updateDocById, deleteDocById } from "../models/first_model.js";
import formateDate from '../public/scripts/formatDate.js';
import express from "express";
const router = express.Router();

// Homepage of Data Handler
router.get('/', (req, res) => {
    return res.render("data-handle")
})

// Landing of Adding new purchase
router.get('/new',(req,res)=>{
    return res.render("new")
})

// Receiving POST request from new purchase page
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

// Showing success page for successful addition of the entry
router.get('/success', (req,res)=>{
    return res.render("success")
})

// Showing Details (INCLUDES PAGINATION)
router.get('/details', async (req, res) => {
    const page = req.query.page*1 || 1;
    const limit = req.query.limit*1 || 15;
    const skip = (page-1) * limit;
    try {
        const allDataFromDB = await getDoc(limit, skip);
        const previousPage = page > 1 ? page - 1 : 1;
        const nextPage = page + 1;
        return res.render("details", {
            allDataFromDB,
            currentPage: page,
            limit,
            previousPage,
            nextPage
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving data');
    }
});

// Landing Page for modification of an entry
router.get('/modify/:id',async(req,res)=>{
    const CustomerID = await getDocById(req.params.id);
    const mongoDBFilter = await CustomerID.PublicpurchaseDate; // making date compatible so it will get set into value in HTML
    const formattedDate = mongoDBFilter.toISOString().split('T')[0]; // converting date into supported value format
    const S_isPurchase = CustomerID.isPurchase ===true? "true" : "false";
    const S_isPaid = CustomerID.isPaid ===true? "true" : "false";
    return res.render("modify",{CustomerID, idNumber: req.params.id, dateProper: formattedDate, S_isPurchase, S_isPaid})
})

// SENDING POST Request after modification of an entry so that it can be updated to an existing data
router.post('/modify/id/save/:id',(req,res)=>{
    console.log(`Purchase Details modified for: ${req.body.name}`);
    const GoodLookingDate = formateDate(req.body.date);
    const DATABASE_ID = String(req.params.id);
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

// Landing page for confirmation of deleting an entry
router.get('/delete/:id',async(req,res)=>{
    const CustomerID = await getDocById(req.params.id);
    return res.render("delete",{CustomerID, idNumber: req.params.id})
})

// POST REQUEST from confirmation delete page to delete an entry
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