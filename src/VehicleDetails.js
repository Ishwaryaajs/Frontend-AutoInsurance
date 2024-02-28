import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import MuiNavbar from './MuiNavbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

const VehicleDetails = () => {
  const [vehicle, setVehicle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedVehicle, setUpdatedVehicle] = useState(null);
  const [file, setFile] = useState(null);
  const id = sessionStorage.getItem("Id");
  const [hasPolicy, setHasPolicy] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await fetch(`https://localhost:7300/api/Vehicles/ByCustomerId/${id}`);
        if (response.ok) {
          const data = await response.json();

          setVehicle(data); 
          console.log(data);
        } else {
          setError('Failed to fetch vehicle data');
        }
      } catch (error) {
        setError(error.response.data.message);
      }
      setLoading(false);
    };

    fetchVehicleData();
  }, [id]); 


  useEffect(() => {
    const checkPolicy = async () => {
      try {
        // Create an array of promises for each fetch request
        const promises = vehicle.map(async (vehicle) => {
          const response = await fetch(`https://localhost:7300/api/InsurancePolicies/HasPolicy/${vehicle.vehicleId}`);
          if (response.ok) {
            const data = await response.json();
            setHasPolicy(data);
          } else {
            setError('Failed to fetch policy data');
          }
        });
  
       
        await Promise.all(promises);
      } catch (error) {
        setError('Failed to fetch policy data');
      }
    };
  
    checkPolicy();
  }, [vehicle]); 
  
  

  const handleEditClick = () => {
    setEditMode(true);
    setUpdatedVehicle({ ...vehicle });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedVehicle({ ...updatedVehicle, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setUpdatedVehicle(null);
  };

  const handleSaveClick = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('vehicle', JSON.stringify(updatedVehicle));

      const response = await fetch(`https://localhost:7300/api/Vehicles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        body: formData,
      });

      if (response.status === 204) {
        setVehicle(updatedVehicle);
        setEditMode(false);
      } else {
        setError('Failed to update vehicle data');
      }
    } catch (error) {
      console.error("Error updating vehicle:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!vehicle) {
    return <div>Vehicle not found</div>;
  }

  const handleAddPolicyClick = (vehicleId) => {
    if (!hasPolicy) {
      localStorage.setItem("vehicleId", vehicleId);
      navigate(`/policy`);
    } else {
      localStorage.setItem("vehicleId", vehicleId);
      navigate(`/policydetails`);
    }
  };
  return (
    <div style={{ display: 'flex', position: 'absolute', justifyContent: 'center', alignItems: 'center', height: '90vh', marginLeft: '300px', paddingTop: '160px' }}>
      <MuiNavbar />
      <div>
        {vehicle.map((vehicle, index) => (
          <Card key={index} variant="outlined" style={{ width: '400px', marginBottom: '20px' }}>
            <CardContent>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {editMode ? (
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        name="vehicleName"
                        label="Name"
                        value={updatedVehicle.vehicleName}
                        onChange={handleInputChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name="registerNum"
                        label="Register Number"
                        value={updatedVehicle.registerNum}
                        onChange={handleInputChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name="vehicleModel"
                        label="Model"
                        value={updatedVehicle.vehicleModel}
                        onChange={handleInputChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name="registerDate"
                        label="Register Date"
                        type="date"
                        value={updatedVehicle.registerDate}
                        onChange={handleInputChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name="mfgYear"
                        label="Manufacturing Year"
                        type="number"
                        value={updatedVehicle.mfgYear}
                        onChange={handleInputChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name="vehicleDoc"
                        label="Document"
                        value={updatedVehicle.vehicleDoc}
                        onChange={handleInputChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <input type="file" onChange={handleFileChange} />
                    </Grid>
                  </Grid>
                ) : (
                  <div>
                    <div>Name: {vehicle.vehicleName}</div>
                    <div>Register Number: {vehicle.registerNum}</div>
                    <div>Model: {vehicle.vehicleModel}</div>
                    <div>Register Date: {vehicle.registerDate}</div>
                    <div>Manufacturing Year: {vehicle.mfgYear}</div>
                    <div>Document:<a href={`https://localhost:7300/api/Vehicles/ViewFile/${vehicle.vehicleDoc}`} target="_blank" rel="noopener noreferrer">
                    View file
                  </a> </div>
                  </div>
                )}
              </Typography>

              <Typography variant="body2" color="textSecondary" gutterBottom>
                {editMode ? (
                  <div>
                    <Button variant="contained" onClick={handleSaveClick} style={{ marginRight: '8px' }}>Save</Button>
                    <Button variant="contained" className='btn btn-danger' onClick={handleCancelClick}>Cancel</Button>
                  </div>
                ) : (
                  <div>
                   <Button variant="contained" onClick={() => handleAddPolicyClick(vehicle.vehicleId)}>
                    {hasPolicy ? 'View Policy' : 'Add Policy'}
                  </Button>
                    <br />
                  </div>
                )}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VehicleDetails;
