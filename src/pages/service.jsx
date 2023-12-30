// ServicePage.js

import React from 'react';
import './services.css';

const ServicePage = () => {
  return (
    <>
    <div className="service-header">
        <h1>Our Services</h1>
    </div>
    
    <div className="service-main">
      <div className="service hover14">
        <h2>Pre Trial Video Conference</h2>
        <p>Benefit from virtual pre-trial consultations with our legal experts.</p>
      </div>

      <div className="service">
        <h2>Case Tracking</h2>
        <p>Keep tabs on the progress of your case with our advanced case tracking system.</p>
      </div>

      <div className="service">
        <h2>Client-Judge-Advocate Communication</h2>
        <p>Seamless communication among clients, judges, and advocates for a transparent legal process.</p>
      </div>

      <div className="service">
        <h2>Case Analysis</h2>
        <p>Receive in-depth analysis of your case to make informed decisions.</p>
      </div>

      <div className="service">
        <h2>Notifications</h2>
        <p>Stay updated with timely notifications about your case.</p>
      </div>

      <div className="service">
        <h2>Choose Advocates</h2>
        <p>Explore and select the advocate that best fits your legal needs.</p>
      </div>

      <div className="service">
        <h2>Case Filing</h2>
        <p>Effortlessly file your case using our user-friendly platform.</p>
      </div>
    </div>
    </>
  );
};

export default ServicePage;
