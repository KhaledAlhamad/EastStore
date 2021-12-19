const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const PORT =  8080;
const mongoose = require('mongoose');

const db = require("./config/db")
async function main() {
  await mongoose.connect(db.url);
}
main().catch((err) => console.log(err));


const User = require("./routes/user");
const Product = require("./routes/product");
const Cart = require("./routes/cart")
const Auth = require("./routes/auth")

app.use("/user", User);
app.use("/product", Product);
app.use("/cart", Cart)
app.use("/auth", Auth)

app.listen(PORT, (err) =>{
    if(err) console.log("ERROR" + err)
    console.log("listening on PORT" + PORT)
})