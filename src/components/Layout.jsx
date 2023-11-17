import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from "./Footer"
import Header from './Header'
import { Navbar } from './Navbar'
export default function Layout() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    {/* <Footer/> */}
    </>
  )
}
