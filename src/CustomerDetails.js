import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MuiNavbar from './MuiNavbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { RiUserFill } from 'react-icons/ri'; 

const CustomerDetails = () => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [editMode, setEditMode] = useState(false);
  const [updatedCustomer, setUpdatedCustomer] = useState(null);
  const [file, setFile] = useState(null);
  const id = sessionStorage.getItem("Id");

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch(`https://localhost:7300/api/Customers/${id}`); 
        if(response.ok) { 
          const data = await response.json();
          console.log(data);
          setCustomer(data);
        }
        setLoading(false);
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
      }
    };

    fetchCustomer();
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
    setUpdatedCustomer({ ...customer });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCustomer({ ...updatedCustomer, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setUpdatedCustomer(null);
  };

  const handleSaveClick = async () => {
    try {
      const formData = new FormData();
      
      // Append other customer data fields to the FormData object
      formData.append('customerName', updatedCustomer.customerName);
      formData.append('email', updatedCustomer.email);
      formData.append('password', updatedCustomer.password);
      formData.append("isAdmin",updatedCustomer.isAdmin);
      formData.append('gender', updatedCustomer.gender);
      formData.append('phone', updatedCustomer.phone);
      formData.append('address', updatedCustomer.address);
      formData.append('aadharNum', updatedCustomer.aadharNum);
      formData.append('file', file);
  
      const response = await fetch(`https://localhost:7300/api/Customers/${id}`, {
        method: 'PUT',
        body: formData,
      });
  
      if (response.status === 204) {
        setCustomer(updatedCustomer);
        setEditMode(false);
      } else {
        const errorMessage = await response.text();
        throw new Error(`Failed to update customer: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error updating customer:", error);
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!customer) {
    return <div>Customer not found</div>;
  }

  return (
    <div style={{ backgroundImage: `url('https://th.bing.com/th?id=OIP._XrtfyQpQW2Qigk_fQoHsgHaGq&w=263&h=237&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <MuiNavbar />
      
      <Card variant="outlined" style={{ width: '600px',backgroundImage:`url('https://www.superstock.com/cdn/1525/Comp/1525-26324284.webp')`,overflowY:'hidden', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
   
        
        <CardContent style={{fontSize:'40px'}}>
       
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {editMode ? (
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    name="customerName"
                    label="Name"
                    value={updatedCustomer.customerName}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="email"
                    label="Email"
                    value={updatedCustomer.email}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="password"
                    label="Password"
                    type="password"
                    value={updatedCustomer.password}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="gender"
                    label="Gender"
                    value={updatedCustomer.gender}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="phone"
                    label="Phone"
                    value={updatedCustomer.phone}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="address"
                    label="Address"
                    value={updatedCustomer.address}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="aadharNum"
                    label="Aadhar Number"
                    value={updatedCustomer.aadharNum}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <input type="file" onChange={handleFileChange} />
                </Grid>
              </Grid>
            ) : (
              <div>
                <div style={{fontSize:'25px',fontWeight:'bold'}}>{customer.customerName}</div>
                <div style={{fontSize:'20px'}}>Email: {customer.email}</div>
                <div style={{fontSize:'20px'}}>Password: ******</div>
                <div style={{fontSize:'20px'}}>Gender: {customer.gender}</div>
                <div style={{fontSize:'20px'}}>Phone: {customer.phone}</div>
                <div style={{fontSize:'20px'}}>Address: {customer.address}</div>
                <div style={{fontSize:'20px'}}>
                  Aadhar Number: 
                  <a href={`https://localhost:7300/api/Customers/ViewFile/${customer.aadharNum}`} target="_blank" rel="noopener noreferrer">
                  View file
                  </a>
                </div>
              </div>
            )}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {editMode ? (
              <div>
                <Button variant="contained" onClick={handleSaveClick} style={{ marginRight: '8px' }}>Save</Button> 
                <Button variant="contained" onClick={handleCancelClick}>Cancel</Button>
              </div>
            ) : (
              <div>
                <Button variant="contained" onClick={handleEditClick}>Edit</Button>
              </div>
            )}
          </Typography>
          
        </CardContent>
      
      </Card>
    </div>
  );
};

export default CustomerDetails;
