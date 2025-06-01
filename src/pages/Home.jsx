import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const goToItinerary = () => {
    navigate('/itinerary');
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.content}>
        <h1 style={styles.title}>Your Journey Begins Here</h1>
        <p style={styles.subtitle}>Plan, organize, and visualize your perfect trip</p>
        <button onClick={goToItinerary} style={styles.button}>
          Start Planning Now
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    minHeight: '100vh', // takes full viewport height
    backgroundImage: 'url(https://th.bing.com/th/id/OIP.P5taAsJVGpbD7BkMD76L1AHaI9?rs=1&pid=ImgDetMain)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  content: {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    color: 'white',
    padding: '20px',
    maxWidth: '90%',
  },
  title: {
    fontSize: '3.5rem',
    fontWeight: '700',
    marginBottom: '20px',
    textShadow: '2px 2px 6px rgba(0, 0, 0, 0.6)',
  },
  subtitle: {
    fontSize: '1.5rem',
    marginBottom: '40px',
    textShadow: '1px 1px 4px rgba(0, 0, 0, 0.6)',
  },
  button: {
    padding: '15px 30px',
    fontSize: '1.2rem',
    fontWeight: '600',
    backgroundColor: '#2980b9',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: '0.3s',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
  },
};

export default Home;
