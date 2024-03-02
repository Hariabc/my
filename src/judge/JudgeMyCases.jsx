import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './JudgeMyCases.css';
import { useNavigate } from 'react-router-dom';
import DocumentModal from './document';
import { toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { Stack, TablePagination } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import theme from '../theme';
import { styled, createTheme } from '@mui/system';
import { tableCellClasses } from '@mui/material/TableCell';
import { TextField, InputAdornment } from '@mui/material';
import Search from '@mui/icons-material/Search';
import { IoMdCloseCircle } from 'react-icons/io';
const JudgeMyCases = ({ judgeId }) => {
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [documentModalVisible, setDocumentModalVisible] = useState(false);
  const [selectedCaseDocuments, setSelectedCaseDocuments] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [user, setUser] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();
  const filteredCases2= cases.filter((caseItem) =>
  caseItem.caseNumber.toString().includes(searchQuery.toUpperCase())
);
  useEffect(() => {
    const fetchJudgeCases = async () => {
      try {
        const response = await axios.get('http://localhost:5000/judge/mycases', { withCredentials: true });
        console.log('API Response:', response.data);
        setCases(response.data);
      } catch (error) {
        console.error('Error fetching judge cases:', error.message);
      }
    };

    fetchJudgeCases();
  }, [judgeId]);

  const handleViewDetails = (caseItem) => {
    setSelectedCase(caseItem);

  };

  const handleCloseModal = () => {
    setSelectedCase(null);
  };

  const handleViewDocuments = (caseItem) => {
    setSelectedCase(caseItem);
    setSelectedCaseDocuments(caseItem.documents);
    setDocumentModalVisible(true);
  };

  const handleCloseDocumentModal = () => {
    setDocumentModalVisible(false);
    setSelectedCase(null);
  };

  const handleSchedulePreTrial = (caseId) => {
    navigate('/judge/schedule-pre-trial')
    console.log(`Scheduling pre-trial for case ${caseId}`);
  };

  const handleJudgement = (caseId) => {
    navigate('/judge/order-judgements')
    console.log(`Providing judgement for case ${caseId}`);
  };

  const handleCloseCase = async (caseId) => {
    try {
      console.log(caseId)
      // Make an API call to update the case status to 'Closed'
      await axios.post(`http://localhost:5000/judge/close-case/${caseId}`, { status: 'Closed' }, { withCredentials: true });
  
      // Update the local state to reflect the closed status
      setCases((prevCases) =>
        prevCases.filter((caseItem) => caseItem._id !== caseId)
      );
  
      // Display a success toast
      toast.success(`Case ${caseId} closed successfully`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Adjust the duration of the toast
      });
    } catch (error) {
      console.error(`Error closing case ${caseId}:`, error.message);
      // Display an error toast
      toast.error(`Error closing case ${caseId}`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
      });
    }
  };
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'text-yellow-600';
      case 'In Progress':
        return 'text-blue-600';
      case 'Closed':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };
  const StyledTableHead = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      background: "#38598b",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  return (
    <div className="container mx-auto mt-8">
      <ToastContainer/>
      <h2>My Cases</h2>
      {/* <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Case Number</th>
            <th className="py-2 px-4 border-b">Parties Involved</th>
            <th className="py-2 px-4 border-b">Case Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((caseItem) => (
            <tr key={caseItem._id}>
              <td className="py-2 px-4 border-b">{caseItem.caseNumber}</td>
              <td className="py-2 px-4 border-b">{caseItem.plaintiffDetails.fullName} vs {caseItem.defendantDetails.fullName}</td>
              <td className={`py-2 px-4 border-b ${getStatusColor(caseItem.progress)}`}>{caseItem.progress}</td>
              <td className="py-2 px-4 border-b">
                <button className={`text-blue-500 ${getStatusColor(caseItem.progress)}`} onClick={() => handleViewDetails(caseItem._id)}>View Case Details</button>
                <button className={`text-gray-500 ml-2 ${getStatusColor(caseItem.progress)}`} onClick={() => handleViewDocuments(caseItem._id)}>View Documents</button>
                <button className={`text-green-500 ml-2 ${getStatusColor(caseItem.progress)}`} onClick={() => handleSchedulePreTrial(caseItem._id)}>Schedule Conference</button>
                <button className={`text-indigo-500 ml-2 ${getStatusColor(caseItem.progress)}`} onClick={() => handleJudgement(caseItem._id)}>Orders & Judgements</button>
                {caseItem.progress !== 'Closed' && (
                  <button className={`text-red-500 ml-2`} onClick={() => handleCloseCase(caseItem._id)}>Close</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <ThemeProvider theme={theme}>
        <Paper sx={{ width: '100%' }}>
        <TextField
        id='outlined-basic'
        variant="outlined" 
        label="CNR Number"
        placeholder='Enter case Number'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
               <Search/>
            </InputAdornment>
          ),
        }}
       />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableHead align='center'>Serial No</StyledTableHead>
                  <StyledTableHead align='center'>Case Title</StyledTableHead>
                  <StyledTableHead align='center'>Case Number</StyledTableHead>
                  <StyledTableHead align='center'>View Details</StyledTableHead>
                  <StyledTableHead align='center'>View Documents</StyledTableHead>
                  <StyledTableHead align='center'>Actions</StyledTableHead>
                </TableRow>
              </TableHead>
              <TableBody>
              {filteredCases2
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((caseItem, index) => (
                    <TableRow key={caseItem._id}>
                      <TableCell width='10'>{index + 1}</TableCell>
                      <TableCell align='center'>{caseItem.title}</TableCell>
                      <TableCell align='center'>{caseItem.caseNumber}</TableCell>
                      <TableCell align='center'>
                        <Button onClick={() => handleViewDetails(caseItem)} variant='contained'>
                          View Details
                        </Button>
                      </TableCell>
                      <TableCell align='center'>
                        <Button onClick={() => handleViewDocuments(caseItem)} variant='contained'>
                          View Documents

        </Button>
      </TableCell>
      <TableCell align='center' width={40}>
        <Stack spacing={3} justifyContent='space-evenly' direction='row'>
          <Button  onClick={() => handleSchedulePreTrial(caseItem._id)} variant='outlined'>Schedule Conference</Button>
          <Button onClick={() => handleJudgement(caseItem._id)} variant='outlined'>Orders & Judgements</Button>
          {caseItem.progress !== 'Closed' && (
                  <Button className={`text-red-500 ml-2`} onClick={() => handleCloseCase(caseItem._id)} variant='outlined'>Close</Button>
                )}
        </Stack>
      </TableCell>
    </TableRow>

  ))}

              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            rowsPerPage={rowsPerPage}
            page={page}
            count={filteredCases.length}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </ThemeProvider>
      {/* Modal for displaying case details */}
      {selectedCase && (
        <>
        <div className="overlay">
          <div className="modal">
          <IoMdCloseCircle style={{marginLeft:"97%",cursor:"pointer", color:"#f95959"}} size={35} onClick={handleCloseModal}/>
            <div className="modal-content">
              {/* Case Details Sections and other details... */}
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
            </div>
          </div>
        </div>
      </>
      )}
      {documentModalVisible && (
        <DocumentModal documents={selectedCase.documents} onClose={handleCloseDocumentModal} />
      )}
    </div>
  );
};

export default JudgeMyCases;
