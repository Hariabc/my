import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { IoIosContact } from "react-icons/io";
import { MdMenu } from "react-icons/md";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            <NavLink to="" 
             style={({ isActive }) => ({
                 color: isActive
                     ? "gold"
                     : "white",
             })}
            onClick={toggleMobileMenu}>
              <FaHome size={20} style={{ verticalAlign: "sub" }} /> Home
            </NavLink>
          </li>
          <li>
            <Link to="/about" onClick={toggleMobileMenu}>
              About Us
            </Link>
          </li>
          <li>
            <Link to="/services" onClick={toggleMobileMenu}>
              Legal Services
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={toggleMobileMenu}>
              Contact Us
            </Link>
          </li>
          <li>
            <Link to="/login" style={{ textDecoration: "none" }} onClick={toggleMobileMenu}>
              <IoIosContact size={22} style={{ verticalAlign: "sub" }} />
              Login/Register
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
