import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Grid, TextField, Button } from '@mui/material';
import MuiNavbar from './MuiNavbar';

const ClaimForm = () => {
  const generatedClaimNumber = Math.floor(100000 + Math.random() * 900000);
  const customerName = sessionStorage.getItem("Email");
  const nameParts = customerName ? customerName.split("@") : [];
  const customerNameBeforeAtSymbol = nameParts.length > 0 ? nameParts[0] : "";
  const generatedReportNum = `${customerNameBeforeAtSymbol}-${generatedClaimNumber}`;

  const [claim, setClaim] = useState({
    policyId: localStorage.getItem("policyId"),
    customerId: sessionStorage.getItem("Id"),
    claimNumber: generatedClaimNumber.toString(),
    claimAmount: '',
    submissionDate: '',
    accidentDate: '',
    accidentLocation: '',
    description: '',
    reportNum: generatedReportNum,
    claimStatus: false
  });
  
  const [file, setFile] = useState(null); // State to hold the selected file
  const navigate = useNavigate();

  const handleChange = (e) => {
    setClaim({ ...claim, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Update file state with the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const formattedSubmissionDate = currentDate.toISOString();

    const newClaim = {
      ...claim,
      submissionDate: formattedSubmissionDate
    };

    try {
      const formData = new FormData();
      formData.append('file', file); // Append the file to FormData

      // Append other claim data to FormData
      Object.entries(newClaim).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.post(`https://localhost:7300/api/Claims`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Claim submitted successfully:', response.data);
      navigate('/landingpage');

      // Reset form fields and file state after successful submission
      setClaim({
        policyId: localStorage.getItem("policyId"),
        customerId: sessionStorage.getItem("Id"),
        claimNumber: generatedClaimNumber.toString(),
        claimAmount: '',
        submissionDate: '',
        accidentDate: '',
        accidentLocation: '',
        description: '',
        reportNum: generatedReportNum,
        claimStatus: false
      });
      setFile(null);
    } catch (error) {
      console.error('Error submitting claim:', error);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh', backgroundImage: `url('https://th.bing.com/th?id=OIP._XrtfyQpQW2Qigk_fQoHsgHaGq&w=263&h=237&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
      <MuiNavbar />
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Card style={{ textAlign: 'center', padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Claim Number"
                name="claimNumber"
                value={claim.claimNumber}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                InputProps={{ readOnly: true }}
                style={{ marginBottom: '20px' }}
              />
             <TextField
                label="Accident Date"
                type="date"
                name="accidentDate"
                value={claim.accidentDate}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                InputLabelProps={{ shrink: true }} // Keep the label from collapsing
                style={{ marginBottom: '20px' }}
              />
              <TextField
                label="Accident Location"
                name="accidentLocation"
                value={claim.accidentLocation}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                style={{ marginBottom: '20px' }}
              />
              <TextField
                label="Description"
                name="description"
                value={claim.description}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                multiline
                rows={4}
                style={{ marginBottom: '20px' }}
              />
              <TextField
                label="Claim Amount"
                name="claimAmount"
                value={claim.claimAmount}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                style={{ marginBottom: '20px' }}
              />
              <TextField
                label="Report Number"
                name="reportNum"
                value={claim.reportNum}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                InputProps={{ readOnly: true }}
                style={{ marginBottom: '20px' }}
              />
              <input
                type="file"
                accept=".pdf" // Allow only PDF files
                onChange={handleFileChange}
                style={{ marginBottom: '20px' }}
              />
              <br/>
              <Button type="submit" variant="contained" color="primary">
                Submit Claim
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ClaimForm;
