import express from 'express';
import { z } from 'zod';
import patientService from '../services/patientService';
import { validateNewPatient } from '../utils/validation';
import { v1 as uuid } from 'uuid';
import { Entry, HealthCheckRating } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getAllPatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatientById(req.params.id);
  
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).json({ error: 'Patient not found' });
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = validateNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      // Handle Zod validation errors
      const errorMessages = error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`);
      res.status(400).json({
        error: 'Validation failed',
        details: errorMessages
      });
    } else if (error instanceof Error) {
      res.status(400).json({
        error: error.message
      });
    } else {
      res.status(500).json({
        error: 'Something went wrong'
      });
    }
  }
});

const parseDiagnosisCodes = (object: unknown): Array<string> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<string>;
  }
  return object.diagnosisCodes as Array<string>;
};

router.post('/:id/entries', (req, res) => {
  try {
    const patient = patientService.getPatientById(req.params.id);
    
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const { type, description, date, specialist, ...rest } = req.body;

    // Basic validation
    if (!type || !description || !date || !specialist) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate type
    if (!['HealthCheck', 'OccupationalHealthcare', 'Hospital'].includes(type)) {
      return res.status(400).json({ error: 'Invalid entry type' });
    }

    let newEntry: Entry;

    switch (type) {
      case 'HealthCheck':
        const { healthCheckRating } = rest;
        if (healthCheckRating === undefined || !Object.values(HealthCheckRating).includes(healthCheckRating)) {
          return res.status(400).json({ error: 'Invalid health check rating' });
        }
        newEntry = {
          id: uuid(),
          type: 'HealthCheck',
          description,
          date,
          specialist,
          diagnosisCodes: parseDiagnosisCodes(req.body),
          healthCheckRating
        };
        break;

      case 'OccupationalHealthcare':
        const { employerName, sickLeave } = rest;
        if (!employerName) {
          return res.status(400).json({ error: 'Missing employer name' });
        }
        newEntry = {
          id: uuid(),
          type: 'OccupationalHealthcare',
          description,
          date,
          specialist,
          diagnosisCodes: parseDiagnosisCodes(req.body),
          employerName,
          sickLeave: sickLeave || undefined
        };
        break;

      case 'Hospital':
        const { discharge } = rest;
        if (!discharge || !discharge.date || !discharge.criteria) {
          return res.status(400).json({ error: 'Missing discharge information' });
        }
        newEntry = {
          id: uuid(),
          type: 'Hospital',
          description,
          date,
          specialist,
          diagnosisCodes: parseDiagnosisCodes(req.body),
          discharge
        };
        break;

      default:
        return res.status(400).json({ error: 'Invalid entry type' });
    }

    patient.entries.push(newEntry);
    res.json(newEntry);
    return;
  } catch (error) {
    console.error('Error adding entry:', error);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
});

export default router;
