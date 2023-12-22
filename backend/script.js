const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const clientRouters= require("./routers/clientRouters")
const port = process.env.PORT || 5000;
app.use(express.json());
app.use("/client",clientRouters)

mongoose.connect('mongodb://127.0.0.1:27017/eportalDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to MongoDB!")
})
.catch((err) => {
    console.error("Error connecting to MongoDB:", err.message)
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})
