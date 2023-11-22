// AboutPage.js

import React from 'react';
import "./About.css"

const About = () => {
  return (
    <div className="about-page">
      <h1>About Our E-Portal</h1>
      <p>
        Welcome to our e-portal! We are dedicated to providing a seamless and efficient
        online experience for our users. Whether you are a customer, vendor, or just
        curious about who we are, this page will give you a glimpse into our mission
        and values.
      </p>

      <h2>Our Mission</h2>
      <p>
        At [Your Company Name], our mission is to [describe your mission]. We aim to
        [mention your goals and objectives] to ensure our users have the best possible
        experience when using our e-portal.
      </p>

      <h2>Why Choose Us?</h2>
      <p>
        - [Highlight key features or advantages]
        <br />
        - [Another reason why users should choose your e-portal]
        <br />
        - [Any unique selling points or benefits]
      </p>

      <h2>Meet the Team</h2>
      <p>
        Our team is comprised of passionate individuals who are dedicated to making
        your online experience exceptional. From developers to customer support, each
        member plays a crucial role in the success of our e-portal.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions, feedback, or concerns, feel free to reach out to us.
        We value your input and are always here to assist you. You can contact us at
        [your email address] or [phone number].
      </p>
    </div>
  );
};

export default About;
