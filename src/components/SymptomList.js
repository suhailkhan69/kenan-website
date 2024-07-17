import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SymptomList = () => {
  const [symptoms, setSymptoms] = useState([]);

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const response = await axios.get(`https://kenan-backend.onrender.com/api/symptoms`);
        setSymptoms(response.data.data);
      } catch (error) {
        console.error('Error fetching symptoms', error);
      }
    };

    fetchSymptoms();
    const interval = setInterval(fetchSymptoms, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div>
      <h1>Symptoms</h1>
      <ul>
        {symptoms.map(symptom => (
          <li key={symptom._id}>
            <p>Symptoms: {symptom.symptoms}</p>
            <p>Date Submitted: {new Date(symptom.date).toLocaleString()}</p>
            <p>Patient ID: {symptom.patientId}</p>
            <p>Appointment Date: {symptom.appointmentDate ? new Date(symptom.appointmentDate).toLocaleString() : 'Not set'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SymptomList;
