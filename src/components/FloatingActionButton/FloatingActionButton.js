import React, { useState, useRef } from 'react';
import './FloatingActionButton.css';
import { IoAdd, IoClose, IoCheckmark } from 'react-icons/io5';
import apiService from '../../services/apiService';
import toast from 'react-hot-toast';

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fabContainerRef = useRef(null);

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
    if (!url.trim() || isLoading) return;

    setIsLoading(true);

    try {
      // Show loading toast
      const loadingToast = toast.loading('Processing video URL...');

      // Call API
      const result = await apiService.getVideo(url.trim());

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      if (result.success) {
        // Success case
        toast.success('Video processed successfully!');
        console.log('Video API Success:', result.data);

        // Reset form
        setUrl('');
        setIsOpen(false);
      } else {
        // Error case (already handled by interceptor, but log for debugging)
        console.log('Video API Error:', result.error);
      }
    } catch (error) {
      // Unexpected error
      console.error('Unexpected Error:', error);
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
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
                disabled={isLoading}
              />
              <button
                type="submit"
                className={`fab-submit-button ${isLoading ? 'loading' : ''}`}
                disabled={!url.trim() || isLoading}
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
        disabled={isLoading}
      >
        {isOpen ? <IoClose size={24} /> : <IoAdd size={24} />}
      </button>
    </div>
  );
};

export default FloatingActionButton; 