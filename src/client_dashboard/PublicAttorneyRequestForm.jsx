// PublicAttorneyRequestForm.jsx

import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firebaseApp } from '../firebase';

const PublicAttorneyRequestForm = ({ onChange, onSubmit }) => {
  const [reason, setReason] = useState('');
  const [incomeCertificate, setIncomeCertificate] = useState(null);
  const [identificationDocument, setIdentificationDocument] = useState(null);

  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    if (type === 'incomeCertificate') {
      setIncomeCertificate(file);
    } else if (type === 'identificationDocument') {
      setIdentificationDocument(file);
    }
  };

  const handleUpload = async () => {
    const storageRef = ref(getStorage(firebaseApp));

    try {
      const uploadPromises = [];

      if (incomeCertificate) {
        const incomeCertificateRef = ref(storageRef, `incomeCertificates/${incomeCertificate.name}`);
        await uploadBytes(incomeCertificateRef, incomeCertificate);
        const incomeCertificateURL = await getDownloadURL(incomeCertificateRef);
        uploadPromises.push({ filename: incomeCertificate.name, url: incomeCertificateURL });
      }

      if (identificationDocument) {
        const identificationDocumentRef = ref(storageRef, `identificationDocuments/${identificationDocument.name}`);
        await uploadBytes(identificationDocumentRef, identificationDocument);
        const identificationDocumentURL = await getDownloadURL(identificationDocumentRef);
        uploadPromises.push({ filename: identificationDocument.name, url: identificationDocumentURL });
      }

      const uploadedFiles = await Promise.all(uploadPromises);
      const formData = {
        reason,
        incomeCertificate: uploadedFiles.find(file => file.filename === incomeCertificate.name),
        identificationDocument: uploadedFiles.find(file => file.filename === identificationDocument.name),
      };

      // Notify the parent component that the form is complete
      onChange(formData);

      // Call the onSubmit function passed from the parent
      onSubmit();

      // Log the download URLs to the console
      console.log('Income Certificate URL:', formData.incomeCertificate.url);
      console.log('Identification Document URL:', formData.identificationDocument.url);
    } catch (error) {
      console.error('Error uploading files:', error);
      // Handle errors (e.g., show a user-friendly message)
    }
  };

  return (
    <div>
      <h2>Request Public Attorney</h2>
      <label>
        Reason for Request:
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter your reason for requesting a public attorney"
        />
      </label>
      <br />
      <label>
        Upload Income Certificate:
        <input type="file" onChange={(e) => handleFileChange(e, 'incomeCertificate')} />
      </label>
      <br />
      <label>
        Upload Identification Document (Aadhar, Driver's License, Passport, etc.):
        <input type="file" onChange={(e) => handleFileChange(e, 'identificationDocument')} />
      </label>
      <br />
      <button onClick={handleUpload}>Submit Request</button>
    </div>
  );
};

export default PublicAttorneyRequestForm;
