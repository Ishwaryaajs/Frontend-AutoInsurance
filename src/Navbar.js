import React from 'react'
import { useNavigate ,Link} from 'react-router-dom'
import { RiMotorbikeFill } from "react-icons/ri";
import './Navbar.css';
function Navbar() {
  const navigate = useNavigate();
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#" style={{color:"blue", fontWeight:"bolder"}}><RiMotorbikeFill /> ClaimPro</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
     
  
      <form class="d-flex" role="search">
      <Link to="/login"  style={{ position: "absolute", left: "85vw", top: "15px" }}>Login</Link>
  <Link to="/signup"  style={{ position: "absolute", left: "90vw", top: "15px" }}>Signup</Link>
</form>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar
