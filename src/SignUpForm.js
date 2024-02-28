import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RiMotorbikeFill } from "react-icons/ri";
import './SignUpForm.css'; // Import your CSS file for styling

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    customerID: 0,
    customerName: '',
    email: '',
    password: '',
    isAdmin: false,
    gender: 'male', // Default to male
    phone: '',
    address: '',
    file: null
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'phone' && value === '' && formData.phone.length > 0) {
      // Remove the last digit from the phone number
      const updatedPhone = formData.phone.slice(0, -1);
      setFormData(prevState => ({
        ...prevState,
        phone: updatedPhone
      }));
      return;
    }
  
    // Phone number validation (starts with 6, 7, 8, or 9)
    if (name === 'phone' && !/^[6-9]/.test(value)) {
      setError('Mobile number should start from 6, 7, 8, or 9.');
      return;
    }
  
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'isAdmin' ? e.target.checked : value,
      file: name === 'file' ? files[0] : prevState.file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Email validation
      const emailPattern = /^\S+@\S+\.\S+$/;
      if (!emailPattern.test(formData.email)) {
        setError('Please enter a valid email address.');
        return;
      }
    
      // Phone number validation (assuming 10-digit number)
      const phonePattern = /^\d{10}$/;
      if (!phonePattern.test(formData.phone)) {
        setError('Please enter a valid 10-digit phone number.');
        return;
      }
    
      if (!formData.file || formData.file.type !== 'application/pdf') {
        setError('Please upload a PDF file.');
        return;
      }
    
      // Check if email already exists
      const emailExistsResponse = await axios.post(`https://localhost:7300/api/Customers/CheckEmailExists?email=${formData.email}`);
      
      // If email exists, display an error
      if (emailExistsResponse.data === 1) {
        setError('Email already exists.');
        return;
      }
    
      // If email does not exist, proceed with signup
      const formDataToSend = new FormData();
      formDataToSend.append('customerID', formData.customerID);
      formDataToSend.append('customerName', formData.customerName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('isAdmin', formData.isAdmin);
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('file', formData.file);
    
      const response = await axios.post('https://localhost:7300/api/Customers', formDataToSend);
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.error('Error:', error.response.data);
    }
  };
  

  return (
    <div className="container">
      <div className="slider">
        <img src="https://media.istockphoto.com/id/856956280/photo/car-insurance-concept.jpg?s=612x612&w=0&k=20&c=DQcgaTo9i9pOQraSlkZU9To4oabaEGyZip5Aks-w568=" alt="Slider Image 1" />
      </div>
      <div className="card">
        <div className="signup-container">
          <h2>Welcome to ClaimPro <RiMotorbikeFill /></h2>
          {error && <div className="error">{error}</div>}
          <form className="signup-form" onSubmit={handleSubmit}>
            <label className="form-label">
              Name:
              <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} className="form-input" required/>
            </label>
            <label className="form-label">
              Email:
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" required/>
            </label>
            <label className="form-label">
              Password:
              <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-input" required/>
            </label>
            <label className="form-label">
              Gender:
              <select name="gender" value={formData.gender} onChange={handleChange} className="form-input" required>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
            <label className="form-label">
              Phone:
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="form-input" maxLength={10} required />
            </label>
            <label className="form-label">
              Address:
              <input type="text" name="address" value={formData.address} onChange={handleChange} className="form-input" required/>
            </label>
            <label className="form-label">
              Upload Aadhar:
              <input type="file" name="file" onChange={handleChange} accept=".pdf" className="form-file" />
            </label>
            <button type="submit" className="submit-btn">SignUp</button>
          </form>
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
