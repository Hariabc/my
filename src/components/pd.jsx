import React from 'react';

const PersonalDetailsForm = ({ formData, handleChange }) => {
  return (
    <fieldset>
      <legend>Personal Details</legend>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      {/* Add other personal detail fields */}
    </fieldset>
  );
};

export default PersonalDetailsForm;
