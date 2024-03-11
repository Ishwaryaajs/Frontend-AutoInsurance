import React, { useState } from 'react';
import VehicleDetailsCustomer from './VehicleDetailsCustomer';
import PolicyDetails from './PolicyDetails'; // assuming PolicyDetails is your component for policy details
import { useNavigate } from 'react-router-dom';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function CustomerStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const navigate = useNavigate();

  const steps = ['Vehicle Details', 'Policy Details'];

  const handleNext = (vehicleId) => {
    if (activeStep === 0) {
      setSelectedVehicleId(vehicleId);
    } else {
      navigate(`/PolicyDetails/${selectedVehicleId}`);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

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
          <VehicleDetailsCustomer onNext={handleNext} />
        )}
        {activeStep === 1 && (
          <PolicyDetails vehicleId={selectedVehicleId} />
        )}
      </div>
      <div style={{ alignSelf: 'flex-end' }}>
        {activeStep !== steps.length && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleNext()}
          >
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        )}
      </div>
    </div>
  );
}

export default CustomerStepper;
