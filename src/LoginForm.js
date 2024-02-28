import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { GrUserNew } from "react-icons/gr";
import { json, useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import { RiMotorbikeFill } from "react-icons/ri";




  function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    let navigate=useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const data = { email, password };
        const response = await fetch(`https://localhost:7300/api/Login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if(response.ok)
        {
          const reply=await response.json();
          console.log(reply.id);
          console.log('Token:', reply.token);
        console.log('Role:', reply.role);  
        sessionStorage.setItem("Id",reply.id);
        
        navigate('/landingpage');
        
        }
        else {
          setLoginError('Incorrect credentials. Please provide correct credentials.');
        }
        
       
        // Handle token and role as needed, such as storing them in localStorage
      } catch (error) {
        console.error('Login failed:', error);
        // Handle login failure, such as showing an error message to the user
      }
    };
    return (
      <MDBContainer fluid style={{ backgroundImage: `url('https://www.cloud4c.com/sites/default/files/2023-12/Insurance-in-a-box-banner.webp')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100vh' }}>
     
  
        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol col='12'>
  
            <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px', backgroundImage: `url('https://www.cloud4c.com/sites/default/files/2023-12/Insurance-in-a-box-banner.webp')`}}>
              <MDBCardBody className='p-5 w-100 d-flex flex-column'>
  
                <h2 className="fw-bold mb-2 text-center" style={{color:"white"}}><RiMotorbikeFill />ClaimPro</h2>
                {loginError && <marquee style={{ color: 'red' }}>{loginError}</marquee>}
           
                <p className="text-white-50 mb-3" style={{color:"white"}}>Please enter your login and password!</p>
  
                <form onSubmit={handleSubmit}>
                  <MDBInput wrapperClass='mb-4 w-100' label='Email address'  labelClass="text-white" id='formControlLg' type='email' size="lg" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                  <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg' labelClass="text-white" type='password' size="lg" value={password} onChange={(e) => setPassword(e.target.value)} required />
  
                  <button type="submit" className='btn btn-primary'  >Login</button>
                </form>
  
                <hr className="my-4" />
              
                <p style={{color:"white"}}>Don't have an account? <a href="/signup">Signup</a></p>
  
              </MDBCardBody>
            </MDBCard>
  
          </MDBCol>
        </MDBRow>
  
      </MDBContainer>
    );
}

export default LoginForm;
/* <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' />
<GrUserNew /> */