import React, { useState, useEffect } from 'react';
import VehicleDetailsCustomer from './VehicleDetailsCustomer';
import PolicyDetailsByVehicleId from './PolicyDetailsByVehicleId';
import ClaimDetailsByPolicyId from './ClaimDetailsByPolicyId'; // Import the ClaimDetailsByPolicyId component
import { useNavigate } from 'react-router-dom';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function CustomerStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedVehicleIds, setSelectedVehicleIds] = useState([]);
  const [selectedPolicyId, setSelectedPolicyId] = useState(null); // State to hold the selected policy ID
  const navigate = useNavigate();

  const steps = ['Vehicle Details', 'Policy Details', 'Claim'];

  
  const handlePolicySelect = (policyId) => {
    setSelectedPolicyId(policyId); // Set the selected policy ID
  };
  const handleNext = () => {
    if (activeStep === 0) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // }  if (activeStep === 1) {
    //   // Navigate to the policy details page for the selected vehicle ID
    //   navigate(`/policydetailsvehicle/${selectedVehicleIds[0]}`);
    }  if (activeStep === 1) {
      navigate(`/claimdetailsbypolicy/${selectedPolicyId}`);
      // if (selectedPolicyId) {
      //   navigate(`/claimdetailsbypolicy/${selectedPolicyId}`);
      // } else {
      //   console.error("No policy ID selected.");
      // }
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
          <PolicyDetailsByVehicleId
            vehicleId={selectedVehicleIds[0]}
            onPolicySelect={handlePolicySelect} // Pass a callback to handle policy selection
          />
        )}
        {activeStep === 2 && (
          <ClaimDetailsByPolicyId policyId={selectedPolicyId} />
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
