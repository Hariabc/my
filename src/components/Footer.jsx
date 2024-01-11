import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="row">
          <div className="footer-col">
            <h1>E-PORTAL</h1>
          </div>
          <div className="footer-col">
            <h4>quick links</h4>
            <ul style={{
              display:"flex",
              flexDirection:"row",
              paddingRight:"20px"
            }}>
              <li style={{paddingRight:"30px"}}><a href="#">Home</a></li>
              <li style={{paddingRight:"30px"}}><a href="#">Contact Us</a></li>
              <li style={{paddingRight:"30px"}}><a href="#">Services</a></li>
              <li style={{paddingRight:"30px"}}><a href="#">Resources</a></li>
            </ul>
          </div>
        </div>
        <p style={{color:"white",margin:"0 auto",paddingTop:"20px"}}>&copy;2024 E-POTAL | All Rights Reserved</p>

      </div>
    </footer>
  );
}

export default Footer;
