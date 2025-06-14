import React, { useState } from 'react';
import './VideoMetadata.css';
import { IoThumbsUp, IoThumbsDown, IoEye, IoCalendarOutline, IoChevronDown, IoChevronUp } from 'react-icons/io5';

const VideoMetadata = ({ metadata }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  if (!metadata) {
    return (
      <div className="video-metadata">
        <div className="metadata-loading">
          <div className="loading-placeholder title"></div>
          <div className="loading-placeholder stats"></div>
        </div>
      </div>
    );
  }

  const formatViewCount = (views) => {
    if (!views) return '0 views';
    
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M views`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K views`;
    }
    return `${views.toLocaleString()} views`;
  };

  const formatLikeCount = (likes) => {
    if (!likes) return '0';
    
    if (likes >= 1000000) {
      return `${(likes / 1000000).toFixed(1)}M`;
    } else if (likes >= 1000) {
      return `${(likes / 1000).toFixed(1)}K`;
    }
    return likes.toLocaleString();
  };

  const formatUploadDate = (dateString) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) return '1 day ago';
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
      if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
      return `${Math.floor(diffDays / 365)} years ago`;
    } catch (error) {
      return dateString;
    }
  };

  const formatDuration = (duration) => {
    if (!duration) return '';
    
    // Parse duration format HH:MM:SS or MM:SS
    const parts = duration.split(':');
    if (parts.length === 3) {
      return `${parts[0]}:${parts[1]}:${parts[2]}`;
    } else if (parts.length === 2) {
      return `${parts[0]}:${parts[1]}`;
    }
    return duration;
  };

  const truncateDescription = (text, maxLength = 200) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const renderDescription = () => {
    if (!metadata.description) return null;

    const description = isDescriptionExpanded 
      ? metadata.description 
      : truncateDescription(metadata.description);

    // Convert URLs to links and preserve line breaks
    const formattedDescription = description
      .split('\n')
      .map((line, index) => (
        <React.Fragment key={index}>
          {line.split(' ').map((word, wordIndex) => {
            if (word.startsWith('http')) {
              return (
                <a 
                  key={wordIndex}
                  href={word} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="description-link"
                >
                  {word}
                </a>
              );
            }
            return word + ' ';
          })}
          {index < description.split('\n').length - 1 && <br />}
        </React.Fragment>
      ));

    return formattedDescription;
  };

  return (
    <div className="video-metadata">
      {/* Title */}
      <h1 className="video-title">{metadata.title}</h1>

      {/* Stats and Actions Bar */}
      <div className="video-stats-bar">
        <div className="video-stats">
          <div className="stat-item">
            <IoEye className="stat-icon" />
            <span>{formatViewCount(metadata.viewCount)}</span>
          </div>
          <div className="stat-item">
            <IoCalendarOutline className="stat-icon" />
            <span>{formatUploadDate(metadata.uploadDate)}</span>
          </div>
          {metadata.duration && (
            <div className="stat-item">
              <span>Duration: {formatDuration(metadata.duration)}</span>
            </div>
          )}
        </div>

        <div className="video-actions">
          <button className="action-button like-button">
            <IoThumbsUp className="action-icon" />
            <span>{formatLikeCount(metadata.likeCount)}</span>
          </button>
          
          {metadata.dislikeCount > 0 && (
            <button className="action-button dislike-button">
              <IoThumbsDown className="action-icon" />
              <span>{formatLikeCount(metadata.dislikeCount)}</span>
            </button>
          )}
        </div>
      </div>

      {/* Channel Info */}
      <div className="channel-info">
        <div className="channel-details">
          <h3 className="channel-name">{metadata.author}</h3>
          {metadata.channelId && (
            <p className="channel-id">Channel ID: {metadata.channelId}</p>
          )}
        </div>
      </div>

      {/* Description */}
      {metadata.description && (
        <div className="video-description">
          <div className="description-content">
            {renderDescription()}
          </div>
          
          {metadata.description.length > 200 && (
            <button 
              className="description-toggle"
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            >
              <span>{isDescriptionExpanded ? 'Show less' : 'Show more'}</span>
              {isDescriptionExpanded ? <IoChevronUp /> : <IoChevronDown />}
            </button>
          )}
        </div>
      )}

      {/* Keywords */}
      {metadata.keywords && metadata.keywords.length > 0 && (
        <div className="video-keywords">
          <h4>Tags</h4>
          <div className="keywords-list">
            {metadata.keywords.slice(0, 10).map((keyword, index) => (
              <span key={index} className="keyword-tag">
                {keyword}
              </span>
            ))}
            {metadata.keywords.length > 10 && (
              <span className="keyword-more">
                +{metadata.keywords.length - 10} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoMetadata; 