import React, { useState, useRef } from 'react';
import './FloatingActionButton.css';
import { IoAdd, IoClose, IoCheckmark } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');
  const fabContainerRef = useRef(null);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setUrl('');
    }
  };

  const handleBlur = (e) => {
    // Check if the newly focused element is outside the component
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsOpen(false);
      setUrl('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    // Simply navigate to encoded URL route; VideoPage will process it.
    navigate(`/video/${encodeURIComponent(url.trim())}`);

    // Reset form
    setUrl('');
    setIsOpen(false);
  };

  return (
    <div
      className="fab-container"
      ref={fabContainerRef}
      onBlur={handleBlur}
      tabIndex={-1}
    >
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