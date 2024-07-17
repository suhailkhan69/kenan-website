import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [patientSearchQuery, setPatientSearchQuery] = useState('');
  const [doctorSearchQuery, setDoctorSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patientId: '',
    doctor: '',
    doctorNumber: '',
    date: '',
    symptoms: ''
  });

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://192.168.42.61:5001/api/appointments');
      console.log('Fetched Appointments:', response.data.data);
      setAppointments(response.data.data);
    } catch (error) {
      console.error('Error fetching appointments', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
    const interval = setInterval(() => {
      fetchAppointments();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const response = await axios.patch(`http://192.168.42.61:5001/api/appointments/${id}/status`, { status });
      const updatedAppointment = response.data.data;
      setAppointments(prevAppointments => prevAppointments.map(appointment =>
        appointment._id === updatedAppointment._id ? updatedAppointment : appointment
      ));
    } catch (error) {
      console.error('Error updating status', error);
    }
  };

  const updateCheckIn = async (id, checkedIn) => {
    try {
      const response = await axios.patch(`http://192.168.42.61:5001/api/appointments/${id}/checkedin`, { checkedIn });
      const updatedAppointment = response.data.data;
      setAppointments(prevAppointments => prevAppointments.map(appointment =>
        appointment._id === updatedAppointment._id ? updatedAppointment : appointment
      ));
    } catch (error) {
      console.error('Error updating check-in status', error);
    }
  };

  const handlePatientSearchChange = (e) => {
    setPatientSearchQuery(e.target.value);
  };

  const handleDoctorSearchChange = (e) => {
    setDoctorSearchQuery(e.target.value);
  };

  const filteredAppointments = appointments.filter(appointment =>
    (appointment.patientId?.name || '').toLowerCase().includes(patientSearchQuery.toLowerCase()) &&
    appointment.doctor.toLowerCase().includes(doctorSearchQuery.toLowerCase())
  );

  const handleAddAppointmentClick = () => {
    setShowAddForm(true);
  };

  const handleAddFormChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://192.168.42.61:5001/api/appointments', newAppointment);
      fetchAppointments();  // Fetch the updated list of appointments after adding a new one
      setShowAddForm(false);
      setNewAppointment({
        patientId: '',
        doctor: '',
        doctorNumber: '',
        date: '',
        symptoms: ''
      });
    } catch (error) {
      console.error('Error adding appointment', error);
      alert(`Error adding appointment: ${error.response?.data?.data || error.message}`);
    }
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
  };

  return (
    <div className="container">
      <style>
        {`
          :root {
            --bg-color: #ffffff;
            --text-color: #000000;
            --sidebar-bg: #2c8c99;
            --sidebar-button-bg: #186973;
            --sidebar-button-hover: #14595d;
            --table-header-bg: #f2f2f2;
            --table-border: #dddddd;
          }

          .container {
            display: flex;
            height: 100vh;
            background-color: var(--bg-color);
            color: var(--text-color);
          }

          .sidebar {
            width: 250px;
            background-color: var(--sidebar-bg);
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
            background-color: var(--sidebar-button-bg);
            border: none;
            color: white;
            padding: 10px;
            cursor: pointer;
            text-align: left;
            margin-bottom: 10px;
          }

          .sidebar button:hover {
            background-color: var(--sidebar-button-hover);
          }

          .appointment-list-container {
            flex: 1;
            padding: 20px;
            display: flex;
            flex-direction: column;
          }

          .appointment-list-container h1 {
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
            background-color: var(--bg-color);
            color: var(--text-color);
            border: 1px solid var(--table-border);
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
            border: 1px solid var(--table-border);
            padding: 8px;
            text-align: left;
          }

          .appointment-table th {
            background-color: var(--table-header-bg);
            color: var(--text-color);
            position: sticky;
            top: 0;
            z-index: 0;
          }

          .logout-button {
            background-color: var(--sidebar-button-bg);
            border: none;
            color: white;
            padding: 10px;
            cursor: pointer;
          }

          .logout-button:hover {
            background-color: var(--sidebar-button-hover);
          }

          .popup {
            display: ${showAddForm ? 'flex' : 'none'};
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            justify-content: center;
            align-items: center;
            z-index: 2;
          }

          .popup-content {
            background-color: var(--bg-color);
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 600px;
            max-height: 80vh;
            overflow-y: auto;
          }

          .popup-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
          }

          .popup-header h2 {
            margin: 0;
          }

          .close-button {
            background: none;
            border: none;
            font-size: 1.5em;
            cursor: pointer;
          }

          .form-group {
            margin-bottom: 15px;
          }

          .form-group label {
            display: block;
            margin-bottom: 5px;
          }

          .form-group input,
          .form-group select {
            width: 100%;
            padding: 8px;
            box-sizing: border-box;
            background-color: var(--bg-color);
            color: var(--text-color);
            border: 1px solid var(--table-border);
          }

          .form-group button {
            background-color: var(--sidebar-button-bg);
            border: none;
            color: white;
            padding: 10px;
            cursor: pointer;
            margin-top: 10px;
          }

          .form-group button:hover {
            background-color: var(--sidebar-button-hover);
          }
        `}
      </style>
      <div className="sidebar">
        <div>
          <h1>Reception</h1>
          <button onClick={handleAddAppointmentClick}>Add Appointment</button>
        </div>
        <button className="logout-button">Log Out</button>
      </div>
      <div className="appointment-list-container">
        <h1>Appointment List</h1>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search by patient name"
            value={patientSearchQuery}
            onChange={handlePatientSearchChange}
          />
          <input
            type="text"
            className="search-input"
            placeholder="Search by doctor name"
            value={doctorSearchQuery}
            onChange={handleDoctorSearchChange}
          />
        </div>
        <div className="table-container">
          <table className="appointment-table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Doctor</th>
                <th>Date & Time</th>
                <th>Patient ID</th>
                <th>Status</th>
                <th>Checked In</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{appointment.patientId ? appointment.patientId.name : 'Unknown'}</td>
                  <td>{appointment.doctor}</td>
                  <td>{new Date(appointment.date).toLocaleString()}</td>
                  <td>{appointment.patientId ? appointment.patientId._id : 'Unknown'}</td>
                  <td>
                    <select
                      value={appointment.status}
                      onChange={(e) => updateStatus(appointment._id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <select
                      value={appointment.checkedIn}
                      onChange={(e) => updateCheckIn(appointment._id, e.target.value === 'true')}
                    >
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="popup">
        <div className="popup-content">
          <div className="popup-header">
            <h2>Add Appointment</h2>
            <button className="close-button" onClick={handleCloseAddForm}>&times;</button>
          </div>
          <form onSubmit={handleAddFormSubmit}>
            <div className="form-group">
              <label htmlFor="patientId">Patient ID</label>
              <input
                type="text"
                id="patientId"
                name="patientId"
                value={newAppointment.patientId}
                onChange={handleAddFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="doctor">Doctor</label>
              <input
                type="text"
                id="doctor"
                name="doctor"
                value={newAppointment.doctor}
                onChange={handleAddFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="doctorNumber">Doctor Number</label>
              <input
                type="text"
                id="doctorNumber"
                name="doctorNumber"
                value={newAppointment.doctorNumber}
                onChange={handleAddFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date & Time</label>
              <input
                type="datetime-local"
                id="date"
                name="date"
                value={newAppointment.date}
                onChange={handleAddFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="symptoms">Symptoms</label>
              <input
                type="text"
                id="symptoms"
                name="symptoms"
                value={newAppointment.symptoms}
                onChange={handleAddFormChange}
              />
            </div>
            <button type="submit">Add Appointment</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentList;
