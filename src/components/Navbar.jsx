import React from "react";
import { FaHome } from "react-icons/fa"; 
import {IoIosContact} from "react-icons/io"
import "./Navbar.css";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <nav className="main-nav">
        <span className="logo">E-PORTAL</span>
        <ul>
          <li>
            <Link to="">
              <FaHome size={22} style={{verticalAlign:"sub"}}/> Home
            </Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/services">Legal Services</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/login" style={{textDecoration:"none"}}><IoIosContact size={22} style={{verticalAlign:"sub"}}/>Login/Register
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
