// PublicAdvocateDetails.jsx
import React from 'react';

const PublicAdvocateDetails = ({ publicAdvocateFormDetails }) => {
  return (
    <div className="public-advocate-details">
      <h2>Public Advocate Details</h2>
      <p>Reason: {publicAdvocateFormDetails.reason}</p>
      <h3>Income Certificate</h3>
      {publicAdvocateFormDetails.IncomeCertificate.map((certificate, index) => (
        <div key={index}>
          <p>Filepath: {certificate.filepath}</p>
          <p>URL: {certificate.url}</p>
        </div>
      ))}
      <h3>Identification Document</h3>
      {publicAdvocateFormDetails.IdentificationDocument.map((document, index) => (
        <div key={index}>
          <p>Filepath: {document.filepath}</p>
          <p>URL: {document.url}</p>
        </div>
      ))}
    </div>
  );
};

export default PublicAdvocateDetails;
