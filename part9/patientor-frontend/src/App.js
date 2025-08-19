import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import PatientDetail from './components/PatientDetail';
import './App.css';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/patients');
        setPatients(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch patients');
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const renderHealthRating = () => {
    return (
      <span>
        ❤️❤️❤️🤍
      </span>
    );
  };

  if (loading) {
    return <div className="loading">Loading patients...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <h2 className="patient-list-title">Patient list</h2>
      
      <div className="patient-table-container">
        <table className="patient-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Occupation</th>
              <th>Health Rating</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(patient => (
              <tr key={patient.id}>
                <td>
                  <Link to={`/patients/${patient.id}`} className="patient-link">
                    {patient.name}
                  </Link>
                </td>
                <td>{patient.gender}</td>
                <td>{patient.occupation}</td>
                <td>{renderHealthRating()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Patientor</h1>
          <Link to="/" className="home-button">Home</Link>
        </header>
        
        <main>
          <Routes>
            <Route path="/" element={<PatientList />} />
            <Route path="/patients/:id" element={<PatientDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
