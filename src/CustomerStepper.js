import React, { useState, useEffect } from 'react';
import VehicleDetailsCustomer from './VehicleDetailsCustomer';
import PolicyDetailsByVehicleId from './PolicyDetailsByVehicleId'; // PolicyDetailsByVehicleId component for displaying policy details
import ClaimDetails from './ClaimDetails'; // Assume ClaimDetails is your component for displaying claim details
import { useNavigate } from 'react-router-dom';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function CustomerStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedVehicleIds, setSelectedVehicleIds] = useState([]);
  const navigate = useNavigate();

  const steps = ['Vehicle Details', 'Policy Details', 'Claim'];

  const handleNext = () => {
    if (activeStep === 0) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else if (activeStep === 1) {
      // Navigate to the policy details page for the selected vehicle ID
      navigate(`/policy-details/${selectedVehicleIds[0]}`);
    } else {
      // Navigate to the claim details page for the selected vehicle ID
      navigate(`/claim-details/${selectedVehicleIds[0]}`);
    }
  };

  const handleVehicleSelect = (vehicleId) => {
    setSelectedVehicleIds([vehicleId]); // Overwrite selected vehicles with the latest selection
  };

  useEffect(() => {
    if (selectedVehicleIds.length > 0) {
      localStorage.setItem('selectedVehicleId', selectedVehicleIds[0]); // Store selected vehicle ID in localStorage
    }
  }, [selectedVehicleIds]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '20px' }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <div>
        {activeStep === 0 && (
          <VehicleDetailsCustomer
            onVehicleSelect={handleVehicleSelect}
          />
        )}
        {activeStep === 1 && (
          <PolicyDetailsByVehicleId vehicleId={selectedVehicleIds[0]} />
        )}
        {activeStep === 2 && (
          <ClaimDetails vehicleId={selectedVehicleIds[0]} />
        )}
      </div>
      <div style={{ alignSelf: 'flex-end', marginLeft: '10px' }}>
        {activeStep !== steps.length && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={selectedVehicleIds.length === 0}
          >
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        )}
      </div>
    </div>
  );
}

export default CustomerStepper;
