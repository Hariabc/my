import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './judge_assign.css'; // Make sure to create the appropriate CSS file
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Button,
  Box,
  MenuItem,
  Select,
  Typography,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const AssignPublicAdvocateDashboard = () => {
  const [publicAdvocateApprovedCases, setPublicAdvocateApprovedCases] = useState([]);
  const [registeredPublicAdvocates, setRegisteredPublicAdvocates] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedPublicAdvocate, setSelectedPublicAdvocate] = useState(null);
  const [assignedCases, setAssignedCases] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPublicAdvocateApprovedCases = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cao/publicadvocateapproved-cases', {
          withCredentials: true,
        });
        setPublicAdvocateApprovedCases(response.data.publicadvocateapprovedcases);
      } catch (error) {
        console.error('Error fetching public advocate approved cases:', error);
      }
    };

    fetchPublicAdvocateApprovedCases();
  }, []);

  useEffect(() => {
    const fetchRegisteredPublicAdvocates = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cao/registered-publicAdvocates', {
          withCredentials: true,
        });
        setRegisteredPublicAdvocates(response.data.registeredPublicadvocates);
      } catch (error) {
        console.error('Error fetching registered public advocates:', error);
      }
    };

    fetchRegisteredPublicAdvocates();
  }, []);

  const handleAssignPublicAdvocate = async (caseId) => {
    try {
      await axios.post(
        `http://localhost:5000/cao/assign-publicAdvocate/${selectedPublicAdvocate}/${caseId}`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(`Assigned public advocate for case with ID: ${caseId} to Public Advocate ID: ${selectedPublicAdvocate._id}`);

      setAssignedCases((prevAssignedCases) => [...prevAssignedCases, caseId]);

      toast.success('Public Advocate assigned to the case successfully!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error assigning public advocate:', error);

      toast.error('Error assigning public advocate. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } finally {
      setIsModalOpen(false);
    }
  };

  const filteredPublicAdvocateApprovedCases= (publicAdvocateApprovedCases || []).filter(
    (caseItem) => !assignedCases.includes(caseItem._id)
  );
  
  const handleAssignPublicAdvocateClick = (caseId) => {
    setSelectedCase(caseId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="assign-public-advocate-dashboard" style={{ width: '90%', margin: 'auto' }}>
      <ToastContainer />
      <Typography variant="h4" style={{marginLeft:'300px'}}>ASSIGN PUBLIC ADVOCATE DASHBOARD</Typography>
  <br></br>
      <div>
        <Typography variant="h4"></Typography>
        <TableContainer style={{ width: '100%' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: 'white',backgroundColor:'darkblue', fontWeight: 'bold' }}>CASE NUMBER</TableCell>
                <TableCell style={{ color: 'white',backgroundColor:'darkblue', fontWeight: 'bold' }}>CASE TITLE</TableCell>
                <TableCell style={{ color: 'white',backgroundColor:'darkblue', fontWeight: 'bold' }}>CASE TYPE</TableCell>
                <TableCell style={{ color: 'white',backgroundColor:'darkblue', fontWeight: 'bold' }}>PLANTIFF NAME</TableCell>
                <TableCell style={{ color: 'white',backgroundColor:'darkblue', fontWeight: 'bold' }}>DEFENDANT NAME</TableCell>
                <TableCell style={{ color: 'white',backgroundColor:'darkblue', fontWeight: 'bold' }}>COURT NAME</TableCell>
                <TableCell style={{ color: 'white',backgroundColor:'darkblue', fontWeight: 'bold' }}>ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPublicAdvocateApprovedCases.map((caseItem) => (
                <TableRow key={caseItem._id}>
                  <TableCell style={{fontWeight:'bold'}}>{caseItem.caseNumber}</TableCell>
                  <TableCell>{caseItem.caseDetails.title}</TableCell>
                  <TableCell>{caseItem.caseDetails.caseType}</TableCell>
                  <TableCell>{caseItem.plaintiffDetails.fullName}</TableCell>
                  <TableCell>{caseItem.defendantDetails.fullName}</TableCell>
                  <TableCell>{caseItem.caseDetails.courtName}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleAssignPublicAdvocateClick(caseItem._id)}
                      variant="outlined"
                      color="primary"
                    >
                      Assign Public Advocate
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {isModalOpen && (
        <Modal open={isModalOpen} onClose={handleCloseModal} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box className="modal-box" style={{ width: '400px', padding: '20px', textAlign: 'center' , backgroundColor: 'white'}}>
            <Typography variant="h6" gutterBottom>
              Select a Public Advocate
            </Typography>
            <div className="select-container" style={{ marginBottom: '20px' }}>
              <label>Select a Public Advocate:</label>
              <Select
                onChange={(e) => setSelectedPublicAdvocate(e.target.value)}
                className="public-advocate-dropdown"
                value={selectedPublicAdvocate || ''}
                sx={{ width: '100%', maxWidth: '300px' }}
              >
                <MenuItem value="" disabled>
                  Choose a Public Advocate
                </MenuItem>
                {registeredPublicAdvocates.map((publicAdvocate) => (
                  <MenuItem key={publicAdvocate._id} value={publicAdvocate._id}>
                    {publicAdvocate.firstName} {publicAdvocate.lastName} - {publicAdvocate.gender}-{`Practice area- ${publicAdvocate.practiceArea}`}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="modal-buttons">
              <Button
                onClick={() => handleAssignPublicAdvocate(selectedCase)}
                variant="contained"
                color="primary"
                style={{ marginRight: '10px' }}
              >
                Assign Public Advocate
              </Button>
              <Button onClick={handleCloseModal} variant="outlined" color="secondary">
                Close
              </Button>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default AssignPublicAdvocateDashboard;