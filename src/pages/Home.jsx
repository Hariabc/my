import React from 'react';
import oip from '../pages/OIP.jpeg';
import './Home.css'; // Assuming you have a separate CSS file for styling
import ChatComponent from '../components/Message';
/*import fontawesome from "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"*/
export default function Home() {
  return (
    <>  
      <div>
        <div className="image-div">
        <div>
           <img src="https://c4.wallpaperflare.com/wallpaper/34/747/591/man-made-scales-wallpaper-preview.jpg" className="image1"/>
        </div>
        <div className="img-btn-div1">
        <div className="img-btn-div">
        <h3 className="image-text">Justice Delayed is Justice Denied</h3>
        <h1> Welcome to E-Portal</h1>
        <button class="btn-explore">Explore</button>
        </div>
        </div>
      </div>
        </div>
        <div className="boxes">
          <div className="box1">
             <h2>Pending cases 10.4M</h2>
          </div>
          <div className="box2">
             <h2>Disposed 10.4M</h2> 
          </div>
          <div className="box3">
             <h2>cases list today 10.4M</h2>
          </div>
          <div className="box4">
             <h2>Number of cases 10.4M</h2>
          </div>
          <div className="box5">
             <h2>District and Taluka court 10.4M</h2>
          </div>
        </div>
        <div className="ourservices-div">
          <h1><a href="#" className="services-a">Our Services</a></h1>
        </div>
        <div className="ourservicesDiv">
            <div className="s-1">
                <h2 className="s-h2">Cause List</h2>
                <i></i>
            </div>
            <div className="s-2">
                <h2 className="s-h2">Cause List</h2>
            </div>
            <div className="s-3">
                <h2 className="s-h2">Cause List</h2>
            </div>
        </div>
        <div className="footer-div">

        </div>
    </>
  );
}
