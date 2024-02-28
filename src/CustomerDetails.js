import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MuiNavbar from './MuiNavbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

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
      formData.append('file', file); // Append file to the FormData
      formData.append('customer', JSON.stringify(updatedCustomer));
  
      // const response = await axios.put(`https://localhost:7300/api/Customers/${id}`, formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // }); 

      const response=await fetch(`https://localhost:7300/api/Customers/${id}`,{
        method:'PUT',
        headers: {
              'Content-Type': 'multipart/form-data'
            },
            body:JSON.stringify(formData),

      })
  
      if (response.status === 204) {
        setCustomer(updatedCustomer);
        setEditMode(false);
      }
    } catch (error) {
      console.error("Error updating customer:", error);
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
    <div style={{ display: 'flex',position:'absolute', justifyContent: 'center', alignItems: 'center', height: '90vh', marginLeft: '300px' ,paddingTop:'160px'}}>
      <MuiNavbar />
      <Card variant="outlined" style={{ width: '400px',position:"absolute", top:"15vh",left:"17vw" }}>
        <CardContent>
         
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
                <div>Name: {customer.customerName}</div>
                <div>Email: {customer.email}</div>
                <div>Password: ******</div>
                <div>Gender: {customer.gender}</div>
                <div>Phone: {customer.phone}</div>
                <div>Address: {customer.address}</div>
                <div>
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
                <Button variant="contained" className='btn btn-danger' onClick={handleCancelClick}>Cancel</Button>
              </div>
            ) : (
              <div>
                <br/>
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
