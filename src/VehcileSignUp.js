import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const VehicleSignUpForm = () => {
  const [formData, setFormData] = useState({
    vehicleId: 0,
    CustomerId: sessionStorage.getItem("Id"),
    vehicleName: '',
    registerNum: '',
    vehicleModel: '',
    registerDate: null,
    mfgYear: null,
    file: null

  });
  const navigate =useNavigate();
  const [error, setError] = useState('');


  const handleChange = (e) => {
    const { name,value ,files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'isAdmin' ? e.target.checked : value,
      file: name === 'file' ? files[0] : prevState.file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.file || formData.file.type !== 'application/pdf') {
        setError('Please upload a PDF file for the vehicle document.');
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append('vehicleId',formData.vehicleId);
      formDataToSend.append('customerId', formData.CustomerId);
      formDataToSend.append('vehicleName', formData.vehicleName);
      formDataToSend.append('registerNum', formData.registerNum);
      formDataToSend.append('vehicleModel', formData.vehicleModel);
      formDataToSend.append('registerDate', formData.registerDate);
      formDataToSend.append('mfgYear', formData.mfgYear);
 
      formDataToSend.append('file', formData.file);

      console.log('FormData:', formDataToSend);

      const response = await axios.post('https://localhost:7300/api/Vehicles', formDataToSend);
      console.log(response.data);
    
      navigate('/policy')
    } catch (error) {
      console.error('Error:', error.response.data);
      setError('Failed to submit vehicle details.');
    }
  };
  

  return (
    <div>
    
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <TextField
          margin="dense"
          name="vehicleName"
          label="Vehicle Name"
          type="text"
          fullWidth
          value={formData.vehicleName}
          onChange={handleChange}
          required
        />
        <TextField
          margin="dense"
          name="registerNum"
          label="Register Number"
          type="text"
          fullWidth
          value={formData.registerNum}
          onChange={handleChange}
          required
        />
        <TextField
          margin="dense"
          name="vehicleModel"
          label="Vehicle Model"
          type="text"
          fullWidth
          value={formData.vehicleModel}
          onChange={handleChange}
          required
        />
        <TextField
          margin="dense"
          name="registerDate"
          label="Register Date"
          type="date"
          fullWidth
          value={formData.registerDate}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        <TextField
          margin="dense"
          name="mfgYear"
          label="Manufacturing Year"
          type="date"
          fullWidth
          value={formData.mfgYear}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          required
        />
        <label>
          Upload File (PDF):
          <input type="file" name="file" onChange={handleChange} accept=".pdf" />
        </label>
        <br />
        <Button type="submit" variant="contained" color="primary">
          Next
        </Button>
      </form>
    </div>
  );
};

export default VehicleSignUpForm;
