import React, { useState } from 'react';

const DocumentUploadForm = ({ onChange }) => {
  const [documents, setDocuments] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setDocuments(files);
  };

  const handleNext = () => {
    onChange(documents);
  };

  return (
    <div className="document-upload-form">
      <h2>Document Upload</h2>
      <input type="file" multiple onChange={handleFileChange} />
      <button type="button" onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default DocumentUploadForm;
