import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DoctorPage = () => {
  const { number } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://192.168.42.61:5001/api/appointments');
      setAppointments(response.data.data);
    } catch (error) {
      console.error('Error fetching appointments', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
    const interval = setInterval(fetchAppointments, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const doctorNumber = parseInt(localStorage.getItem('doctorNumber'), 10);

  const doctorAppointments = appointments.filter(
    appointment => appointment.doctorNumber === doctorNumber && appointment.status === 'approved' && appointment.checkedIn
  ).sort((a, b) => new Date(a.date) - new Date(b.date));

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredAppointments = doctorAppointments.filter(appointment =>
    appointment.patientId.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConsultationChange = async (appointmentId, consultationStarted) => {
    try {
      await axios.patch(`http://192.168.42.61:5001/api/appointments/${appointmentId}/consultation-start`, { consultationStarted });
      fetchAppointments(); // Refresh the list after updating the consultation status
    } catch (error) {
      console.error('Error updating consultation status', error);
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
            flex-direction: column;
          }

          .content-container h1 {
            text-align: center;
            margin-bottom: 20px;
          }

          .search-container {
            text-align: center;
            margin-bottom: 20px;
          }

          .search-input {
            padding: 10px;
            width: 300px;
            font-size: 16px;
            margin-right: 10px;
          }

          .table-container {
            flex: 1;
            overflow-y: auto;
            position: relative;
          }

          .appointment-table {
            width: 100%;
            border-collapse: collapse;
          }

          .appointment-table th,
          .appointment-table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }

          .appointment-table th {
            background-color: #f2f2f2;
            color: black;
            position: sticky;
            top: 0;
            z-index: 1;
          }

          .logout-button {
            background-color: #186973;
            border: none;
            color: white;
            padding: 10px;
            cursor: pointer.
          }

          .logout-button:hover {
            background-color: #14595d;
          }

          .consultation-select {
            margin-right: 10px;
          }

          .patient-file-button {
            background-color: #186973;
            border: none;
            color: white;
            padding: 5px 10px;
            cursor: pointer;
          }

          .patient-file-button:hover {
            background-color: #14595d;
          }
        `}
      </style>
      <div className="sidebar">
        <div>
          <h1>Doctor</h1>
          <button className="logout-button">Log Out</button>
        </div>
      </div>
      <div className="content-container">
        <h1>Waiting List</h1>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search by patient name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : filteredAppointments.length === 0 ? (
          <p>No approved and checked-in appointments found.</p>
        ) : (
          <div className="table-container">
            <table className="appointment-table">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Date & Time</th>
                  <th>Consultation</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map(appointment => (
                  <tr key={appointment._id}>
                    <td>{appointment.patientId.name}</td>
                    <td>{new Date(appointment.date).toLocaleString()}</td>
                    <td>
                      <select
                        className="consultation-select"
                        value={appointment.consultationStarted ? "Yes" : "No"}
                        onChange={(e) =>
                          handleConsultationChange(appointment._id, e.target.value === "Yes")
                        }
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                    </td>
                    <td>
                      {appointment.consultationStarted && (
                        <button
                          className="patient-file-button"
                          onClick={() => navigate(`/patient/${appointment.patientId._id}`)}
                        >
                          Patient File
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorPage;
