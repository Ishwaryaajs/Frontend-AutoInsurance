import React, { useState, useEffect } from 'react';
import MuiNavbar from './MuiNavbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const PolicyDetails = () => {
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasClaim, setHasClaim] = useState(false);
  const navigate = useNavigate();

  const vid = localStorage.getItem("vehicleId");

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const response = await fetch(`https://localhost:7300/api/InsurancePolicies/ByVehicleId/${vid}`);
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setPolicy(data[0]); // Assuming only one policy is returned
          } else {
            setError('No policy found for the specified vehicle ID');
          }
        } else {
          setError('Failed to fetch policies');
        }
      } catch (error) {
        setError('Failed to fetch policies');
      }
      setLoading(false);
    };

    fetchPolicy();
  }, []);

  useEffect(() => {
    const checkClaim = async () => {
      try {
        if (policy && policy.policyId) { // Ensure policy and policyId are defined
          const response = await fetch(`https://localhost:7300/api/Claims/HasClaim/${policy.policyId}`);
          if (response.ok) {
            const data = await response.json();
            setHasClaim(data);
          } else {
            setError('Failed to fetch claim data');
          }
        }
      } catch (error) {
        setError('Failed to fetch claim data');
      }
    };
  
    checkClaim();
  }, [policy]);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!policy) {
    return <div>No policy found for the specified vehicle ID</div>;
  }
  const handleAddClaimClick = () => {
    navigate('/claimform');
  };

  const handleViewClaimClick = () => {
    navigate('/claimdetails');
  };
  return (
    <div style={{ backgroundImage: `url('https://th.bing.com/th?id=OIP._XrtfyQpQW2Qigk_fQoHsgHaGq&w=263&h=237&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <MuiNavbar />
      <Card variant="outlined">
        <CardContent style={{ width: "600px" }}>
          <Typography variant="body1" color="text.secondary" style={{ fontSize: "25px", fontWeight: "bold" }}>
            {policy.policyNum}
          </Typography>
          <Typography variant="body1" color="text.secondary" style={{ fontSize: "20px" }}>
            Start Date: {policy.startDate}
          </Typography>
          <Typography variant="body1" color="text.secondary" style={{ fontSize: "20px" }}>
            End Date: {policy.endDate}
          </Typography>
          <Typography variant="body1" color="text.secondary" style={{ fontSize: "20px" }}>
            Coverage Type: {policy.coverageType}
          </Typography>
          <Typography variant="body1" color="text.secondary" style={{ fontSize: "20px" }}>
            Policy Amount: {policy.policyAmount}
          </Typography>
          <button className='btn btn-primary' onClick={hasClaim ? handleViewClaimClick : handleAddClaimClick}>
            {hasClaim ? 'View Claim' : 'Add Claim'}
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PolicyDetails;
