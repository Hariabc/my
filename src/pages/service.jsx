// LegalServices.js

import React from 'react';
import "./services.css"
const LegalService = ({ title, description }) => (
  <div className="legal-service">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const LegalServices = () => {
  const services = [
    {
      title: 'Contract Review',
      description: 'Our legal experts will review your contracts to ensure clarity and legal compliance.',
    },
    {
      title: 'Legal Consultation',
      description: 'Schedule a consultation with our attorneys to discuss your legal concerns and get guidance.',
    },
    {
      title: 'Intellectual Property',
      description: 'Protect your intellectual property with our experienced legal team. Trademarks, patents, and more.',
    },
    // Add more legal services as needed
  ];

  return (
    <div className="legal-services">
      <h2>Our Legal Services</h2>
      <div className="services-list">
        {services.map((service, index) => (
          <LegalService key={index} title={service.title} description={service.description} />
        ))}
      </div>
    </div>
  );
};

export default LegalServices;
