import React from 'react'
import Homebg from "./home-background.png"
import "./home.css"

export default function Home() {
  return (

    <div className="home-container">
      <div className="main-home">
        <div className="text-section">
        <img src={Homebg} alt="" />
        </div>
        <div className="image-section">

        </div>
      </div>
    </div>
  )
}
