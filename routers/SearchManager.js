import { searchDatabase } from "../models/first_model.js";
import express from "express";
const SearchRouter = express.Router();

// Homepage of Data Handler
SearchRouter.get('/', (req, res) => {
    return res.render("search")
})

SearchRouter.get('/search-menu', (req, res) => {
    return res.render("search-menu", {searchParameter: req.query.para})
})

// Showing Details (SEARCH BAR)
SearchRouter.get('/filter', async (req, res) => {
    const searchItem = req.query.search;  // Detail entered by the user
    const DataType = req.query.para;   // Its datatype is stored in this
    let finalDatatypeData;
    if(DataType === 'Name' || DataType === 'Item'){
        finalDatatypeData = String(searchItem);
    }else if(DataType === 'UID' || DataType === 'Price'){
        finalDatatypeData = parseInt(searchItem);
    } 
    // After checking, the finalDatatype is achieved.
    try {
        const allDataFromDB = await searchDatabase(finalDatatypeData,DataType);
        return res.render("search-result",{allDataFromDB})
    } catch (error) {
        next(error)
    }
});

export default SearchRouter;