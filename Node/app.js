
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
app.use(express.json());
const bcrypt = require("bcryptjs");


const mongoUrl = "mongodb+srv://VenuMadhav21:venom21@venu.5szdufj.mongodb.net/Venu?retryWrites=true&w=majority";

// mongoose.connect(mongoUrl, {
//     useNewUrlParser:true
// }).then(()=>{console.log("Connected to DataBase");})
// .catch((e)=>console.log(e));




app.listen(5000 , () => {
    console.log("Server Started");
});

// // app.post("/post",async(req,res) =>{
// //     console.log(req.body);
// //     const {data} = req.body;
    

// //     try{
// //         if(data == "Venu"){
// //             res.send({status:"ok"})
// //         }
// //         else{
// //             res.send({status:"User Not found"});
// //         }

// //     }
// //     catch(error) {
// //          res.send({status: "Error"});
// //     }


    
// // });

// require("./userDetails");

// const User=mongoose.model("Userinfo");

// const Advocate = mongoose.model("Advocateinfo");

// app.post("/registerClient", async(req,res) => {
    
//     const { firstName,
//     lastName,
//     username,
//     password,
//     dateOfBirth,
//     email,
//     phoneNumber,
//     address,
//     aadharNumber,
//     gender}= req.body;
    
    const passwordEncrypted = await bcrypt.hash(password , 11);


//     try{
//         await User.create({
//             firstName,
//             lastName,
//             username,
//             password,
//             dateOfBirth,
//             email,
//             phoneNumber,
//             address,
//             aadharNumber,
//             gender,
//         });
//         res.send({status : "ok"})

//     } catch(error){
//         res.send({status : "Error"})
//     }

    try{

        const existingUserByEmail = await User.findOne({ email });
        const existingUserByAadharNumber = await User.findOne({ aadharNumber });

        if (existingUserByEmail) {
            return res.send({ error: "User with this email already exists!!" });
        }

        if (existingUserByAadharNumber) {
            return res.send({ error: "User with this Aadhar number already exists!!" });
        }


        await User.create({
            firstName,
            lastName,
            username,
            password : passwordEncrypted,
            dateOfBirth,
            email,
            phoneNumber,
            address,
            aadharNumber,
            gender,
        });
        res.send({status : "ok"})

    } catch(error){
        res.send({status : "Error"})
    }


    
// })

// app.post("/registerAdvocate", async(req,res) => {
    
//     const { firstName,
//     lastName,
//     email,
//     phoneNo,
//     licenseNumber,
//     barAssociation,
//     jurisdiction,
//     educationQualifications,
//     yearsOfPractice,
//     practiceArea}= req.body;
    

//     try{
//         await Advocate.create({
//             firstName,
//             lastName,
//             email,
//             phoneNo,
//             licenseNumber,
//             barAssociation,
//             jurisdiction,
//             educationQualifications,
//             yearsOfPractice,
//             practiceArea,
//         });
//         res.send({status : "ok"})

//     } catch(error){
//         res.send({status : "Error"})
//     }

    try{

        const ExisitngAdvocateByEmail =await Advocate.findOne({email});
        const ExisitngAdvocateByLiscenceNumber =await Advocate.findOne({licenseNumber});
        if (ExisitngAdvocateByEmail) {
          return  res.send({error: "Advocate with this email already exists!!"});
        }

        if(ExisitngAdvocateByLiscenceNumber) {
            return res.send({error: "Advocate with this lisence number already exists"});
        }

        await Advocate.create({
            firstName,
            lastName,
            email,
            phoneNo,
            licenseNumber,
            barAssociation,
            jurisdiction,
            educationQualifications,
            yearsOfPractice,
            practiceArea,
        });
        res.send({status : "ok"})

    } catch(error){
        res.send({status : "Error"})
    }
    
// })
// var http = require('http');

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.end('Hello World!');
// }).listen(808);

const va=require('os')
console.log(va.hostname())