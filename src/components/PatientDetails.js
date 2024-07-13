import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PatientDetails = () => {
  const { patientId } = useParams();
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(`http://192.168.42.107:5001/api/patient/${patientId}`);
        setPatientData(response.data.data);
      } catch (error) {
        console.error('Error fetching patient details', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, [patientId]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleNotesChange = (event) => {
    setAdditionalNotes(event.target.value);
  };

  const handleConfirm = async () => {
    try {
      await axios.post(`http://192.168.42.107:5001/api/patient/${patientId}/consultation`, {
        selectedOption,
        additionalNotes
      });
      alert('Consultation details submitted successfully');
    } catch (error) {
      console.error('Error submitting consultation details', error);
      alert('Error submitting consultation details');
    }
  };

  return (
    <div className="container">
      <style>
        {`
          .container {
            display: flex;
            height: 100vh;
          }

          .sidebar {
            width: 250px;
            background-color: #2c8c99;
            padding: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            color: white;
          }

          .sidebar h1 {
            margin: 0;
            padding-bottom: 20px;
          }

          .sidebar button {
            background-color: #186973;
            border: none;
            color: white;
            padding: 10px;
            cursor: pointer;
            text-align: left;
            margin-bottom: 10px;
          }

          .sidebar button:hover {
            background-color: #14595d;
          }

          .content-container {
            flex: 1;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .card {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 600px;
          }

          .card h1, .card h2 {
            text-align: left;
          }

          .form-container {
            margin: 20px 0;
          }

          .form-group {
            margin-bottom: 15px;
            text-align: left;
          }

          .form-group label {
            display: block;
            margin-bottom: 5px;
          }

          .form-group select,
          .form-group textarea {
            width: 100%;
            padding: 8px;
            box-sizing: border-box;
          }

          .form-group button {
            background-color: #186973;
            border: none;
            color: white;
            padding: 10px;
            cursor: pointer;
            margin-top: 10px;
          }

          .form-group button:hover {
            background-color: #14595d;
          }

          .patient-info p {
            margin: 10px 0;
            text-align: left;
          }
        `}
      </style>
      <div className="sidebar">
        <div>
          <h1>Patient Details</h1>
        </div>
      </div>
      <div className="content-container">
        <div className="card">
          <h1>Patient Details</h1>
          {loading ? (
            <p>Loading...</p>
          ) : patientData ? (
            <div>
              <div className="patient-info">
                <p>Name: {patientData.patient.name}</p>
                <p>Symptoms: {patientData.symptoms}</p>
              </div>
              <div className="form-container">
                <div className="form-group">
                  <label htmlFor="option">Select Option</label>
                  <select id="option" value={selectedOption} onChange={handleOptionChange}>
                    <option value="">Select an option</option>
                    <option value="lab">Lab</option>
                    <option value="pharmacy">Pharmacy</option>
                    <option value="another_doctor">Another Doctor</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="notes">Additional Notes</label>
                  <textarea
                    id="notes"
                    value={additionalNotes}
                    onChange={handleNotesChange}
                    placeholder="Enter additional notes here..."
                    rows="4"
                    cols="50"
                  />
                </div>
                <button onClick={handleConfirm}>Confirm</button>
              </div>
            </div>
          ) : (
            <p>No patient details found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
