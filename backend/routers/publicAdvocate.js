const express = require('express');
const PublicAdvocateCase = require('../models/partyinperson');
const router = express.Router();
router.use(express.json());
const User = require("../models/client");
const Court = require('../models/court');
const CourtAdmin = require('../models/cao');
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Function to generate a unique case number
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

// Function to generate a PDF document based on case details
const generatePDF = (caseDetails) => {
  return new Promise((resolve, reject) => {
    try {
      const pdfDoc = new PDFDocument();
      pdfDoc.fontSize(12);
      pdfDoc.text('Case Details', { align: 'center', underline: true, margin: [0, 0, 0, 10] });

      // Customize the PDF generation based on the schema of your Public Advocate Case model
      // Modify the following lines accordingly

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

// Function to send an email with a PDF attachment
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

// Route to handle the case submission
router.post('/case', async (req, res) => {
  try {
    const {
      id,
      plaintiffDetails,
      defendantDetails,
      caseDetails,
      downloadURLs,
      paymentDetails,
      publicAttorneyRequest: {
        reason,
        incomeCertificate: { filename: incomeCertificateFilename, url: incomeCertificateUrl },
        identificationDocument: { filename: identificationDocumentFilename, url: identificationDocumentUrl },
      },
    } = req.body;

    const courtName = req.body.caseDetails.courtName;

    // Check if the court exists
    const court = await Court.findOne({ name: courtName });
    if (!court) {
      return res.status(404).json({ message: 'Court not found' });
    }

    // Check if the court admin exists
 
    // const downloadURLs = [];

    // Add logic here to save the files to your storage and get their download URLs
    // Use the provided filenames to create paths or unique identifiers for your files

    const newPublicAdvocateCase = new PublicAdvocateCase({
      caseNumber: generateCaseNumber(),
      progress: 'pending',
      filecasetype: 'publicAdvocate',
      publicAdvocateFormDetails: {
        reason,
        IncomeCertificate: {
          filename: incomeCertificateFilename,
          url: incomeCertificateUrl,
        },
        IdentificationDocument: {
          filename: identificationDocumentFilename,
          url: identificationDocumentUrl,
        },
      },
      plaintiffDetails,
      defendantDetails,
      caseDetails,
      paymentDetails,
    });

    // Assuming downloadURLs is an array of objects containing filename and url
    newPublicAdvocateCase.documents = downloadURLs.map(({ filename, url }) => ({ filename, url }));
    await newPublicAdvocateCase.save();

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.cases.push(newPublicAdvocateCase._id);
    await user.save();
    const courtAdmin = await CourtAdmin.findOne({ court: court._id });
    if (!courtAdmin) {
      return res.status(404).json({ message: 'Court admin not found' });
    }
    courtAdmin.AllCases.push(newPublicAdvocateCase._id);

    courtAdmin.courtCases.push(newPublicAdvocateCase._id);
    await courtAdmin.save();
    // Additional logic for sending emails, generating PDFs, etc.
    const pdfFilePath = await generatePDF(newPublicAdvocateCase);
    await sendEmailWithAttachment(user.email, pdfFilePath, newPublicAdvocateCase.caseNumber);
    fs.unlinkSync(pdfFilePath);

    res.status(201).json({ message: 'Case details saved successfully', caseNumber: newPublicAdvocateCase.caseNumber });
  } catch (error) {
    res.status(500).json({ message: 'Error saving case details', error: error.message });
  }
});

module.exports = router;
