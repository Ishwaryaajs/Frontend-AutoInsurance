import logo from './logo.svg';
import './App.css';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import Slide from './Slide';
import ImageSlider from './ImageSlider';
import ClaimDetails from './ClaimDetails';
import ImagesComponent from './ImagesComponent';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import HomePage from './HomePage';
import Navbar from './Navbar';
import MuiNavbar from './MuiNavbar';
import CustomerDetails from './CustomerDetails';
import VehicleSignUpForm from './VehcileSignUp';
import InsurancePolicySignUpForm from './InsurancePolicySignUpForm';
import CustomerStepper from './CustomerStepper';
import LandingPage from './LandingPage';
import UpdateCustomer from './UpdateCustomer';
import VehicleDetails from './VehicleDetails';
import PolicyDetails from './PolicyDetails';
import ClaimForm from './ClaimForm';
import CustomerList from './CustomerList';
import VehicleDetailsCustomer from './VehicleDetailsCustomer';
import PolicyDetailsByVehicleId from './PolicyDetailsByVehicleId';
import ClaimDetailsByPolicyId from './ClaimDetailsByPolicyId';

function App() {
  return <BrowserRouter>
  <Routes>
  <Route path='/login' element={<LoginForm/>}/>
    <Route path='/signup' element={<SignUpForm/>}/>
    <Route path='/muinav' element={<MuiNavbar/>}/>
    <Route path='/customerdetails' element={<CustomerDetails/>}/>
    <Route path='/customers' element={<CustomerList/>}/>
    <Route path='/updatecustomer' element={<UpdateCustomer/>}/>
    <Route path='/vehicle' element={<VehicleSignUpForm/>}/>
    <Route path='/vehicledetails' element={<VehicleDetails/>}/>
    <Route path='/policydetails' element={<PolicyDetails/>}/>
    <Route path='/claimform' element={<ClaimForm/>}/>
    <Route path='/claimdetails' element={<ClaimDetails/>}/>
    <Route path='/policy' element={<InsurancePolicySignUpForm/>}/>
    <Route path='/stepper' element={<CustomerStepper/>}/>
    <Route path='/customers' element={<CustomerList/>}/>
    <Route path='/landingpage' element={<LandingPage/>}/>
  <Route path='/' element={<Navbar/>}/>
  <Route index element={<HomePage/>}/>
  <Route path='/VehicleDetailsCustomer/:customerId' element={<VehicleDetailsCustomer/>}/>
  <Route path='/policydetailsvehicle/:vehicleId' element={<PolicyDetailsByVehicleId/>}/>
  <Route path='/claimdetailsbypolicy/:policyId' element={<ClaimDetailsByPolicyId/>}/>
   
    

    <Route path='/imagescomponent' element={<ImagesComponent/>}/>
    
  </Routes>
  
  </BrowserRouter>
}

export default App;
