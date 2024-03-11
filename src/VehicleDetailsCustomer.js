import React, { useState, useEffect } from 'react';
import MuiNavbar from './MuiNavbar';

function VehicleDetailsCustomer({ customerId }) {
  const [vehicles, setVehicles] = useState([]);
  const Cid = localStorage.getItem("customerId");

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const response = await fetch(`https://localhost:7300/api/Vehicles/ByCustomerIdDetail/${Cid}`);
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
  }, [Cid]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
      <MuiNavbar/>
      <div className="customer-container" style={{ maxWidth: '800px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {vehicles.length === 0 ? (
          <p>No vehicles available for this customer.</p>
        ) : (
          vehicles.map(vehicle => (
            <div key={vehicle.vehicleId} style={{ margin: '10px' }}>
              <div className="vehicle-card" style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '20px', width: '300px' }}>
                <p><strong>{vehicle.vehicleName}</strong> </p>
                <p><strong>Register Number:</strong> {vehicle.registerNum}</p>
                <p><strong> Model:</strong> {vehicle.vehicleModel}</p>
                <p><strong>Register Date:</strong> {vehicle.registerDate}</p>
                <p><strong>Manufacturing Year:</strong> {vehicle.mfgYear}</p>
                <p><strong> Document:</strong> <a href={`https://localhost:7300/api/Vehicles/ViewFile/${vehicle.vehicleDoc}`} target="_blank" rel="noopener noreferrer">View file</a></p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default VehicleDetailsCustomer;
