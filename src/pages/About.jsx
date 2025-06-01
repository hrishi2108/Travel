


export default function About() {
  return (
    <div style={styles.aboutContainer}>
      <h2 style={styles.heading}>About Our Travel Itinerary Builder</h2>
      <div style={styles.content}>
        <p style={styles.paragraph}>
          Welcome to our Travel Itinerary Builder - your ultimate tool for planning and organizing your trips with ease!
        </p>
        
        <div style={styles.featureSection}>
          <h3 style={styles.subHeading}>Our Features</h3>
          <ul style={styles.featureList}>
            <li style={styles.featureItem}>Create detailed travel itineraries</li>
            <li style={styles.featureItem}>Add multiple destinations with dates</li>
            <li style={styles.featureItem}>Include activities for each location</li>
            <li style={styles.featureItem}>Visualize your trip on an interactive map</li>
            <li style={styles.featureItem}>Save and manage all your travel plans</li>
          </ul>
        </div>
        
        <div style={styles.contactSection}>
          <h3 style={styles.subHeading}>Contact Us</h3>
          <p style={styles.paragraph}>
            Have questions or feedback? We'd love to hear from you!
          </p>
          <p style={styles.contactInfo}>
            Email: <a href="mailto:info@travelitinerary.com" style={styles.link}>info@travelitinerary.com</a>
          </p>
          <p style={styles.contactInfo}>
            Phone: <a href="tel:+1234567890" style={styles.link}>9845671255</a>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  aboutContainer: {
    maxWidth: '1000px',
    margin: '40px auto',
    padding: '30px',
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#333',
  },
  heading: {
    textAlign: 'center',
    color: '#2980b9',
    fontSize: '2.2rem',
    marginBottom: '30px',
    fontWeight: '600',
  },
  subHeading: {
    color: '#2c3e50',
    fontSize: '1.5rem',
    margin: '25px 0 15px',
    borderBottom: '2px solid #eee',
    paddingBottom: '8px',
  },
  content: {
    lineHeight: '1.6',
    fontSize: '1.1rem',
  },
  paragraph: {
    margin: '15px 0',
    color: '#555',
  },
  featureSection: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    margin: '20px 0',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  featureList: {
    listStyleType: 'none',
    paddingLeft: '0',
  },
  featureItem: {
    padding: '10px 15px',
    margin: '8px 0',
    backgroundColor: '#f0f8ff',
    borderRadius: '6px',
    position: 'relative',
    paddingLeft: '35px',
  },
  teamSection: {
    margin: '30px 0',
  },
  teamGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '25px',
    marginTop: '20px',
  },
  teamMember: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    transition: 'transform 0.3s ease',
  },
  avatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    backgroundColor: '#ddd',
    margin: '0 auto 15px',
    backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  },
  memberName: {
    color: '#2c3e50',
    margin: '10px 0 5px',
  },
  memberRole: {
    color: '#7f8c8d',
    fontSize: '0.9rem',
    margin: '0',
  },
  contactSection: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    marginTop: '30px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  contactInfo: {
    margin: '10px 0',
    color: '#555',
  },
  link: {
    color: '#2980b9',
    textDecoration: 'none',
    fontWeight: '500',
  },
  link: {
    color: '#2980b9',
    textDecoration: 'none',
    fontWeight: '500',
  },
};
