import React, { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firebaseApp } from '../firebase';

const DocumentUploadForm = ({ onChange, onNext }) => {
  const [documents, setDocuments] = useState([]);
  const [downloadURLs, setDownloadURLs] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setDocuments(files);
  };

  const handleUpload = async () => {
    const storageRef = ref(getStorage(firebaseApp));

    try {
      const uploadPromises = documents.map(async (file) => {
        const uploadRef = ref(storageRef, `documents/${file.name}`);
        await uploadBytes(uploadRef, file);
        const downloadURL = await getDownloadURL(uploadRef);
        return { filename: file.name, url: downloadURL };
      });

      const downloadURLs = await Promise.all(uploadPromises);
      console.log(downloadURLs);
      setDownloadURLs(downloadURLs);
    } catch (error) {
      console.error('Error uploading documents:', error);
      // Handle the error, show a message or take appropriate action
    }
  };

  useEffect(() => {
    if (downloadURLs.length > 0) {
      onChange(downloadURLs);
      onNext();
    }
  }, [downloadURLs, onChange, onNext]);

  return (
    <div>
      <h2>Document Upload</h2>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Documents</button>
    </div>
  );
};

export default DocumentUploadForm;