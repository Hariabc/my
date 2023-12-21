import React, {useState } from 'react';
import './Register.css';


const AdvocateForm = () => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phoneNo: '',
      licenseNumber: '',
      barAssociation: '',
      jurisdiction: '',
      educationQualifications: '',
      yearsOfPractice: '',
      practiceArea: '',
    });
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Advocate Form Data:', formData);
  
      // Add your form submission logic here
  
      fetch("http://localhost:5000/registerAdvocate" , {
        method: "POST",
        crossDomain:true,
        headers: {
          "Content-type" : "application/json",
          Accept:"application/json",
          "Access-Control-Allow-Origin" : "*",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phoneNo: formData.phoneNo,
          licenseNumber: formData.licenseNumber,
          barAssociation: formData.barAssociation,
          jurisdiction: formData.jurisdiction,
          educationQualifications: formData. educationQualifications,
          yearsOfPractice: formData.yearsOfPractice,
          practiceArea: formData.practiceArea,
        }),
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data, "advocateRegister");
        // Additional logic after a successful response
      })
      .catch((error) => {
        console.error("Error during registration:", error.message);
        // Handle the error appropriately, e.g., show an error message to the user
      });
    };
  
    return (
      <div>
        <h3 className="user-form-title">Advocate Registration</h3>
        <form onSubmit={handleSubmit} className="user-form">
          <label className="form-label">
            First Name:
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="form-input" />
          </label>
          <label className="form-label">
            Last Name:
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="form-input" />
          </label>
          <label className="form-label">
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" />
          </label>
          <label className="form-label">
            Phone No:
            <input type="tel" name="phoneNo" value={formData.phoneNo} onChange={handleChange} className="form-input" />
          </label>
          <label className="form-label">
            License Number:
            <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} className="form-input" />
          </label>
          <label className="form-label">
            Bar Association:
            <input type="text" name="barAssociation" value={formData.barAssociation} onChange={handleChange} className="form-input" />
          </label>
          <label className="form-label">
            Jurisdiction:
            <input type="text" name="jurisdiction" value={formData.jurisdiction} onChange={handleChange} className="form-input" />
          </label>
          <label className="form-label">
            Education Qualifications:
            <input type="text" name="educationQualifications" value={formData.educationQualifications} onChange={handleChange} className="form-input" />
          </label>
          <label className="form-label">
            Years of Practice:
            <input type="text" name="yearsOfPractice" value={formData.yearsOfPractice} onChange={handleChange} className="form-input" />
          </label>
          <label className="form-label">
            Practice Area:
            <input type="text" name="practiceArea" value={formData.practiceArea} onChange={handleChange} className="form-input" />
          </label>
          <div className="register">
              <button type="submit" className="form-button">
            Register as Advocate
          </button>
          </div>
        </form>
      </div>
    );
  };
  
  export default AdvocateForm;
  