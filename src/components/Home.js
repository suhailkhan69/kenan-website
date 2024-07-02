import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="container">
      <div className="left">
        <h2>WELCOME</h2>
        <div className="button-group">
          <a href="/admin" className="option-button">Admin</a>
          <button className="option-button">Reception</button>
          <a href="/doctor" className="option-button">Doctor</a>
          <button className="option-button">Lab</button>
          <button className="option-button">Pharmacy</button>
        </div>
      </div>
      <div className="right">
        <div className="white-box"></div>
      </div>
    </div>
  );
}

export default Home;
