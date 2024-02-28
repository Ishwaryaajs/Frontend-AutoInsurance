import * as React from 'react';
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

  return (
    <div style={{ display: 'flex', position: 'absolute', justifyContent: 'center', alignItems: 'center', height: '90vh', marginLeft: '50px',marginRight: '50px', paddingTop: '160px' }}>
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
          {activeStep === 0 && <VehicleSignUpForm />} {/* Render VehicleSignUpForm component on the first step */}
          {activeStep === 1 && <InsurancePolicySignUpForm/>} {/* Render Policy Details component on the second step */}
         
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
    </Box></div>
  );
}
