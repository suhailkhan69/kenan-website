import React, { useState } from 'react';
import './Consultation.css';
import { useParams } from 'react-router-dom';

const Consultation = () => {
  const { name } = useParams();
  const patientID = "3213.33213.132"; // This should be dynamically fetched based on the patient data

  const [selectedOption, setSelectedOption] = useState('Prescription');

  const options = [
    'Prescription',
    'Lab Tests',
    'X-Ray',
    'End Visit',
    'Refer Another Doctor'
  ];

  return (
    <div className="detail-container">
      <div className="detail-header">
        <div className="header-content">
          <h2>{name}</h2>
          <span>Patient ID: {patientID}</span>
        </div>
      </div>
      <div className="detail-content">
        <div className="select-step">
          <h3>Select Next Step</h3>
          <div className="options">
            {options.map((option, index) => (
              <div key={index} className={`option ${selectedOption === option ? 'selected' : ''}`} onClick={() => setSelectedOption(option)}>
                {option}
              </div>
            ))}
          </div>
        </div>
        <textarea placeholder="Additional notes..."></textarea>
        <button className="done-button">Done</button>
      </div>
    </div>
  );
};

export default Consultation;
