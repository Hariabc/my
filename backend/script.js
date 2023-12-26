const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const clientRouters = require("./routers/clientRouters");
const AdvRouters=require("./routers/privateAdvocate")
app.use(cors({
    origin: 'http://localhost:5173', // Change this to your React app's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable credentials (if required)
  }));
const port = process.env.PORT || 5000;
app.use(express.json());
app.use("/client", clientRouters)
// app.use("")
// app.use(cors())


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
app.use("/client", clientRouters)
app.use("/advocate", AdvRouters);

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})
