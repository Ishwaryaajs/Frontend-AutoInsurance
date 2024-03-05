
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ClaimForm = () => {
  // Generate a 6-digit claim number
  const generatedClaimNumber = Math.floor(100000 + Math.random() * 900000);

  // Extract customer name from session storage email
  const customerName = sessionStorage.getItem("Email");
  const nameParts = customerName ? customerName.split("@") : [];
  const customerNameBeforeAtSymbol = nameParts.length > 0 ? nameParts[0] : "";
  
  // Concatenate customer name (before @ symbol) and claim number for report number
  const generatedReportNum = `${customerNameBeforeAtSymbol}-${generatedClaimNumber}`;

  const [claim, setClaim] = useState({
    policyId: localStorage.getItem("policyId"),
    customerId: sessionStorage.getItem("Id"),
    claimNumber: generatedClaimNumber.toString(),
    claimAmount:'',
    submissionDate: '',
    accidentDate: '',
    accidentLocation: '',
    description: '',
    reportNum: generatedReportNum, // Set the auto-generated report number here
    claimStatus: false
  });
  const navigate=useNavigate();

  const handleChange = (e) => {
    setClaim({ ...claim, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fill submissionDate with the current date and time
    const currentDate = new Date();
    const formattedSubmissionDate = currentDate.toISOString();

    const newClaim = {
      ...claim,
      submissionDate: formattedSubmissionDate
    };

    try {
      const response = await axios.post(`https://localhost:7300/api/Claims`, newClaim);
      console.log('Claim submitted successfully:', response.data);
      navigate('/landingpage');
      // Reset form fields except for the generated claim number and report number
      setClaim({
        ...claim,
        claimNumber: generatedClaimNumber.toString(),
        reportNum: generatedReportNum,
        submissionDate: formattedSubmissionDate,
        accidentDate: '',
        claimAmount:'',
        accidentLocation: '',
        description: '',
        claimStatus: false
      });
    } catch (error) {
      console.error('Error submitting claim:', error);
    }
  };

  return (
    <div>
      <h2>Submit a Claim</h2>
      <form onSubmit={handleSubmit}>
        <label>Claim Number:</label>
        <input type="text" name="claimNumber" value={claim.claimNumber} onChange={handleChange} readOnly />
        <br />
        <label>Accident Date:</label>
        <input type="date" name="accidentDate" value={claim.accidentDate} onChange={handleChange} required />
        <br />
        <label>Accident Location:</label>
        <input type="text" name="accidentLocation" value={claim.accidentLocation} onChange={handleChange} required />
        <br />
        <label>Description:</label>
        <textarea name="description" value={claim.description} onChange={handleChange} required />
        <br />
        <label>Claim Amount:</label>
        <input type="text" name="claimamount" value={claim.claimAmount} onChange={handleChange} required />
        <br />
        <label>Report Number:</label>
        <input type="text" name="reportNum" value={claim.reportNum} onChange={handleChange} readOnly />
        {/* Make the report number field readonly */}
        <br />
        <button type="submit">Submit Claim</button>
      </form>
    </div>
  );
};
export default ClaimForm;
