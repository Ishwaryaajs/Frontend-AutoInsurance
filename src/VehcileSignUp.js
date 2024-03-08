


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, MenuItem, Card, CardContent, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MuiNavbar from './MuiNavbar';

const VehicleSignUpForm = () => {
  const [formData, setFormData] = useState({
    vehicleId: 0,
    CustomerId: sessionStorage.getItem("Id"),
    vehicleName: '',
    registerNum: '',
    vehicleModel: '',
    registerDate: null,
    mfgYear: null,
    file: null
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [showCustomVehicleName, setShowCustomVehicleName] = useState(false);
  const [registerNumError, setRegisterNumError] = useState('');
  const[regNum,setRegNum] = useState(false);

  useEffect(() => {
    const checkRegisterNumExists = async () => {
      try {
        const response1 = await axios.post('https://localhost:7300/api/Vehicles/CheckNumExists', {
          registernum: formData.registerNum
        });
        if (response1.data === 1) {
          setRegisterNumError('Register number already exists.');
          setRegNum(true);
          return;
        } else {
          setRegisterNumError('');
        }
      } catch (error) {
        console.error('Error checking register number:', error);
      }
    };

    if (formData.registerNum) {
      checkRegisterNumExists();
    }
  }, [formData.registerNum]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'registerNum' && !/^[0-9a-zA-Z]{0,10}$/.test(value)) {
      setError('Register Number should be alphanumeric and exactly 10 characters.');
      return;
    } else {
      setError('');
    }
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'isAdmin' ? e.target.checked : value,
      file: name === 'file' ? files[0] : prevState.file
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if the registerNum error exists and regNum is false
    if (registerNumError && !regNum) {
      setError(registerNumError);
      return;
    }
  
    try {
      // Validate file type
      if (!formData.file || formData.file.type !== 'application/pdf') {
        setError('Please upload a PDF file for the vehicle document.');
        return;
      }
  
      // If registerNum exists and regNum is true, don't send the registerNum to the API
      if (registerNumError && regNum) {
        setFormData(prevState => ({
          ...prevState,
          registerNum: '' // Clear the registerNum value
        }));
      }
  
      // Create formDataToSend
      const formDataToSend = new FormData();
      formDataToSend.append('vehicleId', formData.vehicleId);
      formDataToSend.append('customerId', formData.CustomerId);
      formDataToSend.append('vehicleName', formData.vehicleName || formData.customVehicleName); // Use custom vehicle name if provided
      formDataToSend.append('registerDate', formData.registerDate);
      formDataToSend.append('mfgYear', formData.mfgYear);
      formDataToSend.append('registerNum', formData.registerNum); // Append registerNum
  
      formDataToSend.append('file', formData.file);
  
      console.log('FormData:', formDataToSend);
  
      // Send data to API
      const response = await axios.post('https://localhost:7300/api/Vehicles', formDataToSend);
      console.log(response.data);
  
      // Redirect to policy page
      navigate('/policy');
    } catch (error) {
      console.error('Error:', error.response.data);
      setError('Failed to submit vehicle details.');
    }
  };
  
  

  const handleVehicleNameChange = (e) => {
    const { value } = e.target;
    if (value === 'Other') {
      setShowCustomVehicleName(true); // Show custom vehicle name input field if "Other" is selected
    } else {
      setShowCustomVehicleName(false); // Hide custom vehicle name input field otherwise
    }
    setFormData(prevState => ({
      ...prevState,
      vehicleName: value,
      vehicleModel: '' ,
      // Reset vehicle model when the vehicle name changes
    }));
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
       <MuiNavbar /> <Grid item>
        <Card>
          <CardContent>
          
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
              <TextField
                select
                margin="dense"
                name="vehicleName"
                label="Vehicle Name"
                fullWidth
                value={formData.vehicleName}
                onChange={handleVehicleNameChange}
                required
              >
                {vehicleNames.map((name, index) => (
                  <MenuItem key={index} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                margin="dense"
                name="vehicleModel"
                label="Vehicle Model"
                fullWidth
                value={formData.vehicleModel}
                onChange={handleChange}
                required
                disabled={!formData.vehicleName} // Disable vehicle model field if no vehicle name selected
              >
                {formData.vehicleName && vehicleModels[formData.vehicleName] ?
                  vehicleModels[formData.vehicleName].map((model, index) => (
                    <MenuItem key={index} value={model}>
                      {model}
                    </MenuItem>
                  )) : null
                }
              </TextField>
              <TextField
                margin="dense"
                name="registerNum"
                label="Registration Num"
                type="text"
                fullWidth
                value={formData.registerNum}
                onChange={handleChange}
                required
              />
              <TextField
                margin="dense"
                name="registerDate"
                label="Register Date"
                type="date"
                fullWidth
                value={formData.registerDate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
              <TextField
                margin="dense"
                name="mfgYear"
                label="Manufacturing Year"
                type="date"
                fullWidth
                value={formData.mfgYear}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
              <label>
                Upload File (PDF):
                <input type="file" name="file" onChange={handleChange} accept=".pdf" />
              </label>
              <br />
              <Button type="submit" variant="contained" color="primary">
                Next
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
const vehicleNames = [
  'Toyota',
  'Honda',
  'Ford',
  'Chevrolet',
  'Nissan',
  'Hyundai',
  'Volkswagen',
  'BMW',
  'Mercedes-Benz',
  'Audi',
  'Tesla',
  'Subaru',
  'Mazda',
  'Lexus',
  'Kia',
  'Jeep',
  'Volvo',
  'Porsche',
  'Mitsubishi',
  'Fiat',
 
];
const vehicleModels = {
  'Toyota': ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Prius', 'Tacoma', 'Tundra','Other'],
  'Honda': ['Accord', 'Civic', 'CR-V', 'Pilot', 'Odyssey', 'Fit', 'HR-V','Other'],
  'Ford': ['F-150', 'Escape', 'Explorer', 'Focus', 'Mustang', 'Edge', 'Fusion','Other'],
  'Chevrolet': ['Silverado', 'Equinox', 'Tahoe', 'Malibu', 'Traverse', 'Cruze', 'Suburban','Other'],
  'Nissan': ['Altima', 'Rogue', 'Sentra', 'Maxima', 'Pathfinder', 'Versa', 'Titan','Other'],
  'Hyundai': ['Sonata', 'Elantra', 'Santa Fe', 'Tucson', 'Accent', 'Palisade', 'Kona','Other'],
  'Volkswagen': ['Jetta', 'Passat', 'Tiguan', 'Atlas', 'Golf', 'Arteon', 'Atlas Cross Sport','Other'],
  'BMW': ['3 Series', '5 Series', 'X3', 'X5', '7 Series', 'X1', 'X7','Other'],
  'Mercedes-Benz': ['C-Class', 'E-Class', 'G-Class', 'GLC', 'S-Class', 'CLA', 'GLA','Other'],
  'Audi': ['A4', 'Q5', 'A3', 'Q7', 'A6', 'Q3', 'A5','Other'],
  'Tesla': ['Model 3', 'Model S', 'Model Y', 'Model X','Other'],
  'Subaru': ['Outback', 'Forester', 'Impreza', 'Legacy', 'Crosstrek', 'Ascent','Other'],
  'Mazda': ['Mazda3', 'Mazda6', 'CX-5', 'CX-9', 'MX-5 Miata', 'CX-30','Other'],
  'Lexus': ['RX', 'NX', 'ES', 'UX', 'GX', 'IS', 'LS','Other'],
  'Kia': ['Sorento', 'Sportage', 'Telluride', 'Soul', 'Forte', 'Optima', 'Rio','Other'],
  'Jeep': ['Wrangler', 'Grand Cherokee', 'Cherokee', 'Compass', 'Renegade', 'Gladiator','Other'],
  'Volvo': ['XC90', 'XC60', 'S60', 'XC40', 'S90', 'V60', 'V90','Other'],
  'Porsche': ['911', 'Cayenne', 'Macan', 'Panamera', 'Taycan', 'Boxster', 'Cayman','Other'],
  'Mitsubishi': ['Outlander', 'Eclipse Cross', 'Outlander Sport', 'Mirage', 'Mirage G4','Other'],
  'Fiat': ['500', '500X', '500L', '124 Spider', '500e','Other']
};

export default VehicleSignUpForm;
