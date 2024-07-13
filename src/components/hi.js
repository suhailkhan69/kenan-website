import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Hi = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://192.168.42.107:5001/api/appointments');
      console.log('API Response:', response.data); // Debugging line
      setAppointments(response.data.data);
    } catch (error) {
      console.error('Error fetching appointments', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
    const interval = setInterval(() => {
      fetchAppointments();
    }, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const approvedCheckedInAppointments = appointments.filter(
    appointment => appointment.status === 'approved' && appointment.checkedIn === true
  );

  return (
    <div>
      <h1>Approved and Checked-In Appointments</h1>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : approvedCheckedInAppointments.length === 0 ? (
          <p>No approved and checked-in appointments found.</p>
        ) : (
          <ul>
            {approvedCheckedInAppointments.map(appointment => (
              <li key={appointment._id}>
                <p>Doctor: {appointment.doctor}</p>
                <p>Date: {new Date(appointment.date).toLocaleString()}</p>
                <p>Patient ID: {appointment.patientId}</p>
                <p>Symptoms: {appointment.symptoms}</p>
                <p>Status: {appointment.status}</p>
                <p>Checked In: {appointment.checkedIn ? 'Yes' : 'No'}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Hi;
