import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

function ClaimDetailsByPolicyId({ policyId }) {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const pcid = localStorage.getItem("policyId");
  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await axios.get(`https://localhost:7300/api/Claims/ByPolicyId/${pcid}`);
        setClaims(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchClaims();
  }, [pcid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '50%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        {claims.length === 0 ? (
          <p>No claims found for the specified policy ID.</p>
        ) : (
          <Grid container spacing={2}>
            {claims.map(claim => (
              <Grid item key={claim.claimId} xs={12} sm={6} md={4} lg={3}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary">
                      Claim ID: {claim.claimId}
                    </Typography>
                    <Typography color="textSecondary">
                      Claim Amount: {claim.claimAmount}
                    </Typography>
                    <Typography color="textSecondary">
                      Claim Date: {claim.submissionDate}
                    </Typography>
                    <Typography color="textSecondary">
                      Report Number: {claim.reportNum}
                    </Typography>
                    <Typography color="textSecondary">
                     Accident date: {claim.accidentDate}
                    </Typography>
                    <Typography color="textSecondary">
                    Accident Location : {claim.accidentLocation}
                    </Typography>
                    <Typography color="textSecondary">
                      Description: {claim.description}
                    </Typography>
                    <Typography color="textSecondary">
                      Status: Pending
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
}

export default ClaimDetailsByPolicyId;
