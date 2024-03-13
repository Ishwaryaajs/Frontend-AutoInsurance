import React, { useState, useEffect } from 'react';
import VehicleDetailsCustomer from './VehicleDetailsCustomer';
import PolicyDetailsByVehicleId from './PolicyDetailsByVehicleId';
import ClaimDetailsByPolicyId from './ClaimDetailsByPolicyId';
import { useNavigate } from 'react-router-dom';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2'; // Import SweetAlert

function CustomerStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedVehicleIds, setSelectedVehicleIds] = useState([]);
  const [selectedPolicyId, setSelectedPolicyId] = useState(null); 
  const navigate = useNavigate();
  const selectedClaimId=localStorage.getItem("pId")

  const steps = ['Vehicle Details', 'Policy Details', 'Claim Details'];

  const handlePolicySelect = (policyId) => {
    setSelectedPolicyId(policyId); 
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (selectedVehicleIds.length > 0) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        console.error("No vehicle selected.");
      }
    } else if (activeStep === 1) {
      if (selectedPolicyId) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        console.error("No policy ID selected.");
      }
    } else if (activeStep === 2) {
 
      Swal.fire({
        title: 'Approve or Reject Claim',
        showCancelButton: true,
        confirmButtonText: 'Approve',
        cancelButtonText: 'Reject',
      }).then((result) => {
        if (result.isConfirmed) {
        
          updateClaimStatus(true);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
        
          updateClaimStatus(false);
        }
      });
    }
  };

  const handleVehicleSelect = (vehicleId) => {
    setSelectedVehicleIds([vehicleId]); 
  };

  const updateClaimStatus = async (status) => {
    try {
     
      const response = await fetch(`https://localhost:7300/api/Claims/Status/${selectedClaimId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(status) 
      });
  
      if (response.ok) {
    
        Swal.fire('Success', 'Claim status updated successfully', 'success');
        navigate('/customers'); 
      } else {
      
        Swal.fire('Error', 'Failed to update claim status', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'An error occurred while updating claim status', 'error');
    }
  };
  

  useEffect(() => {
    if (selectedVehicleIds.length > 0) {
      localStorage.setItem('selectedVehicleId', selectedVehicleIds[0]); 
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
            onPolicySelect={handlePolicySelect}
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
