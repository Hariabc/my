import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { IoIosContact } from "react-icons/io";
import { MdMenu } from "react-icons/md";
import "./Navbar.css";
import { Link } from "react-scroll";
import { FaArrowRight } from "react-icons/fa6";
import { Link as UnScrollLink } from "react-router-dom";



export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className={`main-nav ${isMobileMenuOpen ? "mobile-menu-open" : ""}`}>
        <div className="logo-container">
          <span className="logo">E-PORTAL</span>
          <div className="mobile-icon" onClick={toggleMobileMenu}>
            <MdMenu size={28} />
          </div>
        </div>
        <ul className={isMobileMenuOpen ? "open" : ""}>
          <li>
            <Link to="top" spy={true} smooth={true} offset={50} duration={500}>
              <FaHome size={20} style={{ verticalAlign: "sub" }} /> Home
            </Link>
          </li>
          <li>
            <Link to="services" spy={true} smooth={true} offset={50} duration={500}>
              Legal Services
            </Link>
          </li>
          <li>
            <Link to="contact" spy={true} smooth={true} offset={50} duration={500}>
              Contact Us
            </Link>
          </li>
          <li className="login-button">
            <UnScrollLink to="/login" style={{ textDecoration: "none" }}>
              <IoIosContact size={22} style={{ verticalAlign: "sub" }} />
              Login/Register <FaArrowRight size={22} style={{paddingLeft:"10px"}}/>
            </UnScrollLink>
          </li>
        </ul>
      </nav>
    </>
  );
};
