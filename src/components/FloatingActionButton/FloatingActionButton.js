import React, { useState } from 'react';
import './FloatingActionButton.css';
import { IoAdd, IoClose, IoCheckmark } from 'react-icons/io5';

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setUrl('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      console.log('YouTube URL:', url);
      // TODO: Handle URL submission
      setUrl('');
      setIsOpen(false);
    }
  };

  return (
    <div className="fab-container">
      {/* URL Input Overlay */}
      {isOpen && (
        <div className="fab-overlay">
          <form onSubmit={handleSubmit} className="fab-form">
            <div className="fab-input-container">
              <input
                type="url"
                placeholder="Enter YouTube URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="fab-input"
                autoFocus
              />
              <button 
                type="submit" 
                className="fab-submit-button"
                disabled={!url.trim()}
              >
                <IoCheckmark size={20} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      <button 
        className={`fab-button ${isOpen ? 'fab-open' : ''}`}
        onClick={handleToggle}
        title={isOpen ? 'Close' : 'Enter URL'}
      >
        {isOpen ? <IoClose size={24} /> : <IoAdd size={24} />}
      </button>
    </div>
  );
};

export default FloatingActionButton; 