import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Mycases.css'; // Import your CSS file
import { IoMdCloseCircle } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DocumentsModal from './documents'
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
import SearchIcon from '@mui/icons-material/Search';
import Search from '@mui/icons-material/Search';
import { BeatLoader } from 'react-spinners';

const AdminDashboard = () => {
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [selectedCase, setSelectedCase] = useState(null);
  const [approveOptionsVisible, setApproveOptionsVisible] = useState(false);
  const [user, setUser] = useState({});
  const [selectedCaseDocuments, setSelectedCaseDocuments] = useState([]);
  const [documentsModalVisible, setDocumentsModalVisible] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const filteredCases2= cases.filter((caseItem) =>
  caseItem.caseNumber.toString().includes(searchQuery.toUpperCase())
);
  // useEffect(() => {
  //   // Apply the search filter to the initial set of cases
  //   const filteredCases = cases.filter((caseItem) => {
  //     const caseNumberMatch = (caseItem.caseNumber?.toString() || '').includes(searchQuery.toUpperCase());
  //     const titleMatch = (caseItem.title || '').toLowerCase().includes(searchQuery.toLowerCase());
  //     const plaintiffMatch = (caseItem.plaintiffDetails?.fullName || '').toLowerCase().includes(searchQuery.toLowerCase());
  //     const defendantMatch = (caseItem.defendantDetails?.fullName || '').toLowerCase().includes(searchQuery.toLowerCase());
  
  //     return caseNumberMatch || titleMatch || plaintiffMatch || defendantMatch;
  //   });
  
  //   setFilteredCases(filteredCases);
  // }, [cases, searchQuery]);
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cao/mycases', { withCredentials: true });
        setCases(response.data.courtCases);
        setFilteredCases(response.data.courtCases);
      } catch (error) {
        console.error('Error fetching cases:', error);
      }
    };
    fetchData();
  }, []);

  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cao/user', { withCredentials: true });
       setUser(response.data.user); // Assuming the response includes user data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, []);

  const openCaseDetailsModal = (caseItem) => {
    setSelectedCase(caseItem);
  };


  const closeDocumentsModal = () => {
    setDocumentsModalVisible(false);
    setSelectedCase(null);
  };

  const handleFilterChange = (e) => {
    const selectedType = e.target.value;
  
    if (selectedType === 'all') {
      setFilteredCases(cases); // Reset to the original set of cases
    } else {
      const filtered = cases.filter((caseItem) => caseItem.filecasetype === selectedType);
      setFilteredCases(filtered);
    }
  
    setFilterType(selectedType);
  };
  
  

  

  const handleAssignJudge = async () => {
    try {
      // Step 1: Make a request to your backend to assign a judge to the selected case
      const assignJudgeResponse = await axios.post('http://localhost:5000/cao/cases', {
        caseId: selectedCase._id,
        approvalType: 'judge',
      }, { withCredentials: true });
  
      // Handle the response from the '/cases' endpoint
      console.log('Assign Judge Response:', assignJudgeResponse.data);
  
      // Step 2: Make a request to approve the case for assigning a judge
      const adminId = user._id;
      const approveResponse = await axios.post(
        `http://localhost:5000/cao/approve-case/${adminId}/${selectedCase._id}/judge`,
        {},
        { withCredentials: true }
      );
  
      console.log('Approve Response (Assigning Judge):', approveResponse.data);
  
      // Remove the approved case from the list
      const updatedCases = cases.filter((caseItem) => caseItem._id !== selectedCase._id);
      setCases(updatedCases);
      setFilteredCases(updatedCases);
  
      // Close the modal
      setApproveOptionsVisible(false);
  
      // Show success toast message
      toast.success('Case approved for assigning Judge', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error in case approving for assigning Judge:', error);
  
      // Show error toast message
      toast.error('Error assigning judge or approving. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };

  const handleAssignPublicAdvocate = async () => {
    try {
      // Step 1: Make a request to your backend to assign a public advocate to the selected case
      const assignAdvocateResponse = await axios.post('http://localhost:5000/cao/cases', {
        caseId: selectedCase._id,
        approvalType: 'advocate',
      }, { withCredentials: true });
  
      // Handle the response from the '/cases' endpoint
      console.log('Assign Advocate Response:', assignAdvocateResponse.data);
  
      // Step 2: Make a request to approve the case for assigning a public advocate
      const adminId = user._id;
      const approveResponse = await axios.post(
        `http://localhost:5000/cao/approve-case/${adminId}/${selectedCase._id}/advocate`,
        {},
        { withCredentials: true }
      );
  
      console.log('Approve Response (Assigning Public Advocate):', approveResponse.data);
  
      // Remove the approved case from the list
      const updatedCases = cases.filter((caseItem) => caseItem._id !== selectedCase._id);
      setCases(updatedCases);
      setFilteredCases(updatedCases);
  
      // Close the modal
      setApproveOptionsVisible(false);
      // Show success toast message
      toast.success('Case approved for assigning public advocate', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error in case approving for assigning public advocate', error);
  
      // Show error toast message
      toast.error('Error assigning public advocate or approving. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
  };


  const closeApproveOptionsModal = () => {
    // Close the modal without taking any action
    setApproveOptionsVisible(false);
    setSelectedCase(null);
  };


  const closeCaseDetailsModal = () => {
  setApproveOptionsVisible(false);
   setSelectedCase(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
   
  const viewDocuments = (caseItem) => {
    setSelectedCase(caseItem);
    setSelectedCaseDocuments(caseItem.documents);
    setDocumentsModalVisible(true);
    // setSelectedCase(null);

  };
  const handleApprove = (caseId) => {
    // Set state to show approve options modal
    setApproveOptionsVisible(true);
    // Set the selected case
    setSelectedCase(cases.find((caseItem) => caseItem._id === caseId));
    selectedCase(null)
  };
  const handleReject = async (caseId) => {
    try {
      // Make a request to reject the case
      await axios.post(`http://localhost:5000/cao/reject-case/${caseId}`, {}, { withCredentials: true });
  
      console.log(`Case with ID ${caseId} rejected successfully`);
  
      // Update the state to remove the rejected case
      const updatedCases = cases.filter((caseItem) => caseItem._id !== caseId);
      setCases(updatedCases);
      setFilteredCases(updatedCases);
  
      // Show a success toast message
      toast.success('Case rejected successfully', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, // Close the toast after 3000 milliseconds (3 seconds)
      });
  
      // Close the modal or perform any additional actions if needed
    } catch (error) {
      console.error('Error rejecting case:', error);
  
      // Show an error toast message
      toast.error('Error rejecting case. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
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
    <div className="case-container" style={{width:"100%",backgroundColor:"white",padding:"20px",borderRadius:"4px"}}>
      <ToastContainer />
      <h1 style={{textAlign:"center",marginBottom:"20px"}}>Filed Cases</h1>
      <hr />
      {filteredCases.length === 0 ? (
        <div className="loader" style={{marginLeft:"48%",marginTop:"20%"}}>
        <BeatLoader color="black"/>
      </div>
      ) : (
        <>
      <div className="filter-section" style={{paddingTop:"20px"}}>
        <label style={{fontSize:"20px",marginRight:'none'}}>Filter by Case Type:</label>
        <span><select value={filterType} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="partyinperson">Party in Person</option>
          <option value="privateAdvocate">Private Advocate</option>
          <option value="publicAdvocate">Public Advocate</option>
        </select></span>
      </div>
      <div>
        <h2>Filtered Cases:</h2>
        {filteredCases2 ? (
        // <table>
        //   <thead>
        //     <tr>
        //       <th>Serial No</th>
        //       <th>Case Title</th>
        //       <th>Case Number</th>
        //       <th>View Details</th>
        //       <th>View Documents</th>
        //       <th>Actions</th>
        //     </tr>
        //   </thead>
        //   <tbody>
        //     {filteredCases.map((caseItem, index) => (
        //       <tr key={caseItem._id}>
        //         <td>{index + 1}</td>
        //         <td>{caseItem.title}</td>
        //         <td>{caseItem.caseNumber}</td>
        //         <td>
        //           <button onClick={() => openCaseDetailsModal(caseItem)}>View Details</button>
        //         </td>
        //         <td>
        //           <button onClick={() => viewDocuments(caseItem)}>View Documents</button>
        //         </td>
        //         <td>
        //           <button onClick={() => handleApprove(caseItem._id)} className='approve-btn'>Approve</button>
        //           <button onClick={() => handleReject(caseItem._id)} className='reject-btn'>Reject</button>
        //         </td>
        //       </tr>
        //     ))}
        //   </tbody>
        // </table>
        // <YourMaterialUITableComponent/>
        <>
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
                      <TableCell align='center'>{caseItem.caseDetails.title}</TableCell>
                      <TableCell align='center'>{caseItem.caseNumber}</TableCell>
                      <TableCell align='center'>
                        <Button onClick={() => openCaseDetailsModal(caseItem)} variant='contained'>
                          View Details
                        </Button>
                      </TableCell>
                      <TableCell align='center'>
                        <Button onClick={() => viewDocuments(caseItem)} variant='contained'>
                          View Documents

        </Button>
      </TableCell>
      <TableCell align='center' width={40}>
        <Stack spacing={3} justifyContent='space-evenly' direction='row'>
          <Button
            onClick={() => handleApprove(caseItem._id)}
            className='approve-btn'
            variant='outlined'
            color='success'
          >
            Approve
          </Button>
          <Button
            onClick={() => handleReject(caseItem._id)}
            className='reject-btn'
            variant='outlined'
            color='error'
          >
            Reject
          </Button>
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
    </>
      ) : (
        <p>No cases match the selected filter.</p>
      )}
    </div>

      {selectedCase && (
        <>
        <div className="overlay">
          <div className="modal">
          <IoMdCloseCircle style={{marginLeft:"97%",cursor:"pointer", color:"#f95959"}} size={35} onClick={closeCaseDetailsModal}/>
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
              {approveOptionsVisible && (
                <div className="overlay">
                  <div className="modal-approve" style={{backgroundColor:"white", padding:"30px",borderRadius:"15px"}}>
                    <div className="modal-content-approve">
                    <IoMdCloseCircle style={{marginLeft:"95%",cursor:"pointer",color:"#f95959"}} size={35} onClick={closeApproveOptionsModal}/>
                      <h2 style={{paddingBottom:"10px"}}>Approve Options</h2>
                      <p style={{textAlign:"left",color:"black",marginBottom:"10px"}}>Select one option to proceed:</p>
                      <button onClick={handleAssignJudge} className='assign-btn'>Approve for Assigning Judge</button>
                      <button onClick={handleAssignPublicAdvocate} className='assign-btn'>Approve for Assigning Public Advocate</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
      )}
    
    {documentsModalVisible && (
  <DocumentsModal
    documents={selectedCaseDocuments}
    publicAdvocateFormDetails={selectedCase.publicAdvocateFormDetails}  // Assuming publicAdvocateFormDetails is part of selectedCase
    onClose={closeDocumentsModal}
  />
)}
      </>
      )}

    </div>
  );
};

export default AdminDashboard;

// const YourMaterialUITableComponent = () => {
//   const [cases, setCases] = useState([]);
//   const [filteredCases, setFilteredCases] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [filterType, setFilterType] = useState('');
//   const [selectedCase, setSelectedCase] = useState(null);
//   const [approveOptionsVisible, setApproveOptionsVisible] = useState(false);
//   const [user, setUser] = useState({});
//   const [selectedCaseDocuments, setSelectedCaseDocuments] = useState([]);
//   const [documentsModalVisible, setDocumentsModalVisible] = useState(false);


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/cao/mycases', { withCredentials: true });
//         setCases(response.data.courtCases);
//         setFilteredCases(response.data.courtCases);
//       } catch (error) {
//         console.error('Error fetching cases:', error);
//       }
//     };
//     fetchData();
//   }, []);

  
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/cao/user', { withCredentials: true });
//        setUser(response.data.user); // Assuming the response includes user data
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };
  
//     fetchUserData();
//   }, []);



//   const closeDocumentsModal = () => {
//     setDocumentsModalVisible(false);
//     setSelectedCase(null);
//   };

//   const handleFilterChange = (e) => {
//     const selectedType = e.target.value;

//     if (selectedType === 'all') {
//       setFilteredCases(cases);
//     } else {
//       const filtered = cases.filter((caseItem) => caseItem.filecasetype === selectedType);
//       setFilteredCases(filtered);
//     }

//     setFilterType(selectedType);
//   };

//   const handleAssignJudge = async () => {
//     try {
//       // Step 1: Make a request to your backend to assign a judge to the selected case
//       const assignJudgeResponse = await axios.post('http://localhost:5000/cao/cases', {
//         caseId: selectedCase._id,
//         approvalType: 'judge',
//       }, { withCredentials: true });
  
//       // Handle the response from the '/cases' endpoint
//       console.log('Assign Judge Response:', assignJudgeResponse.data);
  
//       // Step 2: Make a request to approve the case for assigning a judge
//       const adminId = user._id;
//       const approveResponse = await axios.post(
//         `http://localhost:5000/cao/approve-case/${adminId}/${selectedCase._id}/judge`,
//         {},
//         { withCredentials: true }
//       );
  
//       console.log('Approve Response (Assigning Judge):', approveResponse.data);
  
//       // Remove the approved case from the list
//       const updatedCases = cases.filter((caseItem) => caseItem._id !== selectedCase._id);
//       setCases(updatedCases);
//       setFilteredCases(updatedCases);
  
//       // Close the modal
//       setApproveOptionsVisible(false);
  
//       // Show success toast message
//       toast.success('Case approved for assigning Judge', {
//         position: toast.POSITION.TOP_CENTER,
//         autoClose: 3000,
//       });
//     } catch (error) {
//       console.error('Error in case approving for assigning Judge:', error);
  
//       // Show error toast message
//       toast.error('Error assigning judge or approving. Please try again.', {
//         position: toast.POSITION.TOP_CENTER,
//         autoClose: 3000,
//       });
//     }
//   };

//   const handleAssignPublicAdvocate = async () => {
//     try {
//       // Step 1: Make a request to your backend to assign a public advocate to the selected case
//       const assignAdvocateResponse = await axios.post('http://localhost:5000/cao/cases', {
//         caseId: selectedCase._id,
//         approvalType: 'advocate',
//       }, { withCredentials: true });
  
//       // Handle the response from the '/cases' endpoint
//       console.log('Assign Advocate Response:', assignAdvocateResponse.data);
  
//       // Step 2: Make a request to approve the case for assigning a public advocate
//       const adminId = user._id;
//       const approveResponse = await axios.post(
//         `http://localhost:5000/cao/approve-case/${adminId}/${selectedCase._id}/advocate`,
//         {},
//         { withCredentials: true }
//       );
  
//       console.log('Approve Response (Assigning Public Advocate):', approveResponse.data);
  
//       // Remove the approved case from the list
//       const updatedCases = cases.filter((caseItem) => caseItem._id !== selectedCase._id);
//       setCases(updatedCases);
//       setFilteredCases(updatedCases);
  
//       // Close the modal
//       setApproveOptionsVisible(false);
  
//       // Show success toast message
//       toast.success('Case approved for assigning public advocate', {
//         position: toast.POSITION.TOP_CENTER,
//         autoClose: 3000,
//       });
//     } catch (error) {
//       console.error('Error in case approving for assigning public advocate', error);
  
//       // Show error toast message
//       toast.error('Error assigning public advocate or approving. Please try again.', {
//         position: toast.POSITION.TOP_CENTER,
//         autoClose: 3000,
//       });
//     }
//   };


//   const closeApproveOptionsModal = () => {
//     // Close the modal without taking any action
//     setApproveOptionsVisible(false);
//     setSelectedCase(null);
//   };


//   const closeCaseDetailsModal = () => {
//   setApproveOptionsVisible(false);
//    setSelectedCase(null);
//   };
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/cao/mycases', { withCredentials: true });
//         setCases(response.data.courtCases);
//         setFilteredCases(response.data.courtCases);
//       } catch (error) {
//         console.error('Error fetching cases:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const StyledTableHead = styled(TableCell)(({ theme }) => ({
//     [`&.${tableCellClasses.head}`]: {
//       background: "#38598b",
//       color: theme.palette.common.white,
//     },
//     [`&.${tableCellClasses.body}`]: {
//       fontSize: 14,
//     },
//   }));

//   const openCaseDetailsModal = () => {
//     // Your implementation
//   };

//   const handleApprove = (caseId) => {
//     // Your implementation
//   };

//   const handleReject = (caseId) => {
//     // Your implementation
//   };

//   return (
//     <>
//       <ThemeProvider theme={theme}>
//         <Paper sx={{ width: '100%' }}>
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <StyledTableHead align='center'>Serial No</StyledTableHead>
//                   <StyledTableHead align='center'>Case Title</StyledTableHead>
//                   <StyledTableHead align='center'>Case Number</StyledTableHead>
//                   <StyledTableHead align='center'>View Details</StyledTableHead>
//                   <StyledTableHead align='center'>Actions</StyledTableHead>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredCases
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((caseItem, index) => (
//                     <TableRow key={caseItem._id}>
//                       <TableCell width='10'>{index + 1}</TableCell>
//                       <TableCell align='center'>{caseItem.title}</TableCell>
//                       <TableCell align='center'>{caseItem.caseNumber}</TableCell>
//                       <TableCell align='center'>
//                         <Button onClick={() => openCaseDetailsModal(caseItem)} variant='contained'>
//                           View Details
//                         </Button>
//                       </TableCell>
//                       <TableCell align='center' width={40}>
//                         <Stack spacing={3} justifyContent='space-evenly' direction='row'>
//                           <Button
//                             onClick={() => handleApprove(caseItem._id)}
//                             className='approve-btn'
//                             variant='outlined'
//                             color='success'
//                           >
//                             Approve
//                           </Button>
//                           <Button
//                             onClick={() => handleReject(caseItem._id)}
//                             className='reject-btn'
//                             variant='outlined'
//                             color='error'
//                           >
//                             Reject
//                           </Button>
//                         </Stack>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <TablePagination
//             rowsPerPageOptions={[10, 25, 100]}
//             component='div'
//             rowsPerPage={rowsPerPage}
//             page={page}
//             count={filteredCases.length}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </Paper>
//       </ThemeProvider>
//     </>
//   );
// };
  