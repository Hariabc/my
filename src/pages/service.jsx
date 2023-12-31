// ServicePage.js

import React from 'react';
import './services.css';

const ServicePage = () => {
  return (
    <div className="services" >
       <>
  <div className="service-header">
      <h1>Our Services</h1>
  </div>
  <div className="svg-background">
  {/* <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'><rect fill='#ffffff' width='1600' height='900'/><defs><linearGradient id='a' x1='0' x2='0' y1='1' y2='0'><stop  offset='0' stop-color='#003838'/><stop  offset='1' stop-color='#161C0B'/></linearGradient><linearGradient id='b' x1='0' x2='0' y1='0' y2='1'><stop  offset='0' stop-color='#180000'/><stop  offset='1' stop-color='#856A00'/></linearGradient></defs><g fill='#FFF' fill-opacity='0' stroke-miterlimit='10'><g  stroke='url(#a)' stroke-width='2'><path  transform='translate(0 0)' d='M1409 581 1450.35 511 1490 581z'/><circle  stroke-width='4' transform='rotate(0 800 450)' cx='500' cy='100' r='40'/><path  transform='translate(0 0)' d='M400.86 735.5h-83.73c0-23.12 18.74-41.87 41.87-41.87S400.86 712.38 400.86 735.5z'/></g><g stroke='url(#b)' stroke-width='4'><path  transform='translate(0 0)' d='M149.8 345.2 118.4 389.8 149.8 434.4 181.2 389.8z'/><rect  stroke-width='8' transform='rotate(0 1089 759)' x='1039' y='709' width='100' height='100'/><path  transform='rotate(0 1400 132)' d='M1426.8 132.4 1405.7 168.8 1363.7 168.8 1342.7 132.4 1363.7 96 1405.7 96z'/></g></g></svg> */}
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="0.7" d="M0,32L60,69.3C120,107,240,181,360,202.7C480,224,600,192,720,160C840,128,960,96,1080,90.7C1200,85,1320,107,1380,117.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
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
    </div>
  );
};

export default ServicePage;
