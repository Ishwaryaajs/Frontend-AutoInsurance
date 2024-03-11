import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

function PolicyDetailsByVehicleId({ vehicleId }) {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const PVid = localStorage.getItem("selectedVehicleId");

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get(`https://localhost:7300/api/InsurancePolicies/ByVehicleId/${PVid}`);
        setPolicies(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPolicies();
  }, [PVid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',width:"50%",position:"absolute" }}>
      <div>
        {policies.length === 0 ? (
          <p>No policies found for the specified vehicle ID.</p>
        ) : (
          <Grid container spacing={2}>
            {policies.map(policy => (
              <Grid item key={policy.policyId} xs={12} sm={6} md={4} lg={3}>
                <Card>
                  <CardContent>
                    <Typography color="textSecondary">
                      {policy.policyNum}
                    </Typography>
                    <Typography color="textSecondary">
                      Start Date: {policy.startDate}
                    </Typography>
                    <Typography color="textSecondary">
                      End Date: {policy.endDate}
                    </Typography>
                    <Typography color="textSecondary">
                      Coverage Type: {policy.coverageType}
                    </Typography>
                    <Typography color="textSecondary">
                      Policy Amount: {policy.policyAmount}
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

export default PolicyDetailsByVehicleId;
