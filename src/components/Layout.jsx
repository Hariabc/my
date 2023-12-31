import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import { Navbar } from './Navbar'
import Home from '../pages/Home'
import ContactUs from '../pages/contact'
import ServicePage from '../pages/service'
export default function Layout() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    {/* <Footer/> */}
    </>
  )
}
