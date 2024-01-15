// import React, { useState } from 'react';
// import './CaseTracking.css'; // Assuming you have a CSS file named CaseTracking.css
// import StateDistrictSelector from '../components/Dropdown2';
// import Dropdown from '../components/Dropdown';
// const CaseTracking = () => {
//   const [trackingOption, setTrackingOption] = useState('');
//   const [searchValue, setSearchValue] = useState('');
//   const [caseStatus, setCaseStatus] = useState('');
//   const [selectedState, setSelectedState] = useState('');
//   const [selectedDistrict, setSelectedDistrict] = useState('');

//   const handleSearchOptionClick = (option) => {
//     setTrackingOption(option);
//     setSearchValue('');
//     setCaseStatus('');
//   };

//   const handleStateSelect = (state) => {
//     setSelectedState(state);
//   };

//   const handleDistrictSelect = (district) => {
//     setSelectedDistrict(district);
//   };
//   const handleKeyPress = (e) => {
//     // Restrict input to numbers and alphabets
//     const charCode = e.charCode;
//     if (
//       !(
//         (charCode >= 48 && charCode <= 57) || // Numbers
//         (charCode >= 65 && charCode <= 90) || // Uppercase alphabets
//         (charCode >= 97 && charCode <= 122) // Lowercase alphabets
//       )
//     ) {
//       e.preventDefault();
//     }
//   };

//   const handleSearch = async () => {
//     // Assuming you have a function getCaseStatus that fetches the case status
//     // based on the tracking option and search value
//     try {
//       console.log('Tracking Option:', trackingOption);
//       console.log('Search Value:', searchValue);

//       const capitalizedSearchValue = searchValue.toUpperCase(); // Capitalizing the entered value
//       const status = await getCaseStatus(trackingOption, capitalizedSearchValue);
//       setCaseStatus(status);
//     } catch (error) {
//       console.error('Error fetching case status:', error);
//       // Handle error
//     }
//   };

//   const handleInputChange = (e) => {
//     const inputValue = e.target.value;
//     setSearchValue(inputValue.toUpperCase()); // Capitalize the entered value
//   };

//   return (
//     <div className="full-width-container">
//       <div className="tracking-container">
//         <h2 style={{paddingBottom:"none"}}>Case Tracking</h2>

//         <div className="options-container">
//           <div
//             className={`option ${trackingOption === 'cnr' ? 'active' : ''}`}
//             onClick={() => handleSearchOptionClick('cnr')}
//           >
//             CNR Number
//           </div>
//           <div
//             className={`option ${trackingOption === 'partyName' ? 'active' : ''}`}
//             onClick={() => handleSearchOptionClick('partyName')}
//           >
//             Party Name
//           </div>
//           <div
//             className={`option ${trackingOption === 'advocateName' ? 'active' : ''}`}
//             onClick={() => handleSearchOptionClick('advocateName')}
//           >
//             Advocate Name
//           </div>
//           <div
//             className={`option ${trackingOption === 'courtName' ? 'active' : ''}`}
//             onClick={() => handleSearchOptionClick('courtName')}
//           >
//             Court Name
//           </div>
//         </div>

//         {trackingOption && (
//           <div className="input-container">
//             <StateDistrictSelector
//             onSelectState={handleStateSelect}
//             onSelectDistrict={handleDistrictSelect}
//           />
//             <Dropdown onSelectCourt={handleCourtSelect} />
//             <input
//               type="text"
//               placeholder={`Enter ${
//                 trackingOption === 'cnr'
//                   ? 'CNR'
//                   : trackingOption === 'courtName'
//                   ? 'Court Name'
//                   : trackingOption
//               }`}
//               value={searchValue}
//               onChange={handleInputChange}
//             />
//             <button onClick={handleSearch}>Submit</button>
//           </div>
//         )}

//         {caseStatus && (
//           <div className="case-status">
//             <h3>Case Status:</h3>
//             <p>{caseStatus}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CaseTracking;


import React, { useState } from 'react';
import './CaseTracking.css';
import StateDistrictSelector from '../components/Dropdown2';
import Dropdown from '../components/Dropdown';

const CaseTracking = () => {
  const [trackingOption, setTrackingOption] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [caseStatus, setCaseStatus] = useState('');       
  const [selectedCourt, setSelectedCourt] = useState(''); // Add state for selected court

  const handleSearchOptionClick = (option) => {
    setTrackingOption(option);
    setSearchValue('');
    setCaseStatus('');
  };

  const handleStateSelect = (state) => {
    setSelectedState(state);
  };

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
  };

  const handleCourtSelect = (court) => {
    setSelectedCourt(court); // Update the selected court
  };

  const handleKeyPress = (e) => {
    // Restrict input to numbers and alphabets
    const charCode = e.charCode;
    if (
      !(
        (charCode >= 48 && charCode <= 57) || // Numbers
        (charCode >= 65 && charCode <= 90) || // Uppercase alphabets
        (charCode >= 97 && charCode <= 122) // Lowercase alphabets
      )
    ) {
      e.preventDefault();
    }
  };

  const getCaseStatus = async (trackingOption, searchValue) => {
    // Implement your logic to fetch case status based on tracking option and search value
    // Example: You might make an API call here
    // const response = await fetch(`/api/caseStatus?trackingOption=${trackingOption}&searchValue=${searchValue}`);
    // const data = await response.json();
    // return data.status;
    // Replace the above lines with your actual logic
  };

  const handleSearch = async () => {
    try {
      console.log('Tracking Option:', trackingOption);
      console.log('Search Value:', searchValue);

      const capitalizedSearchValue = searchValue.toUpperCase();
      const status = await getCaseStatus(trackingOption, capitalizedSearchValue);
      setCaseStatus(status);
    } catch (error) {
      console.error('Error fetching case status:', error);
      // Handle error
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue.toUpperCase());
  };

  return (
    <div className="full-width-container">
      <div className="tracking-container">
        <h2 style={{ paddingBottom: 'none' }}>Case Tracking</h2>

        <div className="options-container">
          <div
            className={`option ${trackingOption === 'cnr' ? 'active' : ''}`}
            onClick={() => handleSearchOptionClick('cnr')}
          >
            CNR Number
          </div>
          <div
            className={`option ${trackingOption === 'partyName' ? 'active' : ''}`}
            onClick={() => handleSearchOptionClick('partyName')}
          >
            Party Name
          </div>
          <div
            className={`option ${trackingOption === 'advocateName' ? 'active' : ''}`}
            onClick={() => handleSearchOptionClick('advocateName')}
          >
            Advocate Name
          </div>
          <div
            className={`option ${trackingOption === 'courtName' ? 'active' : ''}`}
            onClick={() => handleSearchOptionClick('courtName')}
          >
            Court Name
          </div>
        </div>

        {trackingOption && (
          <div className="input-container">
            <Dropdown onSelectCourt={handleCourtSelect} />
            <input
              type="text"
              placeholder={`Enter ${
                trackingOption === 'cnr'
                  ? 'CNR'
                  : trackingOption === 'courtName'
                  ? 'Court Name'
                  : trackingOption
              }`}
              value={searchValue}
              onChange={handleInputChange}
            />
            <button onClick={handleSearch}>Submit</button>
          </div>
        )}

        {caseStatus && (
          <div className="case-status">
            <h3>Case Status:</h3>
            <p>{caseStatus}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseTracking;
