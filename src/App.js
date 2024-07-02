import React from 'react';
import { BrowserRouter as Router, Route, Switch, BrowserRouter, Routes } from 'react-router-dom';
import Home from './components/Home';
import AdminLogin from './components/AdminLogin';
import Doctor from './components/Doctor'
import PatientDetails from './components/PatientDetails';
import Consultation from './components/Consultation';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/admin" element={<AdminLogin/>} />
          <Route path="/doctor" element={<Doctor/>} />
          <Route path="/patient/:name" element={<PatientDetails />} />
          <Route path="/consultation" element={<Consultation/>} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
