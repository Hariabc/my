import React from 'react'
import { BiError } from "react-icons/bi";
import { TbError404 } from "react-icons/tb";
import { TiArrowForward } from "react-icons/ti";
import { Link } from 'react-router-dom';
export default function ErrorPage() {
    const styles = {
        background: "linear-gradient(91.3deg, rgb(135, 174, 220) 1.5%, rgb(255, 255, 255) 100.3%)",
        height:'100vh'
    };
  return (
    <>
    <div className="error-container" style={styles}>
        <BiError style={{position:"absolute", top:"10%",left:"10%"}} size={50}/>
        <TbError404 style={{position:"absolute", bottom:"40%",right:"10%"}} size={50}/>
        <h1 style={{fontSize:"300px",textAlign:"center"}}>Oops...!</h1>
        <h1 style={{textAlign:"center"}}>Page Not Found</h1>
        <h3 class="subheading">Looks like the page you were looking for is no longer here.</h3>
        <h3 style={{textAlign:"center"}}>Redirect to<Link to="/"><span><button style={{backgroundColor:"#f95959",width:"auto"}}>Home<TiArrowForward size={25} style={{verticalAlign:'sub'}}/></button></span></Link></h3>
    </div>  
</>)
}
