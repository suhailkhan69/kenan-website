import React from 'react';
import './PatientDetail.css';
import { useParams } from 'react-router-dom';

const PatientDetails = () => {
  const { name } = useParams();
  const patientID = "3213.33213.132"; // This should be dynamically fetched based on the patient data
  const patientStatus = "Arrived"; // This should be dynamically fetched based on the patient data
  const patientComplaint = "I am experiencing awful stomach ache"; // This should be dynamically fetched based on the patient data

  return (
    <div className="detail-container">
      <div className="detail-header">
        <div className="header-content">
          <h2>{name}</h2>
          <span>Patient ID: {patientID}</span>
        </div>
      </div>
      <div className="detail-content">
        <p>{patientComplaint}</p>
      </div>
      <div className="status-container">
        <span className="status"><a href='/consultation'>{patientStatus}</a></span>
      </div>
    </div>
  );
};

export default PatientDetails;
