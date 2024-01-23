import React from 'react';

const DocumentsModal = ({ documents, onClose }) => {
  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal-content">
          <h2>Case Documents</h2>
          <div className="documents-list">
            {documents.map((document, index) => (
              <div key={index} className="document-item">
                <p>Filename: {document.filename}</p>
                <img src={document.url} alt={document.filename} style={{ maxWidth: '100%', maxHeight: '500px' }} />
              </div>
            ))}
          </div>
          <button onClick={onClose} className="close-btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentsModal;
