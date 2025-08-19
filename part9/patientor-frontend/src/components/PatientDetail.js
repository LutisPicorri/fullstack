import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import EntryDetails from './EntryDetails';
import AddEntryForm from './AddEntryForm';

const PatientDetail = () => {
  const [patient, setPatient] = useState(null);
  const [diagnoses, setDiagnoses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientResponse, diagnosesResponse] = await Promise.all([
          axios.get(`http://localhost:3001/api/patients/${id}`),
          axios.get('http://localhost:3001/api/diagnoses')
        ]);
        
        setPatient(patientResponse.data);
        
        // Create a map of diagnosis codes to descriptions
        const diagnosesMap = {};
        diagnosesResponse.data.forEach(diagnosis => {
          diagnosesMap[diagnosis.code] = diagnosis.name;
        });
        setDiagnoses(diagnosesMap);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading patient data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!patient) {
    return <div>Patient not found</div>;
  }

  const handleEntryAdded = (newEntry) => {
    setPatient(prev => ({
      ...prev,
      entries: [...prev.entries, newEntry]
    }));
  };

  return (
    <div className="patient-detail">
      <h2>{patient.name}</h2>
      <div className="patient-info">
        <p><strong>SSN:</strong> {patient.ssn}</p>
        <p><strong>Occupation:</strong> {patient.occupation}</p>
        <p><strong>Gender:</strong> {patient.gender}</p>
        <p><strong>Date of Birth:</strong> {patient.dateOfBirth}</p>
      </div>
      
      <AddEntryForm patientId={patient.id} onEntryAdded={handleEntryAdded} />
      
      <h3>Entries</h3>
      {patient.entries && patient.entries.length > 0 ? (
        <div className="entries">
          {patient.entries.map((entry, index) => (
            <div key={entry.id || index} className="entry">
              <h4>{entry.date}</h4>
              <p><strong>Description:</strong> {entry.description}</p>
              <p><strong>Specialist:</strong> {entry.specialist}</p>
              {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
                <div>
                  <p><strong>Diagnosis Codes:</strong></p>
                  <ul>
                    {entry.diagnosisCodes.map(code => (
                      <li key={code}>
                        {code}: {diagnoses[code] || 'Unknown diagnosis'}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <EntryDetails entry={entry} />
            </div>
          ))}
        </div>
      ) : (
        <p>No entries found</p>
      )}
    </div>
  );
};

export default PatientDetail;
