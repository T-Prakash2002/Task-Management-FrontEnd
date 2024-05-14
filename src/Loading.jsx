import React from 'react';
import './index.css' // Import your CSS file

export default function Loading() {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}
