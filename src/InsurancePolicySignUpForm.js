import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid, Select, MenuItem, InputLabel } from '@mui/material';

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

  const handleChange = (e) => {
    
    const { name, value } = e.target;
   
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://localhost:7300/api/InsurancePolicies/ByVehicleId?vehicleId=${localStorage.getItem("vehicleId")}`, formData);
      console.log(response.data);
      navigate('/landingpage');
    } catch (error) {
      console.error('Error:', error.response.data);
      setError('Failed to submit insurance policy details.');
    }
  };

  return (
    <div style={{ backgroundImage: `url('https://th.bing.com/th?id=OIP._XrtfyQpQW2Qigk_fQoHsgHaGq&w=263&h=237&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',paddingTop:'10px' }}>
      
    <Grid container justifyContent="center">
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
            type="datetime-local"
            fullWidth
            value={formData.startDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <TextField
            margin="dense"
            name="endDate"
            label="End Date"
            type="datetime-local"
            fullWidth
            value={formData.endDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          {/* <TextField
            margin="dense"
            name="coverageType"
            label="Coverage Type"
            type="text"
            fullWidth
            value={formData.coverageType}
            onChange={handleChange}
            required
          /> */}
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
            <MenuItem value="Comprehensive">Comprehensive</MenuItem>
            <MenuItem value="Third Party Liability">Third Party Liability</MenuItem>
            <MenuItem value="Collision">Collision</MenuItem>
            <MenuItem value="Personal Injury Protection">Personal Injury Protection(PIP)</MenuItem>
            {/* Add more coverage types as needed */}
          </Select>
          <TextField
            margin="dense"
            name="policyAmount"
            label="Policy Amount"
            type="number"
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
    </div>
  );
};

export default InsurancePolicySignUpForm;
