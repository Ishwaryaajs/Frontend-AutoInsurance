import React, { useState, useEffect } from 'react';
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
  const [selectedVehicleIds, setSelectedVehicleIds] = useState([]);
  const navigate = useNavigate();

  const steps = ['Vehicle Details', 'Policy Details'];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleVehicleSelect = (vehicleId) => {
    setSelectedVehicleIds((prevSelectedVehicleIds) => [...prevSelectedVehicleIds, vehicleId]);
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
          <VehicleDetailsCustomer
            onNext={handleNext}
            onVehicleSelect={handleVehicleSelect}
            selectedVehicleIds={selectedVehicleIds} // Pass selected vehicle IDs
          />
        )}
        {activeStep === 1 && (
          selectedVehicleIds.map((vehicleId, index) => (
            <PolicyDetails key={index} vehicleId={vehicleId} />
          ))
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
