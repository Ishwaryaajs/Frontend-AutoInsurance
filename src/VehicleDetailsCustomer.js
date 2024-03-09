// VehicleDetailsCustomer.js

import React, { useState, useEffect } from 'react';

function VehicleDetailsCustomer({ customerId }) {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const response = await fetch(`https://localhost:7300/api/Vehicles/ByCustomerIdDetail/${customerId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setVehicles(data);
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
      }
    }

    fetchVehicles();
  }, [customerId]);

  return (
    <div>
      <h2>Vehicle Details for Customer ID: {customerId}</h2>
      <ul>
        {vehicles.map(vehicle => (
          <li key={vehicle.vehicleId}>
            <p><strong>Vehicle Name:</strong> {vehicle.vehicleName}</p>
            <p><strong>Register Number:</strong> {vehicle.registerNum}</p>
            <p><strong>Vehicle Model:</strong> {vehicle.vehicleModel}</p>
            <p><strong>Register Date:</strong> {vehicle.registerDate}</p>
            <p><strong>Manufacturing Year:</strong> {vehicle.mfgYear}</p>
            <p><strong>Vehicle Document:</strong> {vehicle.vehicleDoc}</p>
            {/* Add more vehicle details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VehicleDetailsCustomer;
