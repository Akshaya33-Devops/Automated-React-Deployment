// components/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <img
        src="https://www.digitalmesh.com/blog/wp-content/uploads/2020/05/404-error.jpg"
        alt="Not Found"
        style={{ width: '200px', height: '200px', objectFit: 'contain', marginBottom: '20px' }}
      />
      <h1 style={{ fontSize: '36px', marginBottom: '10px' }}>404 Not Found</h1>
      <p style={{ fontSize: '20px', marginBottom: '20px' }}>The page you're looking for does not exist.</p>
      <Link
        to="/"
        style={{
          textDecoration: 'none',
          color: '#007BFF',
          fontSize: '18px',
          fontWeight: 'bold',
          border: '2px solid #007BFF',
          padding: '10px 20px',
          borderRadius: '5px',
        }}
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;

