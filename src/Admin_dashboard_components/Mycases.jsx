import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Mycases.css'; // Import your CSS file
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [selectedCase, setSelectedCase] = useState(null);
  const [approveOptionsVisible, setApproveOptionsVisible] = useState(false);
  const [user, setUser] = useState({});


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


  const handleApprove = (caseId) => {
    // Set state to show approve options modal
    setApproveOptionsVisible(true);
    // Set the selected case
    setSelectedCase(cases.find((caseItem) => caseItem._id === caseId));
  };


  const handleReject = (caseId) => {
    // Handle reject action
    console.log(`Rejected case with ID: ${caseId}`);
  };


  const openCaseDetailsModal = (caseItem) => {
    setSelectedCase(caseItem);
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


  return (
    <div className="container">
      <ToastContainer />
      <h1>Admin Dashboard - Pending Cases</h1>
      <div className="filter-section">
        <label>Filter by Case Type:</label>
        <select value={filterType} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="partyinperson">Party in Person</option>
          <option value="privateAdvocate">Private Advocate</option>
          <option value="publicAdvocate">Public Advocate</option>
        </select>
      </div>
      <div>
        <h2>Filtered Cases:</h2>
        <table>
          <thead>
            <tr>
              <th>Serial No</th>
              <th>Case Title</th>
              <th>Case Number</th>
              <th>View Details</th>
              <th>View Documents</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCases.map((caseItem, index) => (
              <tr key={caseItem._id}>
                <td>{index + 1}</td>
                <td>{caseItem.caseDetails.title}</td>
                <td>{caseItem.caseNumber}</td>
                <td>
                  <button onClick={() => openCaseDetailsModal(caseItem)}>View Details</button>
                </td>
                <td>
                  <button onClick={() => viewDocuments(caseItem)}>View Documents</button>
                </td>
                <td>
                  <button onClick={() => handleApprove(caseItem._id)} className='approve-btn'>Approve</button>
                  <button onClick={() => handleReject(caseItem._id)} className='reject-btn'>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCase && (
        <div className="overlay">
          <div className="modal">
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
              <div className="section">
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
                  <div className="modal">
                    <div className="modal-content">
                      <h2>Approve Options</h2>
                      <p>Choose an option to proceed:</p>
                      <button onClick={handleAssignJudge} className='assign-btn'>Approve for Assigning Judge</button>
                      <button onClick={handleAssignPublicAdvocate} className='assign-btn'>Approve for Assigning Public Advocate</button>
                      <button onClick={closeApproveOptionsModal} className='close-btn'>
                        {/* <FontAwesomeIcon icon={faTimes} /> */}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <button className="close-btn" onClick={closeCaseDetailsModal}>
                {/* <FontAwesomeIcon icon={faTimes} /> */}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;