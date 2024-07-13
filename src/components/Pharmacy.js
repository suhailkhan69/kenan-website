import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pharmacy = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredConsultations, setFilteredConsultations] = useState([]);

  const fetchConsultations = async () => {
    try {
      const response = await axios.get('http://192.168.42.107:5001/api/consultations');
      const pharmacyConsultations = response.data.data.filter(
        consultation => consultation.selectedOption === 'pharmacy'
      );
      setConsultations(pharmacyConsultations);
      setFilteredConsultations(pharmacyConsultations);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching consultations:', err);
      setError('Failed to fetch consultations');
      setLoading(false);
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
  if (filteredConsultations.length === 0) return <div>No pharmacy consultations found.</div>;

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
          <h1>Pharmacy Consultations</h1>
          <button className="logout-button">Log Out</button>
        </div>
      </div>
      <div className="content-container">
        <h1>Pharmacy Consultations</h1>
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
              </tr>
            </thead>
            <tbody>
              {filteredConsultations.map((consultation, index) => (
                <tr key={consultation._id || index}>
                  <td>{consultation.patientId}</td>
                  <td>{consultation.additionalNotes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Pharmacy;
