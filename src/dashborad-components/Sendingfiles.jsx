// FileUploader.js
import React, { useState } from 'react';
import './sendingfiles.css';

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        console.error('Please select a file.');
        return;
      }

      // Simulate uploading file to the server
      // In a real-world scenario, replace the URL with your server endpoint
      console.log('File uploaded successfully:', selectedFile.name);

      // Reset selectedFile state after successful upload
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading file:', error.message);
    }
  };

  return (
    <div className="file-uploader-container">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!selectedFile}>
        Upload
      </button>
      <button className="view-files-button">View Files</button>
    </div>
  );
};

export default FileUploader;
