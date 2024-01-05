import React, { useState } from 'react';
import CourtFeePaymentForm from './payment';

const DocumentsForm = () => {
  const [documentsFormData, setDocumentsFormData] = useState({
    documents: [],
  });

  const [isDocumentsFormSubmitted, setDocumentsFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, files } = e.target;
    setDocumentsFormData((prevData) => ({
      ...prevData,
      [name]: Array.from(files),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle document submission, e.g., send to server
    console.log('Documents submitted:', documentsFormData);
    // You may want to redirect or show a success message after submission
    setDocumentsFormSubmitted(true);
  };

  return (
    <div className="documents-form">
      <h2 className="form-section-title">Documents Uploading</h2>
      {isDocumentsFormSubmitted ? (
        // Render case details form if defendant form is submitted
        <CourtFeePaymentForm />
      ) : (
        // Render defendant form if it's not submitted

        <form onSubmit={handleSubmit} className="form-grid">
          <div className='documents-section'>
            <h3 className="section-title">Documents</h3>
            <div className='grid-half'>
              <label className="form-label">
                Upload Documents:
                <input type="file" name="documents" onChange={handleChange} className="form-input" multiple />
              </label>
            </div>
          </div>
          {/* Submit Button for Documents Form */}
          <div className="submit-section">
            <button type="submit" className="submit-button">
              Submit Documents
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default DocumentsForm;