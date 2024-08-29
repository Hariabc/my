import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './judge_assign.css';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
  Typography,
  Select,
  MenuItem,
} from '@mui/material';

const AssignJudgeDashboard = () => {
  const [judgeApprovedCases, setJudgeApprovedCases] = useState([]);
  const [registeredJudges, setRegisteredJudges] = useState([]); 
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedJudge, setSelectedJudge] = useState(null);
  const [assignedCases, setAssignedCases] = useState([]); // New state to keep track of assigned cases
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchJudgeApprovedCases = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cao/judgeapproved-cases', {
          withCredentials: true,
        });
        setJudgeApprovedCases(response.data.judgeApprovedCases);
      } catch (error) {
        console.error('Error fetching judge-approved cases:', error);
      }
    };

    fetchJudgeApprovedCases();
  }, []);

  useEffect(() => {
    // Fetch the list of registered judges for the admin
    const fetchRegisteredJudges = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cao/registered-judges', {
          withCredentials: true,
        });
        setRegisteredJudges(response.data.registeredJudges);
      } catch (error) {
        console.error('Error fetching registered judges:', error);
      }
    };

    fetchRegisteredJudges();
  }, []);

  const handleAssignJudge = async (caseId) => {
    try {
      // Assign the selected judge to the case
      await axios.post(
        `http://localhost:5000/cao/assign-judge/${selectedJudge}/${caseId}`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(`Assigned judge for case with ID: ${caseId} to Judge ID: ${selectedJudge._id}`);
  
      // Update the assigned cases state
      setAssignedCases((prevAssignedCases) => [...prevAssignedCases, caseId]);
  
      // Show success toast message
      toast.success('Judge assigned to the case successfully!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error assigning judge:', error);
  
      // Show error toast message
      toast.error('Error assigning judge. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } finally {
      // Close the modal after assignment
      setIsModalOpen(false);
    }
  };

  const filteredJudgeApprovedCases = judgeApprovedCases.filter(
    (caseItem) => !assignedCases.includes(caseItem._id)
  );

  const handleAssignJudgeClick = (caseId) => {
    setSelectedCase(caseId);
    // Open the modal
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    // Close the modal without taking any action
    setIsModalOpen(false);
  };

  return (
    <div className="assign-judge-dashboard" style={{ width: '90%', margin: 'auto' }}>
      <ToastContainer />
      <Typography variant="h4" gutterBottom style={{marginLeft:'400px'}}>
        ASSIGN JUDGE DASHBOARD
      </Typography>

      <TableContainer component={Paper} style={{ width: '100%' }}>
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
            {filteredJudgeApprovedCases.map((caseItem) => (
              <TableRow key={caseItem._id}>
                <TableCell style={{fontWeight:'bold'}}>{caseItem.caseNumber}</TableCell>
                <TableCell>{caseItem.caseDetails.title}</TableCell>
                <TableCell>{caseItem.caseDetails.caseType}</TableCell>
                <TableCell>{caseItem.plaintiffDetails.fullName}</TableCell>
                <TableCell>{caseItem.defendantDetails.fullName}</TableCell>
                <TableCell>{caseItem.caseDetails.courtName}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleAssignJudgeClick(caseItem._id)}
                    variant="outlined"
                    color="primary"
                  >
                    Assign Judge
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
  <Box
    className="modal-box"
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '400px', // Adjust the width as needed
      p: 4,
      bgcolor: 'white',
      boxShadow: 24,
      borderRadius: 4,
      textAlign: 'center',
    }}
  >
    <Typography variant="h6" gutterBottom>
      Select a Judge
    </Typography>
    <div className="select-container" style={{ marginBottom: '20px' }}>
      <label>Select a Judge:</label>
      <Select
        onChange={(e) => setSelectedJudge(e.target.value)}
        className="judge-dropdown"
        value={selectedJudge || ''}
        sx={{ width: '100%', maxWidth: '300px' }}
        MenuComponent={({ children, ...props }) => (
          <Menu
            {...props}
            PaperProps={{
              style: {
                maxHeight: '150px', // Adjust the maxHeight as needed
              },
            }}
          >
            {children}
          </Menu>
        )}
      >
        <MenuItem value="" disabled>
          Choose a Judge
        </MenuItem>
        {registeredJudges.map((judge) => (
          <MenuItem key={judge._id} value={judge._id}>
            {judge.name} - {judge.gender}
          </MenuItem>
        ))}
      </Select>
    </div>
    <div className="modal-buttons">
      <Button onClick={() => handleAssignJudge(selectedCase)} variant="contained" color="primary" sx={{ mr: 2 }}>
        Assign Judge
      </Button>
      <Button onClick={handleCloseModal} variant="outlined" color="secondary">
        Close
      </Button>
    </div>
  </Box>
</Modal>
    </div>
  );
};

export default AssignJudgeDashboard;