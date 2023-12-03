import React, { useState } from 'react';
import './PopUp.css';

const LocationPopup = ({ showModal, handleClose, handleLocationSubmit }) => {
  const [location, setLocation] = useState('');

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = () => {
    handleLocationSubmit(location);
  };

  return (
    showModal && (
      <div className="popup">
        <div className="popup-content">
          <span className="close-btn" onClick={handleClose}>
            &times;
          </span>
          <h2>Enter Location</h2>
          <input
            type="text"
            placeholder="Latitude, Longitude"
            value={location}
            onChange={handleInputChange}
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    )
  );
};

export default LocationPopup;