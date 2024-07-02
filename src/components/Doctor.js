import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Doctor.css';

const Doctor = () => {
  const [activeTab, setActiveTab] = useState('Waiting List');
  const navigate = useNavigate();

  const handleNameClick = (name) => {
    navigate(`/patient/${name}`);
  };

  return (
    <div className="container">
      <div className="sidebar">
        <div className="profile">
          <h3>Dr. John Doe</h3>
        </div>
        <ul className="menu">
          <li className={activeTab === 'Waiting List' ? 'active' : ''} onClick={() => setActiveTab('Waiting List')}>Waiting List</li>
          <li className={activeTab === 'Patient Files' ? 'active' : ''} onClick={() => setActiveTab('Patient Files')}>Patient Files</li>
        </ul>
        <button className="logout">Log Out</button>
      </div>
      <div className="main-content">
        <header>
          <h2>{activeTab}</h2>
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
          </div>
        </header>
        {activeTab === 'Waiting List' && (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Patient ID</th>
                <th>Status</th>
                <th>File</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Arlene McCoy</td>
                <td>September 9, 2013</td>
                <td>704.555.0127</td>
                <td><span className="status checked-in">Checked In</span></td>
                <td>...</td>
              </tr>
              <tr>
                <td>Cody Fisher</td>
                <td>August 2, 2013</td>
                <td>205.555.0100</td>
                <td><span className="status checked-in">Checked In</span></td>
                <td>...</td>
              </tr>
              {/* More rows */}
            </tbody>
          </table>
        )}
        {activeTab === 'Patient Files' && (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Patient ID</th>
              </tr>
            </thead>
            <tbody>
              <tr onClick={() => handleNameClick('Arlene McCoy')}>
                <td className="clickable">Arlene McCoy</td>
                <td>September 9, 2013</td>
                <td>704.555.0127</td>
              </tr>
              <tr onClick={() => handleNameClick('Cody Fisher')}>
                <td className="clickable">Cody Fisher</td>
                <td>August 2, 2013</td>
                <td>205.555.0100</td>
              </tr>
              {/* More rows */}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Doctor;
