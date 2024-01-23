import React, { useState } from "react";
import { IoIosContact } from "react-icons/io";
import { MdMenu } from "react-icons/md";
import "./Navbar.css";
import { Link } from "react-scroll";
import { FaArrowRight } from "react-icons/fa6";
import { Link as UnScrollLink } from "react-router-dom";
import { LuHome } from "react-icons/lu";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(true);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <>
      <nav className={`main-nav ${isMobileMenuOpen ? "mobile-menu-open" : ""}`}>
        <div className="logo-container">
          <span className="logo">E-PORTAL.</span>
          <div className="mobile-icon" onClick={toggleMobileMenu}>
            <MdMenu size={28} />
          </div>
        </div>
        <div>
        <ul className={isMobileMenuOpen ? "open" : ""}>
          <li>
            <Link to="home" spy={true} smooth={true} duration={500} className="h">
              <LuHome size={25} style={{ verticalAlign: "sub",paddingRight:"3px" }} /> Home
            </Link>
          </li>
          <li>
            <Link to="services" spy={true} smooth={true} duration={500} className="h">
              Legal Services
            </Link>
          </li>
          <li>
            <Link to="contact" spy={true} smooth={true} duration={500} className="h">
              Contact Us
            </Link>
          </li>
          <li className="login-button">
            <UnScrollLink to="/login" style={{ textDecoration: "none" }} className="hl">
              <IoIosContact size={22} style={{ verticalAlign: "sub" }} />
              Login/Register <FaArrowRight size={22} style={{paddingLeft:"10px"}}/>
            </UnScrollLink>
          </li>
        </ul>
        </div>
      </nav>
    </>
  );
};
