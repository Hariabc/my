import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cao/mycases',{ withCredentials: true }); // Replace with your backend route
        setCases(response.data.courtCases);
        setFilteredCases(response.data.courtCases); // Initially set the filtered cases as all cases
      } catch (error) {
        console.error('Error fetching cases:', error);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const selectedType = e.target.value;

    // If "All" is selected, show all cases
    if (selectedType === 'all') {
      setFilteredCases(cases);
    } else {
      // Filter cases based on the selected type
      const filtered = cases.filter((caseItem) => caseItem.filecasetype === selectedType);
      setFilteredCases(filtered);
    }

    setFilterType(selectedType);
  };

  return (
    <div>
      <h1>Admin Dashboard - Pending Cases</h1>
      <div>
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
        <ul>
          {filteredCases.map((caseItem) => (
            <li key={caseItem._id}>
              {/* Render case details here */}
              <p>Case Number: {caseItem.caseNumber}</p>
              {/* Other case details */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
