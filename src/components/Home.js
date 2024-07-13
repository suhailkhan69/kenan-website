import React, { useState } from 'react';
import logo from '../images/kenan-logo-name.png';
import { useSpring, animated } from '@react-spring/web';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [role, setRole] = useState('');
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

  const logoSpring = useSpring({
    transform: 'scale(1)',
    from: { transform: 'scale(0)' },
    delay: 800,
  });

  const headingSpring = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 1000,
  });

  const selectSpring = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 1200,
  });

  const buttonSpring = useSpring({
    transform: 'scale(1)',
    from: { transform: 'scale(0)' },
    delay: 1400,
  });

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleButtonClick = () => {
    if (role) {
      navigate(`/${role}`);
    }
  };

  return (
    <animated.div style={{ ...styles.container, ...containerSpring }}>
      <animated.div style={{ ...styles.left, ...leftSpring }}>
        <animated.img src={logo} alt="Logo" style={{ ...styles.logo, ...logoSpring }} />
      </animated.div>
      <animated.div style={{ ...styles.right, ...rightSpring }}>
        <animated.h2 style={{ ...styles.heading, ...headingSpring }}>Welcome</animated.h2>
        <animated.div style={{ ...styles.roleSelect, ...selectSpring }}>
          <label htmlFor="role" style={styles.label}>Select Role</label>
          <select id="role" name="role" style={styles.select} onChange={handleRoleChange}>
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="reception">Reception</option>
            <option value="doctor">Doctor</option>
            <option value="lablogin">Lab</option>
            <option value="pharmacylogin">Pharmacy</option>
          </select>
          <animated.button style={{ ...styles.doneButton, ...buttonSpring }} onClick={handleButtonClick}>Done</animated.button>
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
  heading: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#fff',
  },
  roleSelect: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  label: {
    marginBottom: '10px',
    fontSize: '18px',
    color: '#fff',
  },
  select: {
    padding: '10px',
    fontSize: '16px',
    marginBottom: '20px',
    width: '200px',
  },
  doneButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Home;
