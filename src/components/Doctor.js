import React from 'react';
import logo from '../images/kenan-logo-name.png';
import { useSpring, animated } from '@react-spring/web';
import { useNavigate } from 'react-router-dom';

const Doctor = () => {
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

  const buttonSpring = useSpring({
    transform: 'scale(1)',
    from: { transform: 'scale(0)' },
    delay: 1000,
  });

  const handleSignupClick = () => {
    navigate('/doctor/signup');
  };

  const handleLoginClick = () => {
    navigate('/doctor/login');
  };

  return (
    <animated.div style={{ ...styles.container, ...containerSpring }}>
      <animated.div style={{ ...styles.left, ...leftSpring }}>
        <animated.img src={logo} alt="Logo" style={{ ...styles.logo, ...logoSpring }} />
      </animated.div>
      <animated.div style={{ ...styles.right, ...rightSpring }}>
        <div style={styles.buttonContainer}>
          <animated.button style={{ ...styles.button, ...buttonSpring }} onClick={handleSignupClick}>
            Doctor Signup
          </animated.button>
          <animated.button style={{ ...styles.button, ...buttonSpring }} onClick={handleLoginClick}>
            Doctor Login
          </animated.button>
        </div>
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
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '20px',
  },
};

export default Doctor;
