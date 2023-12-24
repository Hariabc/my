import React from 'react'
import "./about.css"
import ContactUs from './contact'

export default function About() {
  return (
    <>
    <div className="about">
    <h1>Bringing Efficiency to <span className='justice'>JUSTICE</span></h1>
    <hr /><br />
    <p>Our court website is here to make life easier for clients, judges, and advocates. With user-friendly features, we simplify processes, foster collaboration, and enhance the overall efficiency of legal work. Experience a smoother journey in the pursuit of justice with us.</p>
    </div>
    <h1>About Our Website</h1>
    <ContactUs/>
    </>
  )
}
