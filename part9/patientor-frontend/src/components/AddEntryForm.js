import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  OutlinedInput,
  Alert,
  Typography,
  Paper
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const AddEntryForm = ({ patientId, onEntryAdded }) => {
  const [formData, setFormData] = useState({
    type: 'HealthCheck',
    description: '',
    date: new Date(),
    specialist: '',
    healthCheckRating: 0,
    employerName: '',
    sickLeaveStartDate: null,
    sickLeaveEndDate: null,
    dischargeDate: null,
    dischargeCriteria: '',
    diagnosisCodes: []
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [diagnoses, setDiagnoses] = useState([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/diagnoses');
        setDiagnoses(response.data);
      } catch (err) {
        console.error('Failed to fetch diagnoses:', err);
      }
    };
    fetchDiagnoses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const entryData = {
        type: formData.type,
        description: formData.description,
        date: formData.date.toISOString().split('T')[0], // Format as YYYY-MM-DD
        specialist: formData.specialist,
        diagnosisCodes: formData.diagnosisCodes
      };

      // Add type-specific fields
      switch (formData.type) {
        case 'HealthCheck':
          entryData.healthCheckRating = parseInt(formData.healthCheckRating);
          break;
        case 'OccupationalHealthcare':
          entryData.employerName = formData.employerName;
          if (formData.sickLeaveStartDate && formData.sickLeaveEndDate) {
            entryData.sickLeave = {
              startDate: formData.sickLeaveStartDate.toISOString().split('T')[0],
              endDate: formData.sickLeaveEndDate.toISOString().split('T')[0]
            };
          }
          break;
        case 'Hospital':
          entryData.discharge = {
            date: formData.dischargeDate.toISOString().split('T')[0],
            criteria: formData.dischargeCriteria
          };
          break;
        default:
          break;
      }

      const response = await axios.post(`http://localhost:3001/api/patients/${patientId}/entries`, entryData);
      
      setSuccess('Entry added successfully!');
      onEntryAdded(response.data);
      
      // Reset form
      setFormData({
        type: 'HealthCheck',
        description: '',
        date: new Date(),
        specialist: '',
        healthCheckRating: 0,
        employerName: '',
        sickLeaveStartDate: null,
        sickLeaveEndDate: null,
        dischargeDate: null,
        dischargeCriteria: '',
        diagnosisCodes: []
      });
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Failed to add entry');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Add New Entry
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Entry Type</InputLabel>
            <Select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              label="Entry Type"
            >
              <MenuItem value="HealthCheck">Health Check</MenuItem>
              <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
              <MenuItem value="Hospital">Hospital</MenuItem>
            </Select>
          </FormControl>

          <TextField
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleInputChange}
            required
            fullWidth
            multiline
            rows={3}
          />

          <DatePicker
            label="Date"
            value={formData.date}
            onChange={(newDate) => setFormData(prev => ({ ...prev, date: newDate }))}
            slotProps={{ textField: { required: true, fullWidth: true } }}
          />

          <TextField
            name="specialist"
            label="Specialist"
            value={formData.specialist}
            onChange={handleInputChange}
            required
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Diagnosis Codes</InputLabel>
            <Select
              multiple
              value={formData.diagnosisCodes}
              onChange={(e) => setFormData(prev => ({ ...prev, diagnosisCodes: e.target.value }))}
              input={<OutlinedInput label="Diagnosis Codes" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
            >
              {diagnoses.map((diagnosis) => (
                <MenuItem key={diagnosis.code} value={diagnosis.code}>
                  {diagnosis.code} - {diagnosis.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {formData.type === 'HealthCheck' && (
            <FormControl fullWidth>
              <InputLabel>Health Check Rating</InputLabel>
              <Select
                name="healthCheckRating"
                value={formData.healthCheckRating}
                onChange={handleInputChange}
                label="Health Check Rating"
              >
                <MenuItem value={0}>Healthy</MenuItem>
                <MenuItem value={1}>Low Risk</MenuItem>
                <MenuItem value={2}>High Risk</MenuItem>
                <MenuItem value={3}>Critical Risk</MenuItem>
              </Select>
            </FormControl>
          )}

          {formData.type === 'OccupationalHealthcare' && (
            <>
              <TextField
                name="employerName"
                label="Employer Name"
                value={formData.employerName}
                onChange={handleInputChange}
                required
                fullWidth
              />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <DatePicker
                  label="Sick Leave Start Date"
                  value={formData.sickLeaveStartDate}
                  onChange={(newDate) => setFormData(prev => ({ ...prev, sickLeaveStartDate: newDate }))}
                  slotProps={{ textField: { fullWidth: true } }}
                />
                <DatePicker
                  label="Sick Leave End Date"
                  value={formData.sickLeaveEndDate}
                  onChange={(newDate) => setFormData(prev => ({ ...prev, sickLeaveEndDate: newDate }))}
                  slotProps={{ textField: { fullWidth: true } }}
                />
              </Box>
            </>
          )}

          {formData.type === 'Hospital' && (
            <>
              <DatePicker
                label="Discharge Date"
                value={formData.dischargeDate}
                onChange={(newDate) => setFormData(prev => ({ ...prev, dischargeDate: newDate }))}
                slotProps={{ textField: { required: true, fullWidth: true } }}
              />
              <TextField
                name="dischargeCriteria"
                label="Discharge Criteria"
                value={formData.dischargeCriteria}
                onChange={handleInputChange}
                required
                fullWidth
                multiline
                rows={2}
              />
            </>
          )}

          <Button 
            type="submit" 
            variant="contained" 
            size="large"
            sx={{ mt: 2 }}
          >
            Add Entry
          </Button>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
};

export default AddEntryForm;
