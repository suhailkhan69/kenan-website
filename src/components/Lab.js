import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConsultationList = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [estimatedTimes, setEstimatedTimes] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredConsultations, setFilteredConsultations] = useState([]);

  const fetchConsultations = async () => {
    try {
      const response = await axios.get(`https://kenan-backend.onrender.com/api/consultations`);
      const labConsultations = response.data.data.filter(
        consultation => consultation.selectedOption === 'lab'
      );
      setConsultations(labConsultations);
      setFilteredConsultations(labConsultations);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching consultations:', err);
      setError('Failed to fetch consultations');
      setLoading(false);
    }
  };

  const handleFileChange = (e, patientId) => {
    setSelectedFiles(prevState => ({
      ...prevState,
      [patientId]: e.target.files[0]
    }));
  };

  const handleFileUpload = async (patientId) => {
    const file = selectedFiles[patientId];
    if (!file) {
      alert('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`https://kenan-backend.onrender.com/api/upload/${patientId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.data.status === "ok") {
        alert('File uploaded successfully');
        setSelectedFiles(prevState => ({
          ...prevState,
          [patientId]: null
        }));
      } else {
        alert('File upload failed: ' + response.data.data);
      }
    } catch (err) {
      console.error('Error uploading file:', err);
      alert('Failed to upload file');
    }
  };

  const handleEstimatedTimeChange = (e, consultationId) => {
    setEstimatedTimes(prevState => ({
      ...prevState,
      [consultationId]: e.target.value
    }));
  };

  const handleEstimatedTimeSubmit = async (consultationId) => {
    const estimatedTime = estimatedTimes[consultationId];
    if (!estimatedTime) {
      alert('No estimated time entered');
      return;
    }

    try {
      const response = await axios.patch(`https://kenan-backend.onrender.com/api/consultation/${consultationId}/estimated-time`, {
        estimatedTime,
      });
      
      if (response.data.status === "ok") {
        alert('Estimated time updated successfully');
      } else {
        alert('Failed to update estimated time: ' + response.data.data);
      }
    } catch (err) {
      console.error('Error updating estimated time:', err);
      alert('Failed to update estimated time');
    }
  };

  useEffect(() => {
    fetchConsultations();

    // Set up polling every 5 seconds
    const interval = setInterval(fetchConsultations, 5000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const filtered = consultations.filter(consultation => 
      consultation.patientId.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredConsultations(filtered);
  }, [searchQuery, consultations]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (filteredConsultations.length === 0) return <div>No lab consultations found.</div>;

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
            background-color: #189cb3;
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
            flex-direction: column;
          }

          .content-container h1 {
            text-align: center;
            margin-bottom: 20px;
          }

          .table-container {
            flex: 1;
            overflow-y: auto;
          }

          .consultation-table {
            width: 100%;
            border-collapse: collapse;
          }

          .consultation-table th,
          .consultation-table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }

          .consultation-table th {
            background-color: #f2f2f2;
            color: black;
            position: sticky;
            top: 0;
            z-index: 1;
          }

          .file-upload {
            display: flex;
            flex-direction: column;
          }

          .file-upload input {
            margin-bottom: 10px;
          }

          .file-upload button {
            background-color: #189cb3;
            color: white;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
          }

          .file-upload button:hover {
            background-color: #186973;
          }

          .search-container {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
          }

          .search-container input {
            padding: 10px;
            width: 300px;
            border: 1px solid #ddd;
            border-radius: 5px;
          }
        `}
      </style>
      <div className="sidebar">
        <div>
          <h1>Lab Consultations</h1>
          <button className="logout-button">Log Out</button>
        </div>
      </div>
      <div className="content-container">
        <h1>Lab Consultations</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by Patient ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="table-container">
          <table className="consultation-table">
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Additional Notes</th>
                <th>Estimated Time</th>
                <th>Upload Report</th>
              </tr>
            </thead>
            <tbody>
              {filteredConsultations.map((consultation, index) => (
                <tr key={consultation._id || index}>
                  <td>{consultation.patientId}</td>
                  <td>{consultation.additionalNotes}</td>
                  <td>
                    <div className="estimated-time">
                      <input
                        type="text"
                        placeholder="Enter estimated time"
                        value={estimatedTimes[consultation._id] || ''}
                        onChange={(e) => handleEstimatedTimeChange(e, consultation._id)}
                      />
                      <button onClick={() => handleEstimatedTimeSubmit(consultation._id)}>Submit</button>
                    </div>
                  </td>
                  <td>
                    <div className="file-upload">
                      <input 
                        type="file" 
                        onChange={(e) => handleFileChange(e, consultation.patientId)} 
                      />
                      <button 
                        onClick={() => handleFileUpload(consultation.patientId)}
                      >
                        Upload
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ConsultationList;
