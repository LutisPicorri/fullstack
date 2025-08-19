import { z } from 'zod';
import { NewPatient, Gender } from '../types';

// Zod schema for Gender enum
const GenderSchema = z.nativeEnum(Gender);

// Zod schema for date validation
const DateSchema = z.string().refine(
  (date) => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime()) && parsedDate.toISOString().startsWith(date);
  },
  {
    message: 'Invalid date format. Expected YYYY-MM-DD',
  }
);

// Zod schema for SSN validation (basic format check)
const SsnSchema = z.string().min(1, 'SSN is required').max(20, 'SSN too long');

// Main Zod schema for NewPatient
const NewPatientSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  dateOfBirth: DateSchema,
  ssn: SsnSchema,
  gender: GenderSchema,
  occupation: z.string().min(1, 'Occupation is required').max(100, 'Occupation too long'),
});

export const validateNewPatient = (object: unknown): NewPatient => {
  return NewPatientSchema.parse(object);
};

// Export the schema for potential use elsewhere
export { NewPatientSchema };
