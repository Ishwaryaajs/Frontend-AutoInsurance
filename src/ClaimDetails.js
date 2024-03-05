import React, { useState, useEffect } from 'react';

function ClaimDetails(props) {
  const [claim, setClaim] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClaim() {
      try {
        const response = await fetch(`https://localhost:7300/api/Claims/${props.claimId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setClaim(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching claim:', error);
        setLoading(false);
      }
    }

    fetchClaim();

    // Cleanup function
    return () => {
      setClaim(null);
      setLoading(true);
    };
  }, [props.claimId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!claim) {
    return <div>Claim not found</div>;
  }

  return (
    <div>
      <h2>Claim Details</h2>
      <p>Claim ID: {claim.claimId}</p>
      <p>Policy ID: {claim.policyId}</p>
      <p>Customer ID: {claim.customerId}</p>
      <p>Claim Number: {claim.claimNumber}</p>
      <p>Claim Amount: {claim.claimAmount}</p>
      <p>Submission Date: {claim.submissionDate}</p>
      <p>Accident Date: {claim.accidentDate}</p>
      <p>Accident Location: {claim.accidentLocation}</p>
      <p>Description: {claim.description}</p>
      <p>Report Number: {claim.reportNum}</p>
      <p>Claim Status: {claim.claimStatus ? 'Active' : 'Inactive'}</p>
    
    </div>
  );
}

export default ClaimDetails;
