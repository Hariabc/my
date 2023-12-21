import React from 'react'
import LoginPage from './login'
import "./login-layout.css"

export default function Loginlaylout() {
  return (
    <div className="main-login-layout">
        <div className="left-section slanted-divider">
          <div className="decor">
          </div>
            <div className="text">
            <h1>E-portal</h1>
              <h3>
                hello welcome 
              </h3>
            </div>
        </div>
        <div className="left">
            <LoginPage/>
        </div>
    </div>
  )
}
