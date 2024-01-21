// DocumentUploadForm.jsx

import React, { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const DocumentUploadForm = ({ onChange, onNext }) => {
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
            encodeFilesToBase64(documents, (base64Files) => {
              onChange(base64Files);
              onNext();
            });
          },
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };

  const encodeFilesToBase64 = (files, callback) => {
    const promises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({ filename: file.name, data: reader.result });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then(callback);
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
