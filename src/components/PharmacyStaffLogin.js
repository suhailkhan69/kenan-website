import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../images/kenan-logo-name.png';

const PharmacyStaffLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const containerSpring = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 200,
  });
  const leftSpring = useSpring({
    transform: 'translateX(0)',
    from: { transform: 'translateX(-100%)' },
    delay: 400,
  });
  const rightSpring = useSpring({
    transform: 'translateX(0)',
    from: { transform: 'translateX(100%)' },
    delay: 600,
  });
  const formSpring = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 800,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://192.168.42.107:5001/pharmacy/login', { email, password });
      console.log('Login successful', response.data);
      navigate('/pharmacy');
    } catch (err) {
      setError('Invalid email or password');
      console.error('Login error', err);
    }
  };

  return (
    <animated.div style={{ ...styles.container, ...containerSpring }}>
      <animated.div style={{ ...styles.left, ...leftSpring }}>
        <img src={logo} alt="Logo" style={styles.logo} />
      </animated.div>
      <animated.div style={{ ...styles.right, ...rightSpring }}>
        <animated.div style={{ ...styles.formContainer, ...formSpring }}>
          <h2 style={styles.heading}>PHARMACY STAFF LOGIN</h2>
          <form onSubmit={handleSubmit}>
            {error && <div style={styles.error}>{error}</div>}
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>Email</label>
              <input 
                type="text" 
                id="email" 
                name="email" 
                placeholder="Email" 
                style={styles.input} 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.label}>Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder="Password" 
                style={styles.input} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" style={styles.button}>Sign in</button>
          </form>
        </animated.div>
      </animated.div>
    </animated.div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
  },
  left: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  right: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#189cb3',
  },
  logo: {
    width: '500px',
    height: 'auto',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  heading: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  formGroup: {
    marginBottom: '20px',
    width: '100%',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '16px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
};

export default PharmacyStaffLogin;