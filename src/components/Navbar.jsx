import React from "react";
import { FaHome } from "react-icons/fa"; 
import {IoIosContact} from "react-icons/io"
import "./Navbar.css";

export const Navbar = () => {
  return (
    <>
      <nav className="main-nav">
        <span className="logo">E-PORTAL</span>
        <ul>
          <li>
            <a href="" >
              <FaHome size={22} style={{verticalAlign:"sub"}}/> Home
            </a>
          </li>
          <li>
            <a href="">About Us</a>
          </li>
          <li>
            <a href="">Legal Services</a>
          </li>
          <li>
            <a href="">Contact Us</a>
          </li>
          <li>
            <a href=""><IoIosContact size={22} style={{verticalAlign:"sub"}}/>Login/Register
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};
