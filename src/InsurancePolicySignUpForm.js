
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, MenuItem, Select, InputLabel } from '@mui/material';
import MuiNavbar from './MuiNavbar';
import { useNavigate } from 'react-router-dom';

const InsurancePolicySignUpForm = () => {
  const [formData, setFormData] = useState({
    policyId: 0,
    vehicleId: localStorage.getItem("vehicleId"),
    policyNum: '',
    startDate: null,
    endDate: null,
    coverageType: '',
    policyAmount: ''
  });
  const [error, setError] = useState('');
  const navigate=useNavigate();
  const currentYear = new Date().getFullYear();
const nextYear = currentYear + 1;

const calculateMonths = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  return `${months} months`;
};

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    let errorMessage = '';
  
    if (name === 'policyNum' && !/^[a-zA-Z0-9]{0,6}$/.test(value)) {
      errorMessage = 'Policy number must be alphanumeric and exactly 6 characters long.';
    }
  
    if (name === 'policyAmount') {
      const amount = parseFloat(value);
  
      if (isNaN(amount) || amount < 500 || amount > 5000) {
        errorMessage = 'Policy amount must be a number between 500 and 5000.';
      }
    }
  
    // Set the error message
    setError(errorMessage);
  
    // Update the form data
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://localhost:7300/api/InsurancePolicies/ByVehicleId/${localStorage.getItem("vehicleId")} `, formData);
      console.log(response.data);
      navigate('/landingpage');
    } catch (error) {
      console.error('Error:', error.response.data);
      setError('Failed to submit insurance policy details.');
    }
  };

  return (
    <Grid container justifyContent="center" style={{ height: '100vh',backgroundImage: `url('https://th.bing.com/th?id=OIP._XrtfyQpQW2Qigk_fQoHsgHaGq&w=263&h=237&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
      <Grid item xs={10} sm={8} md={6}>
        <MuiNavbar />
        
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <TextField
            margin="dense"
            name="policyNum"
            label="Policy Number"
            type="text"
            fullWidth
            value={formData.policyNum}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="startDate"
            label="Start Date"
            type="date"
            fullWidth
            value={formData.startDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: new Date().toISOString().split('T')[0], // Set min to current date
            }}
            required
          />
          
          <TextField
            margin="dense"
            name="endDate"
            label="End Date"
            type="date"
            fullWidth
            value={formData.endDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: `${nextYear}-01-01`, // Set min to the next year
            }}
            required
          />
         
          <TextField
            margin="dense"
            name="noofyears"
            label="Duration"
            type="text"
            fullWidth
            value={calculateMonths(formData.startDate, formData.endDate)}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
           readonly
          />
           <InputLabel id="coverage-type-label">Coverage Type</InputLabel>
          <Select
            labelId="coverage-type-label"
            id="coverage-type"
            name="coverageType"
            value={formData.coverageType}
            onChange={handleChange}
            fullWidth
            required
          >
            <MenuItem value="Liability">Liability</MenuItem>
            <MenuItem value="Collision">Collision</MenuItem>
            <MenuItem value="Comprehensive">Comprehensive</MenuItem>
            <MenuItem value="Personal Injury Protection">Personal Injury Protection</MenuItem>
            <MenuItem value="Uninsured/Underinsured Motorist">Uninsured/Underinsured Motorist</MenuItem>
            {/* Add more coverage types as needed */}
          </Select>
          <TextField
            margin="dense"
            name="policyAmount"
            label="Policy Amount"
            type="text"
            fullWidth
            value={formData.policyAmount}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default InsurancePolicySignUpForm;
