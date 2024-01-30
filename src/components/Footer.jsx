import React from 'react';
import './Footer.css';
import { Link } from 'react-scroll';

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
              <li style={{paddingRight:"30px"}}><Link to="about" spy={true} smooth={true} duration={500} className="h">Home</Link></li>
              <li style={{paddingRight:"30px"}}><Link to="contact" spy={true} smooth={true}  duration={500} className="h">Contact Us</Link></li>
              <li style={{paddingRight:"30px"}}><Link to="services" spy={true} smooth={true}  duration={500} className="h">Services</Link></li>
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
