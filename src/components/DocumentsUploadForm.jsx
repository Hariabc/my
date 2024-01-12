import React, { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


const DocumentUploadForm = ({ onChange , onNext }) => {
  const [documents, setDocuments] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setDocuments(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      showConfirmation();
    
  };

  const showConfirmation = () => {
    confirmAlert({
      title: 'Confirm Submission',
      message: 'Are you sure you want to submit the documents?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            onChange(documents);
            onNext();
          },
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <div className="document-upload-form">
      <h2>Document Upload</h2>
      <input type="file" multiple onChange={handleFileChange} />
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default DocumentUploadForm;
