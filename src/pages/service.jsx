// ServicePage.js

import React from 'react';
import './services.css';
import { FaVideo } from "react-icons/fa6";
import { IoMdAnalytics } from "react-icons/io";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { TbDeviceAnalytics } from "react-icons/tb";
import { IoIosNotifications } from "react-icons/io";
import { FaUsersViewfinder } from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";


const ServicePage = () => {
  return (
    <div className="services" >
       <>
  <div className="service-header">
      <h1 className='hover'>Our Services</h1>
      <hr className="servicehr" />
  </div>
  <div className="service-main">
    <div className="service">
      <FaVideo size={60}/>
      <h2>Pre Trial Conference</h2>
      <p>Benefit from virtual pre-trial consultations with our legal experts.</p>
    </div>

    <div className="service">
      <IoMdAnalytics size={60}/>
     <h2>Case Tracking</h2>
      <p>Keep tabs on the progress of your case with our advanced case tracking system.</p>
    </div>

    <div className="service">
      <IoChatbubbleEllipses size={60}/>
      <h2>Users communication</h2>
      <p>Seamless communication among clients, judges, and advocates for a transparent legal process.</p>
    </div>

    <div className="service">
      <TbDeviceAnalytics size={60}/>
      <h2>Case Analysis</h2>
      <p>Receive in-depth analysis of your case to make informed decisions.</p>
    </div>

    {/* <div className="service">
      <IoIosNotifications size={60}/>
       <h2>Notifications</h2>
      <p>Stay updated with timely notifications about your case.</p>
    </div> */}

    <div className="service">
      <FaUsersViewfinder size={60}/>
      <h2>Choose Advocates</h2>
      <p>Explore and select the advocate that best fits your legal needs.</p>
    </div>

    <div className="service">
      <FaFileAlt size={60}/>
      <h2>Case Filing</h2>
     <p>Effortlessly file your case using our user-friendly platform.</p>
    </div>
  </div>
    </>
    </div>
  );
};

export default ServicePage;
