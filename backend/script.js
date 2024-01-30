const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const clientRouters = require("./routers/clientRouters");
const AdvocateRouters = require("./routers/advocate")
const caoRouters = require("./routers/caoRouters")
const courtRouters = require("./routers/court")
const judgeRouters = require("./routers/judge")
const PartyinpersonRouter = require("./routers/PartyInPerson")
const publicAdvocate = require("./routers/publicAdvocate")

// const { MongoClient, ServerApiVersion } = require('mongodb');

// app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173', // Change this to your React app's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable credentials (if required)
}));

const port = process.env.PORT || 5000;
app.use(express.json());
app.use("/client", clientRouters)
app.use("/court", courtRouters)
app.use("/cao", caoRouters)
app.use("/advocate", AdvocateRouters)
app.use("/judge", judgeRouters);
app.use("/file", PartyinpersonRouter)
app.use("/publicadvocate",publicAdvocate)

// app.use("/conferences",ConferenceRouter)

// MongoDB connection URI with authentication credentials

const uri = "mongodb+srv://kasojusaiteja10:NScp7nXc2sFJU9wG@cluster0.0wflstm.mongodb.net/eportalDB?retryWrites=true&w=majority";

// Create a new MongoClient

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// async function run() {
//   try {
//     await client.connect();
//     console.log("Connected to MongoDB!");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   } finally {
//     await client.close();
//   }
// }

// run().catch(console.error);
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
    console.log("Connected to MongoDB!")
})
.catch((err) => {
    console.error("Error connecting to MongoDB:", err.message)
})


// app.use("/client", clientRouters)
// app.use("/advocate", AdvRouters);
// app.use("/cao",caoRouters)
// const { Court, CourtAdmin } = require('./models/cao'); // Import the models

// // Suppose you have the ObjectId of an existing Court document
// const courtId = '658855903eb9ee3ac6cefad2'; // Replace with your valid Court ObjectId

// // Create a new CourtAdmin document referencing the Court
// const newCourtAdmin = new CourtAdmin({
//   firstName: 'kasoju',
//   lastName: 'saiteja',
//   username: 'admin123',
//   password: 'Admin@123',
//   email: 'admincao@gmail.com',
//   phone: '7659945522',
//   role: 'Court Administrative Officer',
//   court: courtId, // Assign the valid ObjectId of an existing Court document
//   department: 'Administration',
//   experienceYears: 5,
//   // Other fields as needed
// });

// // Save the new CourtAdmin document
// newCourtAdmin.save()
//   .then(savedCourtAdmin => {
//     console.log('Court Admin created:', savedCourtAdmin);
//   })
//   .catch(error => {
//     console.error('Error creating Court Admin:', error);
//   });

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})