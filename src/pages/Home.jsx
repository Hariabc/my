import React from 'react'
import "./home.css"
import ContactUs from './contact'
import {FaArrowRight }from "react-icons/fa"
import ServicePage from './service'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
export default function Home() {
  return (
    <>
    <Navbar/>
    <div className="about">
    <h1 style={{color:"white"}}>Bringing Efficiency to <span className='justice'>JUSTICE</span></h1>
    <hr className="horizontal-line" />
    <p>Our court website is here to make life easier for clients, judges, and advocates. With user-friendly features, we simplify processes, foster collaboration, and enhance the overall efficiency of legal work. Experience a smoother journey in the pursuit of justice with us.</p>
    <button className="explore-button">
      <Link to={"/services"}> Explore </Link>
      <FaArrowRight className="arrow-icon" />
    </button>
    </div>
    <ServicePage/>
    <ContactUs/>
    </>
  )
}
