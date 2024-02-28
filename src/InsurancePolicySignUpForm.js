import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid } from '@mui/material';
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
            type="date"
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
            type="date"
            fullWidth
            value={formData.endDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <TextField
            margin="dense"
            name="coverageType"
            label="Coverage Type"
            type="text"
            fullWidth
            value={formData.coverageType}
            onChange={handleChange}
            required
          />
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
