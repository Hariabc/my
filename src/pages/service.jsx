// AboutUsPage.js

import React from 'react';

const AboutUsPage = () => {
  return (
    <div className="about-us-page">
      <header className="page-header">
        <h1>Welcome to Our Court Services</h1>
      </header>

      <section className="service-section">
        <div className="service-category">
          <h2>Our Services</h2>
          <p>
            We provide a range of services to make the legal process efficient and accessible for everyone involved.
          </p>
          <ul>
            <li>Case Tracking</li>
            <li>Case Filing</li>
            <li>Pre-Trial Conference</li>
            <li>Payments</li>
            <li>Advocate Selection</li>
            <li>Scheduling</li>
            <li>Notifications</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
