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
app.use("/user", User);


app.listen(PORT, (err) =>{
    if(err) console.log("ERROR" + err)
    console.log("listening on PORT" + PORT)
})