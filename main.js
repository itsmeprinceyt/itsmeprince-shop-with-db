import express from "express";
import path from "path"
import connectDB from './connectDB/connectDB.js';
import DataManager from './routers/DataManger.js';
import { searchDatabaseForPrice } from "./models/first_model.js";

const app = express()
const port = process.env.PORT || 3000;
const DATABASEURL = process.env.DATABASE_URL || "mongodb://localhost:27017/IMP_Shop";


app.set("view engine", "ejs")
app.set("views",path.resolve("./views"));
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
connectDB(DATABASEURL)

app.use('/Data-Handler', DataManager);

app.get('/', (req, res) => {
  return res.render("index");
})

app.get('/about',(req,res)=>{
  return res.render("about");
})

app.get('/admin', async (req,res)=>{
  console.log(`Prices from the database has been fetched!`)
  const allPriceDetails = await searchDatabaseForPrice();
  let totalSum=0;
  let totalPurchases=0;
  for(let i=0;i<allPriceDetails.length;i++)
  {
    totalPurchases+=1;
    totalSum+=allPriceDetails[i].price;
  }
  return res.render("admin",{totalSum,totalPurchases});
}),

app.listen(port, () => {
  console.log(`Server is listening on port: http://localhost:${port}`)
})