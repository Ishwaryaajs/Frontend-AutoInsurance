import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PolicyDetailsByVehicleId({ vehicleId }) {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get(`https://localhost:7300/api/InsurancePolicies/ByVehicleId/${vehicleId}`);
        setPolicies(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPolicies();
  }, [vehicleId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Insurance Policies for Vehicle ID: {vehicleId}</h2>
      {policies.length === 0 ? (
        <p>No policies found for the specified vehicle ID.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Policy ID</th>
              <th>Policy Number</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Coverage Type</th>
              <th>Policy Amount</th>
            </tr>
          </thead>
          <tbody>
            {policies.map(policy => (
              <tr key={policy.policyId}>
                <td>{policy.policyId}</td>
                <td>{policy.policyNum}</td>
                <td>{policy.startDate}</td>
                <td>{policy.endDate}</td>
                <td>{policy.coverageType}</td>
                <td>{policy.policyAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PolicyDetailsByVehicleId;
