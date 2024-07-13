import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AdminLogin from './components/AdminLogin';
import Doctor from './components/Doctor';
import PatientDetails from './components/PatientDetails';
import Consultation from './components/Consultation';
import AppointmentList from './components/AppointmentList'; // Import the new component
import Hi from './components/hi';
import ApprovedCheckedInList from './components/ApprovedCheckedInList';
import DoctorLogin from './components/DoctorLogin';
import DoctorPage from './components/DoctorPage';
import DoctorSignup from './components/DoctorSignup';
import Lab from './components/Lab';
import Pharmacy from './components/Pharmacy';
import AdminPage from './components/AdminPage';
import ReceptionStaffLogin from './components/ReceptionStaffLogin';
import LabStaffLogin from './components/LabStaffLogin';
import PharmacyStaffLogin from './components/PharmacyStaffLogin';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/patient/:patientId" element={<PatientDetails />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/appointments" element={<AppointmentList />} />
          <Route path="/checkedinappointment" element={<ApprovedCheckedInList />} />
          <Route path="/hi" element={ < Hi />} />
          <Route path="/doctor/login" element={<DoctorLogin/>} />
          <Route path="/doctor/:id" element={<DoctorPage/>} />
          <Route path="/doctor/signup" element={<DoctorSignup />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/adminpage" element={<AdminPage />} />
          <Route path="/reception" element={<ReceptionStaffLogin />} />
          <Route path="/lablogin" element={<LabStaffLogin />} />
          <Route path="/pharmacylogin" element={<PharmacyStaffLogin />} />

          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
