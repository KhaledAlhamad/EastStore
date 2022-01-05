const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
// const PORT =  8080;
const mongoose = require('mongoose');
const path = require("path");


// app.use('/', express.static(path.join(__dirname, '../frontend/build')));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });

const PORT = process.env.PORT || 8080;
// app.listen(PORT);

const db = require("./config/db")
async function main() {
  await mongoose.connect(db.url);
}
main().catch((err) => console.log(err));


const User = require("./routes/user");
const Product = require("./routes/product");
const Cart = require("./routes/cart")
const Auth = require("./routes/auth")
const Pay = require("./routes/stripe")
app.use("/user", User);
app.use("/product", Product);
app.use("/cart", Cart)
app.use("/auth", Auth)
app.use("/checkout", Pay)


app.listen(PORT, (err) =>{
    if(err) console.log("ERROR" + err)
    console.log("listening on PORT" + PORT)
})