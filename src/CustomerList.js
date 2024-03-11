import React, { useState, useEffect } from 'react';
import MuiNavbar from './MuiNavbar';
import { useNavigate } from 'react-router-dom';

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const response = await fetch(`https://localhost:7300/api/Customers`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchCustomers();
  }, []);

  const handleVehicleClick = (customerId) => {
    console.log(`Clicked Vehicle button for customer ${customerId}`);
    localStorage.setItem('customerId', customerId);
    // Navigate to the VehicleDetailsCustomer page with the customer ID as a parameter
    navigate(`/VehicleDetailsCustomer/${customerId}`);
  };

  return (
    <div>
      <MuiNavbar />
      <div className="customer-container" style={{ position: "absolute", marginLeft: "6vw" }}>
        {customers.map(customer => (
          <div className="customer-card" key={customer.customerId}>
            <h2>{customer.customerName}</h2>
            <p><strong>Email:</strong> {customer.email}</p>
            <p><strong>Gender:</strong> {customer.gender}</p>
            <p><strong>Phone:</strong> {customer.phone}</p>
            <p><strong>Address:</strong> {customer.address}</p>
            <p>
              <strong>Aadhar Number:</strong>
              <a href={`https://localhost:7300/api/Customers/ViewFile/${customer.aadharNum}`} target="_blank" rel="noopener noreferrer">
                View file
              </a>
            </p>
            <button className="btn btn-primary" onClick={() => handleVehicleClick(customer.customerId)}>Vehicle</button>
          </div>
        ))}
      </div>
      <style jsx>{`
        .customer-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 20px; 
        }

        .customer-card {
          flex: 0 0 calc(30% - 20px); 
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          box-sizing: border-box; 
          width: 100px;
        }

        @media (max-width: 768px) {
          .customer-card {
            flex: 0 0 calc(45% - 20px); 
          }
        }
      `}</style>
    </div>
  );
}

export default CustomerList;
