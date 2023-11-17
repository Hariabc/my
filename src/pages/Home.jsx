import React from 'react';
import oip from '../pages/OIP.jpeg';
import './Home.css'; // Assuming you have a separate CSS file for styling

export default function Home() {
  return (
    <>
      <div className="home-container">
        <div className="centered-content">
          <img src={oip} alt="Description of the image" className="centered-image" />
          <div className="text-and-button">
            <h1>Unlocking Justice Online</h1> 
            <h3> Hello</h3>
            <p>Your digital path to seamless legal solutions</p>
            <button>Explore</button>
          </div>
        </div>
      </div>

      <div class="marque-div">
        <p class="marque-p">Latest News:</p>
      </div>

      <div class="boxes-div">
        {/* Your existing boxes-div content */}
        <div class="box1">
          <h4 class="box-header">Number of Wards</h4>
          <h4 class="box-header">2 M</h4>
        </div>
        <div class="box2">
          <h4 class="box-header">Number of Cases</h4>
          <h4 class="box-header">20 M</h4>
        </div>
        <div class="box3">
          <h4 class="box-header">Disposed Cases</h4>
          <h4 class="box-header">40 M</h4>
        </div>
        <div class="box4">
          <h4 class="box-header">Number of Cases in Last Month</h4>
          <h4 class="box-header">1.21 M</h4>
        </div>
        <div class="box5">
          <h4 class="box-header">Number of Cases Listed Today</h4>
          <h4 class="box-header">65.84 K</h4>
        </div>
        <div class="box6">
          <h4 class="box-header">High Court Complexes</h4>
          <h4 class="box-header">39</h4>
        </div>
        {/* End of existing content */}
      </div>

      <div class="services-div">
        <h2 class="services-header">Our Services</h2>
      </div>

      <div class="service-div2">
        <div class="services-div1">
          <div class="service-div">
            <h4 class="box-header">Case Status</h4>
          </div>
          <div class="service-div">
            <h4 class="box-header">Cause List</h4>
          </div>
          <div class="service-div">
            <h4 class="box-header">e-Judgement</h4>
          </div>
        </div>
      </div>

    </>
  );
}
