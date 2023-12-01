import React from 'react'
import judge from './judge.png';
import './Judgedashboard.css';
export default function Judgedashboard() {
  return (
    <>
    <div className="container"> 
    
     <div className="navbar"> 
     
     <p className='name'> JUDGE DASHBOARD </p>

      <Link> @Username </Link>
      
       <img src ={judge} className="user-logo" alt='judge-Logo'/>

     
     
     </div>
    
    
    </div>
    
    
    </>

    
  )
}
