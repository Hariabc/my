// ContactUs.js
import React, { useState } from 'react';
import './ContactUs.css';
import contact from "../assets/contact-bg.avif";

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
    <>
      <div className="title" id='contact'>
        <h1>Contact us</h1>
      </div>
      <section className='contact-section'>
        <div className='contact-container' style={{backgroundColor:"white"}}>
          <div className='contact-box'>
            <div className='contact-form-container form'>
              <h1 className='contact-form'>Contact Form</h1>
              <form onSubmit={handleSubmit}>
                <label htmlFor='name' className='contact-label'>Name:</label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  className='contact-input'
                />
                <label htmlFor='email' className='contact-label'>Email:</label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  className='contact-input'
                />
                <label htmlFor='message' className='contact-label'>Message:</label>
                <textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleInputChange}
                  className='contact-textarea'
                ></textarea>
                <button type='submit' className='contact-button'>Submit</button>
              </form>
            </div>

            <div className='contact-info info'>
              <h2 style={{textAlign:"center"}}>Contact Information</h2>
              <p>abc@gmail.com</p>
              <p>1234 Sample Street,</p>
              <p>Cityville, Country</p>
            </div>

            <div className='contact-map map'>
              <h3>Location Map</h3>
              {/* Google Maps Embed */}
              <iframe
                title='Google Maps'
                width='100%'
                height='300'
                style={{ border: 0 }}
                src='https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3502.248911659996!2d77.23460879678954!3d28.622301100000016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1702632052611!5m2!1sen!2sin'
                allowFullScreen
                className='contact-map'
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
