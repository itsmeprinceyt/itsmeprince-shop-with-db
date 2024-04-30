import mongoose from "mongoose";

const Purchases = new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    item: {type: String, required: true, trim: true},
    UID: {type: Number, required: true},
    price: {type: Number, required: true},
    purchaseDate: {type: String, required:true},
    PublicpurchaseDate: {type: Date, default: Date.now},
    isPurchase: {type: Boolean, default: false},
    isPaid: {type: Boolean, default: false}
});


const PurchaseModel = mongoose.model("itsmeprinceshop",Purchases);

const createDoc = async(Name,ITEM,uid,PRICE,PURCHASEDATE,P_PURCHASEDATE,isPURCHASE,isPAID) => {
    try {
        const newPurchase = new PurchaseModel({
                name: Name,
                item: ITEM,
                UID: uid,
                price: PRICE,
                purchaseDate: PURCHASEDATE,
                PublicpurchaseDate: P_PURCHASEDATE,
                isPurchase: isPURCHASE,
                isPaid: isPAID
            })
        const result = await newPurchase.save()
        console.log(result)
    } catch(error){
        console.log(error)
    }
}

const getDoc = async(limit,skip)=>{
    try {
        const allData = await PurchaseModel.find().skip(skip).limit(limit);
        return allData;
    } catch (error) {
        console.log(error)
    }
}

const getDocById = async(idNumber)=>{
    try {
        const UserData= await PurchaseModel.findById(idNumber);
        return UserData;
    } catch (error) {
        console.log(error)
    }
}

const updateDocById = async(DATABASE_ID,Name,ITEM,uid,PRICE,PURCHASEDATE,P_PURCHASEDATE,isPURCHASE,isPAID)=>{
    try {
        const result = await PurchaseModel.updateOne(
            {_id: DATABASE_ID},
            {
                name: Name,
                item: ITEM,
                UID: uid,
                price: PRICE,
                purchaseDate: PURCHASEDATE,
                PublicpurchaseDate: P_PURCHASEDATE,
                isPurchase: isPURCHASE,
                isPaid: isPAID
            })
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

const deleteDocById = async(DATABASE_ID)=>{
    try {
        const result = await PurchaseModel.findByIdAndDelete(`${DATABASE_ID}`);
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

const searchDatabase = async (finalDatatypeData,DataType)=>{
    try {
        if(DataType === "Name")
        {
            const result = await PurchaseModel.find({name: finalDatatypeData})
            return result
        }else if(DataType === 'Item'){
            const result = await PurchaseModel.find({item: finalDatatypeData})
            return result
        }else if(DataType === 'UID'){
            const result = await PurchaseModel.find({UID: finalDatatypeData})
            return result
        }else if(DataType === 'Price'){
            const result = await PurchaseModel.find({price: finalDatatypeData})
            return result
        } 
    } catch (error) {
        console.log(error)
    }
}


export {PurchaseModel, createDoc, getDoc, getDocById, updateDocById, deleteDocById, searchDatabase};