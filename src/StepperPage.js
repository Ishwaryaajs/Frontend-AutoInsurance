import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import VehicleSignUpForm from './VehcileSignUp';
import InsurancePolicySignUpForm from './InsurancePolicySignUpForm';
import MuiNavbar from './MuiNavbar';

const steps = ['Vehicle Details', 'Policy Details'];

export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [vehicleId, setVehicleId] = React.useState(null); // State to store vehicleId

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleVehicleFormSubmit = (vehicleId) => {
    setVehicleId(vehicleId);
    handleNext(); // Move to the next step (policy details) after vehicle form submission
  };

  return (
    <div style={{ backgroundImage: `url('https://th.bing.com/th?id=OIP._XrtfyQpQW2Qigk_fQoHsgHaGq&w=263&h=237&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',marginLeft: '30px',marginRight: '1px', }}>
       <MuiNavbar />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Card sx={{ p: 2 }}>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === 0 && <VehicleSignUpForm onSubmit={handleVehicleFormSubmit} />} {/* Pass onSubmit prop to handle form submission */}
            {activeStep === 1 && <InsurancePolicySignUpForm vehicleId={vehicleId} />} {/* Pass vehicleId to policy form */}
            {activeStep !== steps.length &&
              (completed[activeStep] ? (
                <Typography variant="caption" sx={{ display: 'inline-block' }}>
                  Step {activeStep + 1} already completed
                </Typography>
              ) : (
                <Button onClick={handleComplete}>
                  {completedSteps() === totalSteps() - 1 ? 1 : 1}
                </Button>
              ))}
          </div>
        </Card>
      </Box>
    </div>
  );
}
