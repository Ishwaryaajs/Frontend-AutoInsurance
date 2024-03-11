import React, { useState, useEffect } from 'react';
import MuiNavbar from './MuiNavbar';

function VehicleDetailsCustomer({ onNext, onVehicleSelect }) {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [isNextEnabled, setIsNextEnabled] = useState(false);
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

  const handleVehicleClick = (vehicleId) => {
    setSelectedVehicleId(vehicleId);
    localStorage.setItem('selectedVehicleId', vehicleId); // Store selected vehicle ID in localStorage
    onVehicleSelect(vehicleId); // Notify parent component about vehicle selection
    setIsNextEnabled(true); // Enable the next button
  };

  const handleNextClick = () => {
    onNext(selectedVehicleId); // Pass selected vehicle ID to the parent component
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    
      <div className="customer-container" style={{ maxWidth: '600px' }}>
        {vehicles.length === 0 ? (
          <p>No vehicles available for this customer.</p>
        ) : (
          vehicles.map(vehicle => (
            <div key={vehicle.vehicleId} style={{ marginBottom: '20px' }}>
              <div className="vehicle-card" style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '20px', cursor: 'pointer', position: 'relative' }} onClick={() => handleVehicleClick(vehicle.vehicleId)}>
                {selectedVehicleId === vehicle.vehicleId && <div style={{ position: 'absolute', top: '-10px', left: '10px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'green' }}></div>}
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
        <div style={{ alignSelf: 'flex-end', marginTop: '20px' }}>
          <button disabled={!isNextEnabled} onClick={handleNextClick}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default VehicleDetailsCustomer;
