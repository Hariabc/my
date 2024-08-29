// ContactUs.js
import React, { useState } from 'react';
import './ContactUs.css'; // Make sure the CSS file path is correct

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // You can add further logic for form submission
  };

  return (
    <section className='contact-section'>
      <div className='container'>
        
        <div className='title'>
          <h1>Contact Us</h1>
        </div>
        <div className='box'>
          <div className='contact form'>
            <h1 className='contact-form'>Contact Form</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor='name'>Name:</label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
              />
              <label htmlFor='email'>Email:</label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
              />
              <label htmlFor='message'>Message:</label>
              <textarea
                id='message'
                name='message'
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
              <button type='submit'>Submit</button>
            </form>
          </div>

          <div className='contact info'>
            <h2>Contact Information</h2>
            <p>abc@gmail.com</p>
            <p>1234 Sample Street,</p>
            <p>Cityville, Country</p>

          </div>

          <div className='contact map'>
            <h3>Location Map</h3>
            {/* Google Maps Embed */}
            <iframe
              title='Google Maps'
              width='100%'
              height='300'
              frameBorder='0'
              style={{ border: 0 }}
              src='https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3502.248911659996!2d77.23460879678954!3d28.622301100000016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1702632052611!5m2!1sen!2sin'
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
