import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import { Navbar } from './Navbar'
import Home from '../pages/Home'
import ContactUs from '../pages/contact'
import ServicePage from '../pages/service'
import {motion,useScroll} from 'framer-motion'

export default function Layout() {
  const {scrollYProgress}=useScroll()
  return (
    <>
    <motion.div
        style={{
          scaleX: scrollYProgress,
          position: 'fixed',
          top: 0,
          right: null, // Set to null to cover the right edge
          left: null, // Set to null to cover the left edge
          width: '100%', // Cover the full width of the screen
          height: 4,
          transformOrigin: '0% 0%',
          backgroundColor: 'black',
          zIndex:"9999"
        }}
      ></motion.div>
    {/* <Navbar/> */}
    {/* <Home/> */}
    <Outlet/>
    {/* <Footer/> */}
    </>
  )
}
