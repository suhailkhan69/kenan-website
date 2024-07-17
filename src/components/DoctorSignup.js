import React, { useState } from 'react';
import axios from 'axios';
import { useSpring, animated } from '@react-spring/web';

const DoctorSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post(`https://kenan-backend.onrender.com/doctor/signup`, {
        name,
        email,
        password,
        number,
      });
      alert(response.data.data);
    } catch (error) {
      console.error('Error signing up', error);
      alert('Error signing up');
    }
  };

  const containerSpring = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 200,
  });

  const signupBoxSpring = useSpring({
    transform: 'scale(1)',
    from: { transform: 'scale(0)' },
    delay: 400,
  });

  const inputSpring = useSpring({
    transform: 'translateY(0)',
    from: { transform: 'translateY(20px)' },
    opacity: 1,
    from: { opacity: 0 },
    delay: 600,
  });

  const buttonSpring = useSpring({
    transform: 'translateY(0)',
    from: { transform: 'translateY(20px)' },
    opacity: 1,
    from: { opacity: 0 },
    delay: 800,
  });

  return (
    <animated.div style={{ ...styles.container, ...containerSpring }}>
      <animated.div style={{ ...styles.signupBox, ...signupBoxSpring }}>
        <h1 style={styles.heading}>Doctor Signup</h1>
        <animated.input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ ...styles.input, ...inputSpring }}
        />
        <animated.input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ ...styles.input, ...inputSpring }}
        />
        <animated.input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ ...styles.input, ...inputSpring }}
        />
        <animated.input
          type="number"
          placeholder="Doctor Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          style={{ ...styles.input, ...inputSpring }}
        />
        <animated.button onClick={handleSignup} style={{ ...styles.button, ...buttonSpring }}>
          Signup
        </animated.button>
      </animated.div>
    </animated.div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#189cb3',
  },
  signupBox: {
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
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
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
};

export default DoctorSignup;
