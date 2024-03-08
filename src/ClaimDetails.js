import React, { useState, useEffect } from 'react';
import MuiNavbar from './MuiNavbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function ClaimDetails(props) {
  const [claim, setClaim] = useState(null); // Initialize claim as null
  const [loading, setLoading] = useState(true);
  const PId = localStorage.getItem("policyid");

  useEffect(() => {
    async function fetchClaim() {
      try {
        const response = await fetch(`https://localhost:7300/api/Claims/ByPolicyId/${PId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setClaim(data[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching claim:', error);
        setLoading(false);
      }
    }

    fetchClaim();
  }, [PId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!claim) {
    return <div>Claim not found</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundImage: `url('https://th.bing.com/th?id=OIP._XrtfyQpQW2Qigk_fQoHsgHaGq&w=263&h=237&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
    <MuiNavbar />
    <Card variant="outlined" style={{ width: '600px', overflowY: 'hidden', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', textAlign: 'center' }}>
      <CardContent style={{ fontSize: '20px' }}>
        <h2>Claim Details</h2>
        <p>Claim Number: {claim.claimNumber}</p>
        <p>Claim Amount: {claim.claimAmount}</p>
        <p>Submission Date: {claim.submissionDate}</p>
        <p>Accident Date: {claim.accidentDate}</p>
        <p>Accident Location: {claim.accidentLocation}</p>
        <p>Description: {claim.description}</p>
        <p>Report Number: {claim.reportNum}</p>
        <p>Claim Status: {claim.claimStatus ? 'Active' : 'Inactive'}</p>
      </CardContent>
    </Card>
  </div>
  );
}

export default ClaimDetails;
