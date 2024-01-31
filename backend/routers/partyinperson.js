const mongoose = require('mongoose');
const express = require('express');
const Case = require('../models/partyinperson');
const router = express.Router();
router.use(express.json());
const User = require("../models/client")
const Court = require('../models/court')
const CourtAdmin = require('../models/cao')
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Include other necessary modules and functions...


function generateCaseNumber() {
  const timestamp = Date.now().toString();
  const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let caseNumber = timestamp;
  while (caseNumber.length < 16) {
    const randomIndex = Math.floor(Math.random() * alphanumeric.length);
    caseNumber += alphanumeric.charAt(randomIndex);
  }
  return caseNumber.slice(0, 16);
}

const generatePDF = (caseDetails) => {
  return new Promise((resolve, reject) => {
    try {
      const pdfDoc = new PDFDocument();
      pdfDoc.fontSize(12);
      pdfDoc.text('Case Details', { align: 'center', underline: true, margin: [0, 0, 0, 10] });

      pdfDoc
        .fontSize(10)
        .text(`Case Number: ${caseDetails.caseNumber}`, { underline: true, margin: [0, 0, 0, 5] })
        .text('\nPlaintiff Details:', { underline: true, margin: [0, 5, 0, 5] });

      Object.keys(caseDetails.plaintiffDetails).forEach((key) => {
        pdfDoc.text(`${key}: ${caseDetails.plaintiffDetails[key]}`, { indent: 20 });
      });

      pdfDoc.text('\nDefendant Details:', { underline: true, margin: [0, 5, 0, 5] });

      Object.keys(caseDetails.defendantDetails).forEach((key) => {
        pdfDoc.text(`${key}: ${caseDetails.defendantDetails[key]}`, { indent: 20 });
      });

      Object.keys(caseDetails.paymentDetails).forEach((key) => {
        pdfDoc.text(`${key}: ${caseDetails.paymentDetails[key]}`, { indent: 20 });
      });

      const pdfFilePath = path.join(__dirname, 'generated-pdf.pdf');
      pdfDoc.pipe(fs.createWriteStream(pdfFilePath));
      pdfDoc.end();
      resolve(pdfFilePath);
    } catch (error) {
      reject(error);
    }
  });
};

const sendEmailWithAttachment = async (recipientEmail, pdfFilePath, caseNumber) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'ecourtservicehelper@gmail.com',
      pass: 'aryjahqqwggybawx',
    },
  });

  try {
    const mailOptions = {
      from: 'ecourtservicehelper@gmail.com',
      to: recipientEmail,
      subject: 'Case Details PDF',
      text: `Case has been filed successfully, Your CaseNumber is ${caseNumber}, Download pdf for more details.`,
      attachments: [
        {
          filename: 'case-details.pdf',
          path: pdfFilePath,
        },
      ],
    };

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });
  } catch (error) {
    throw error;
  }
};


function generateCaseNumber() {
  const timestamp = Date.now().toString(); // Current timestamp
  const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Alphanumeric characters
  let caseNumber = timestamp; // Initialize with timestamp

  // Append random alphanumeric characters until the case number length reaches 16
  while (caseNumber.length < 16) {
    const randomIndex = Math.floor(Math.random() * alphanumeric.length);
    caseNumber += alphanumeric.charAt(randomIndex);
  }

  return caseNumber.slice(0, 16); // Return only the first 16 characters
}

router.post('/case', async (req, res) => {
  try {
    const { plaintiffDetails, defendantDetails, caseDetails, downloadURLs, paymentDetails, id } = req.body;

    const courtName = req.body.caseDetails.courtName;

    const court = await Court.findOne({ name: courtName });
    if (!court) {
      return res.status(404).json({ message: 'Court not found' });
    }

    const newCase = new Case({
      caseNumber: generateCaseNumber(),
      plaintiffDetails,
      defendantDetails,
      caseDetails,
      paymentDetails,
    });

    newCase.documents = downloadURLs.map(({ filename, url }) => ({ filename, url }));

    await newCase.save();


    // await newCase.save();

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.cases.push(newCase._id);
    await user.save();

    const courtAdmin = await CourtAdmin.findOne({ court: court._id });
    if (!courtAdmin) {
      return res.status(404).json({ message: 'Court admin not found' });
    }

    courtAdmin.courtCases.push(newCase._id);
    courtAdmin.AllCases.push(newCase._id);

    await courtAdmin.save();
    const pdfFilePath = await generatePDF(newCase);
    await sendEmailWithAttachment(user.email, pdfFilePath, newCase.caseNumber);
    fs.unlinkSync(pdfFilePath);
    res.status(201).json({ message: 'Case details saved successfully', caseNumber: newCase.caseNumber });
  } catch (error) {
    res.status(500).json({ message: 'Error saving case details', error: error.message });
  }
});


module.exports = router;