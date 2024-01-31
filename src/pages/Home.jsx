import React from 'react'
import "./home.css"
import ContactUs from './contact'
import {FaArrowRight }from "react-icons/fa"
import ServicePage from './service'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Link as Abc} from "react-scroll";
import Footer from '../components/Footer'
import { Typography } from '@mui/material'
import { TypeAnimation } from 'react-type-animation';
export default function Home() {
  return (
    <>
    <div className="about">
    <Navbar/>
    <div className="main-about"> 
    <h1 style={{color:"white"}}>Bringing Efficiency to 
    {/* <span className='justice' style={{paddingLeft:"8px"}}>JUSTICE</span></h1> */}
    <span><Typography variant="h4" className="text-animation" style={{color:"white",fontWeight:"500",marginBottom:"0"}}>
        <TypeAnimation 
            sequence={[
                'Justice',
                 2000,
                 'Nyaya Vyavastha',
                 2000,
            ]}
            speed={20}
            repeat={Infinity}
        />
        </Typography>
        </span>
    </h1>
    <hr className="horizontal-line" />
    <p className='main-p'>Our court website is here to make life easier for clients, judges, and advocates. With <span class="highlight-text">user-friendly features</span>, we simplify processes, foster collaboration, and enhance the overall efficiency of legal work. Experience a smoother journey in the pursuit of justice with us.</p>
      <button className="explore-button" id="aaa">
      <Abc to="services" spy={true} smooth={true} offset={50} duration={500}> Explore </Abc>
      <FaArrowRight className="arrow-icon" />
    </button>
    </div>
    </div>
    <ServicePage/>
    <ContactUs/> 
     <Footer/>
    </>
  )
}
