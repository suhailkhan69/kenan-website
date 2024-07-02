import React from 'react';
import './AdminLogin.css';

const AdminLogin = () => {
  return (
    <div className="container">
      <div className="left">
        <h2>Admin Page</h2>
        <form>
         
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" placeholder="Username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Password" />
          </div>
          <button type="submit">Sign in</button>
        </form>
      </div>
      <div className="right">
        <div className="white-box"></div>
      </div>
    </div>
  );
}

export default AdminLogin;
