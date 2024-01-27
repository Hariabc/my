import React from 'react';
import './document.css'
const DocumentsModal = ({ documents, publicAdvocateFormDetails, onClose }) => {
  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal-content">
          <h2>Case Documents</h2>
          <div className="documents-list">
            {documents.map((document, index) => (
              <div key={index} className="document-item">
                <p>Filename: {document.filename}</p>
                <img src={document.url} alt={document.filename} className="document-image" />
              </div>
            ))}
          </div>

          {publicAdvocateFormDetails && (
            <div className="public-advocate-details">
              <h2>Public Advocate Details</h2>
              <p>Reason: {publicAdvocateFormDetails.reason}</p>
              <h3>Income Certificate</h3>
              {publicAdvocateFormDetails.IncomeCertificate.map((certificate, index) => (
                <div key={index} className="document-item">
                  <p>Image: <img src={certificate.url} alt={certificate.filepath} className="document-image" /></p>
                </div>
              ))}
              <h3>Identification Document</h3>
              {publicAdvocateFormDetails.IdentificationDocument.map((document, index) => (
                <div key={index} className="document-item">
                  <p>Image: <img src={document.url} alt={document.filepath} className="document-image" /></p>
                </div>
              ))}
            </div>
          )}

          <button onClick={onClose} className="close-btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentsModal;
