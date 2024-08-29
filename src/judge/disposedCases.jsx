import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Mycases.css'; // Import your CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import DocumentsModal from './documents';
import { Button, Container, Paper, Select,MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const AdminDashboard = () => {
  const [cases, setCases] = useState([]);
  const [user, setUser] = useState([]);

  const [filteredCases, setFilteredCases] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedCaseDocuments, setSelectedCaseDocuments] = useState([]);
  const [documentsModalVisible, setDocumentsModalVisible] = useState(false);
  const [caseDetailsModalVisible, setCaseDetailsModalVisible] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/judge/disposedcases', { withCredentials: true });
        setCases(response.data.disposedCases);
        setFilteredCases(response.data.disposedCases);
      } catch (error) {
        console.error('Error fetching cases:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/judge/user', { withCredentials: true });
        setUser(response.data.user); // Assuming the response includes user data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const viewDocuments = (caseItem) => {
    setSelectedCase(caseItem);
    setSelectedCaseDocuments(caseItem.documents);
    setDocumentsModalVisible(true);
  };
  const openCaseDetailsModal = (caseItem) => {
    setSelectedCase(caseItem);
    setCaseDetailsModalVisible(true);
  };

  const closeCaseDetailsModal = () => {
    setCaseDetailsModalVisible(false);
    setSelectedCase(null);
  };
  const closeDocumentsModal = () => {
    setDocumentsModalVisible(false);
    setSelectedCase(null);
  };

    
  const handleFilterChange = (e) => {
    const selectedType = e.target.value;

    if (selectedType === 'all') {
      setFilteredCases(cases);
    } else {
      const filtered = cases.filter((caseItem) => caseItem.filecasetype === selectedType);
      setFilteredCases(filtered);
    }

    setFilterType(selectedType);
  };

  return (
    <Container component="div" maxWidth="xl">
      <ToastContainer />
      <Typography variant="h4" style={{ textAlign: 'center', margin: '20px 0' }}>JUDGE DASHBOARD - DISPOSED CASES</Typography>

      {filteredCases.length === 0 ? (
        <Typography variant="p" style={{ textAlign: 'center' }}>No filed cases available.</Typography>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ width: '300px' }}>
            <label style={{ marginRight: '10px', fontSize: '20px', fontWeight: 'bold' }}>Filter by Case Type:</label>
            <br></br>
            <Select
  value={filterType}
  onChange={handleFilterChange}
  style={{ fontSize: '16px', minWidth: '250px' }}
  MenuProps={{
    style: { fontSize: '16px', color: 'blue' },
    getContentAnchorEl: null,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
  }}
>
  <MenuItem value="all">All</MenuItem>
  <MenuItem value="partyinperson">Party in Person</MenuItem>
  <MenuItem value="privateAdvocate">Private Advocate</MenuItem>
  <MenuItem value="publicAdvocate">Public Advocate</MenuItem>
</Select>

            </div>
          </div>

          <div>
            <Typography variant="h5"></Typography>
            {filteredCases.length > 0 ? (
              <TableContainer component={Paper}>
                <Table>
                <TableHead>
  <TableRow>
    <TableCell style={{ background: 'darkblue', color: 'white' }}>S.NO.</TableCell>
    <TableCell style={{ background: 'darkblue', color: 'white' }}>CASE TITLE</TableCell>
    <TableCell style={{ background: 'darkblue', color: 'white' }}>CASE NUMBER</TableCell>
    <TableCell style={{ background: 'darkblue', color: 'white' }}>VIEW DETAILS</TableCell>
    <TableCell style={{ background: 'darkblue', color: 'white' }}>VIEW DOCUMENTS</TableCell>
    <TableCell style={{ background: 'darkblue', color: 'white' }}>STATUS</TableCell>
  </TableRow>
</TableHead>
                  <TableBody>
                    {filteredCases.map((caseItem, index) => (
                      <TableRow key={caseItem._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{caseItem.caseDetails.title}</TableCell>
                        <TableCell>
                          <strong>{caseItem.caseNumber}</strong>
                        </TableCell>
                        <TableCell>
                          <Button variant="outlined" color="primary" onClick={() => openCaseDetailsModal(caseItem)}>
                            View Details
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button variant="outlined" color="primary" onClick={() => viewDocuments(caseItem)}>
                            View Documents
                          </Button>
                        </TableCell>
                        <TableCell>{caseItem.progress}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography variant="p" style={{ textAlign: 'center' }}>No cases match the selected filter.</Typography>
            )}
          </div>

          {selectedCase && (
            <div className="overlay">
              <div className="modal">
                <div className="modal-content">
                <div className="section">
          <h3>Plaintiff Details</h3>
          <p>Name: {selectedCase.plaintiffDetails.fullName}</p>
                <p>Gender: {selectedCase.plaintiffDetails.gender}</p>
                <p>Age: {selectedCase.plaintiffDetails.age}</p>
                <p>Email Address: {selectedCase.plaintiffDetails.partyEmailAddresses}</p>
                <p>Phone Number: {selectedCase.plaintiffDetails.partyPhoneNumbers}</p>
                <p>Relation: {selectedCase.plaintiffDetails.relation}</p>
                <p>Address: {selectedCase.plaintiffDetails.partyAddress}</p>
                <p>State: {selectedCase.plaintiffDetails.state}</p>
                <p>District: {selectedCase.plaintiffDetails.district}</p>
         
        </div>
        <div className="section">
          <h3>Defendant Details</h3>
          <p>Name: {selectedCase.defendantDetails.fullName}</p>
                <p>Gender: {selectedCase.defendantDetails.gender}</p>
                <p>Age: {selectedCase.defendantDetails.age}</p>
                <p>Email Address: {selectedCase.defendantDetails.partyEmailAddresses}</p>
                <p>Phone Number: {selectedCase.defendantDetails.partyPhoneNumbers}</p>
                <p>Relation: {selectedCase.defendantDetails.relation}</p>
                <p>Address: {selectedCase.defendantDetails.partyAddress}</p>
                <p>State: {selectedCase.defendantDetails.state}</p>
                <p>District: {selectedCase.defendantDetails.district}</p>
              </div> 
              <div className="section-case section">
          <h3>Case Details</h3>
          <p>Case : {selectedCase.filecasetype}</p>
                <p>Title: {selectedCase.caseDetails.title}</p>
                <p>Case-Type : {selectedCase.caseDetails.caseType}</p>
                <p>Case-Summary : {selectedCase.caseDetails.caseSummary}</p>
                <p>Cause of Action : {selectedCase.caseDetails.causeOfAction}</p>
                <p>Date of cause of action: {selectedCase.caseDetails.dateOfCauseOfAction}</p>
                <p>Relief-Sought: {selectedCase.caseDetails.reliefSought}</p>
                <p>Court State : {selectedCase.caseDetails.courtState}</p>
                <p>Court District : {selectedCase.caseDetails.courtDistrict}</p>
                <p>Court Name : {selectedCase.caseDetails.courtName}</p>
              </div>
              <div className="section">
          <h3>Payment Details</h3>
          <p>Payment Method: {selectedCase.paymentDetails.paymentMethod}</p>
                    </div>
                    
                  <button className="close-btn" onClick={closeCaseDetailsModal}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {documentsModalVisible && (
            <DocumentsModal
              documents={selectedCaseDocuments}
              publicAdvocateFormDetails={selectedCase.publicAdvocateFormDetails}
              onClose={closeDocumentsModal}
            />                  
          )}
        </>
      )}
    </Container>
  );
};

export default AdminDashboard;
