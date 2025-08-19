import React from 'react';
import { Box, Typography } from '@mui/material';
import { 
  LocalHospital, 
  Work, 
  Favorite,
  FavoriteOutlined 
} from '@mui/icons-material';

const EntryDetails = ({ entry }) => {
  const assertNever = (value) => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const getHealthCheckRatingIcon = (rating) => {
    const iconProps = { fontSize: 'small' };
    switch (rating) {
      case 0:
        return <Favorite {...iconProps} sx={{ color: 'green' }} />;
      case 1:
        return <Favorite {...iconProps} sx={{ color: 'yellow' }} />;
      case 2:
        return <Favorite {...iconProps} sx={{ color: 'orange' }} />;
      case 3:
        return <Favorite {...iconProps} sx={{ color: 'red' }} />;
      default:
        return <FavoriteOutlined {...iconProps} />;
    }
  };

  const getHealthCheckRatingText = (rating) => {
    switch (rating) {
      case 0:
        return 'Healthy';
      case 1:
        return 'Low Risk';
      case 2:
        return 'High Risk';
      case 3:
        return 'Critical Risk';
      default:
        return 'Unknown';
    }
  };

  switch (entry.type) {
    case 'HealthCheck':
      return (
        <Box sx={{ mt: 1, p: 1, bgcolor: 'background.paper', borderRadius: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Favorite sx={{ color: 'primary.main' }} />
            <Typography variant="subtitle2" color="primary">
              Health Check
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2">
              Rating: {getHealthCheckRatingText(entry.healthCheckRating)}
            </Typography>
            {getHealthCheckRatingIcon(entry.healthCheckRating)}
          </Box>
        </Box>
      );
    
    case 'OccupationalHealthcare':
      return (
        <Box sx={{ mt: 1, p: 1, bgcolor: 'background.paper', borderRadius: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Work sx={{ color: 'primary.main' }} />
            <Typography variant="subtitle2" color="primary">
              Occupational Healthcare
            </Typography>
          </Box>
          <Typography variant="body2">
            <strong>Employer:</strong> {entry.employerName}
          </Typography>
          {entry.sickLeave && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2" color="text.secondary">
                <strong>Sick Leave:</strong> {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
              </Typography>
            </Box>
          )}
        </Box>
      );
    
    case 'Hospital':
      return (
        <Box sx={{ mt: 1, p: 1, bgcolor: 'background.paper', borderRadius: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <LocalHospital sx={{ color: 'primary.main' }} />
            <Typography variant="subtitle2" color="primary">
              Hospital
            </Typography>
          </Box>
          <Typography variant="body2">
            <strong>Discharge Date:</strong> {entry.discharge.date}
          </Typography>
          <Typography variant="body2">
            <strong>Discharge Criteria:</strong> {entry.discharge.criteria}
          </Typography>
        </Box>
      );
    
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
