import React, { useState, useRef, useCallback } from 'react';
import './VideoControls.css';
import { 
  IoPlay, 
  IoPause, 
  IoVolumeHigh, 
  IoVolumeMedium, 
  IoVolumeLow, 
  IoVolumeOff,
  IoExpand,
  IoContract,
  IoSettings
} from 'react-icons/io5';

const VideoControls = ({
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  playbackRate,
  isFullscreen,
  showControls,
  onPlay,
  onSeek,
  onVolumeChange,
  onMute,
  onPlaybackRateChange,
  onFullscreen,
  onQualityClick
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isVolumeHovered, setIsVolumeHovered] = useState(false);
  const [showPlaybackRates, setShowPlaybackRates] = useState(false);
  const progressRef = useRef(null);
  const volumeRef = useRef(null);

  // Format time for display
  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Progress bar handling with improved precision
  const handleProgressMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
    const rect = progressRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newTime = percent * duration;
    onSeek(newTime);
  }, [duration, onSeek]);

  const handleProgressMouseMove = useCallback((e) => {
    if (!isDragging) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newTime = percent * duration;
    onSeek(newTime);
  }, [isDragging, duration, onSeek]);

  const handleProgressMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Volume control handling with improved precision
  const handleVolumeMouseDown = useCallback((e) => {
    e.preventDefault();
    const rect = volumeRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    onVolumeChange(percent);
  }, [onVolumeChange]);

  // Progress bar keyboard navigation
  const handleProgressKeyDown = useCallback((e) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        onSeek(Math.max(0, currentTime - 10));
        break;
      case 'ArrowRight':
        e.preventDefault();
        onSeek(Math.min(duration, currentTime + 10));
        break;
      case 'Home':
        e.preventDefault();
        onSeek(0);
        break;
      case 'End':
        e.preventDefault();
        onSeek(duration);
        break;
      default:
        break;
    }
  }, [currentTime, duration, onSeek]);

  // Get volume icon
  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return IoVolumeOff;
    if (volume < 0.3) return IoVolumeLow;
    if (volume < 0.7) return IoVolumeMedium;
    return IoVolumeHigh;
  };

  const VolumeIcon = getVolumeIcon();

  const playbackRates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  return (
    <>
      {/* Global mouse event handlers for progress dragging */}
      {isDragging && (
        <div 
          className="drag-overlay"
          onMouseMove={handleProgressMouseMove}
          onMouseUp={handleProgressMouseUp}
          onMouseLeave={handleProgressMouseUp}
        />
      )}
      
      <div className={`video-controls ${showControls ? 'visible' : 'hidden'}`}>
        {/* Progress Bar */}
        <div className="progress-container">
          <div 
            className="progress-bar"
            ref={progressRef}
            onMouseDown={handleProgressMouseDown}
            onKeyDown={handleProgressKeyDown}
            role="slider"
            aria-label="Video progress"
            aria-valuemin={0}
            aria-valuemax={duration}
            aria-valuenow={currentTime}
            aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
            tabIndex={0}
          >
            <div className="progress-background" />
            <div 
              className="progress-fill"
              style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
            />
            <div 
              className="progress-handle"
              style={{ left: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Control Bar */}
        <div className="control-bar">
          {/* Left Side Controls */}
          <div className="controls-left">
            {/* Play/Pause Button */}
            <button 
              className="control-button play-button" 
              onClick={onPlay}
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
              title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
            >
              {isPlaying ? <IoPause size={20} /> : <IoPlay size={20} />}
            </button>

            {/* Volume Control */}
            <div 
              className="volume-control"
              onMouseEnter={() => setIsVolumeHovered(true)}
              onMouseLeave={() => setIsVolumeHovered(false)}
            >
              <button 
                className="control-button volume-button" 
                onClick={onMute}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                title={isMuted ? 'Unmute (M)' : 'Mute (M)'}
              >
                <VolumeIcon size={20} />
              </button>
              
              <div className={`volume-slider ${isVolumeHovered ? 'visible' : ''}`}>
                <div 
                  className="volume-bar"
                  ref={volumeRef}
                  onMouseDown={handleVolumeMouseDown}
                  role="slider"
                  aria-label="Volume"
                  aria-valuemin={0}
                  aria-valuemax={1}
                  aria-valuenow={isMuted ? 0 : volume}
                  aria-valuetext={`Volume ${Math.round((isMuted ? 0 : volume) * 100)}%`}
                  tabIndex={0}
                >
                  <div className="volume-background" />
                  <div 
                    className="volume-fill"
                    style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
                  />
                  <div 
                    className="volume-handle"
                    style={{ left: `${(isMuted ? 0 : volume) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Time Display */}
            <div className={`time-display ${isVolumeHovered ? 'shifted' : ''}`} aria-live="polite">
              <span className="current-time">{formatTime(currentTime)}</span>
              <span className="time-separator"> / </span>
              <span className="duration">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Right Side Controls */}
          <div className="controls-right">
            {/* Playback Rate */}
            <div className="playback-rate-control">
              <button 
                className="control-button rate-button" 
                onClick={() => setShowPlaybackRates(!showPlaybackRates)}
                aria-label={`Playback speed ${playbackRate}x`}
                title="Playback speed"
              >
                {playbackRate}x
              </button>
              
              {showPlaybackRates && (
                <div className="playback-rate-menu">
                  {playbackRates.map(rate => (
                    <button
                      key={rate}
                      className={`rate-option ${rate === playbackRate ? 'active' : ''}`}
                      onClick={() => {
                        onPlaybackRateChange(rate);
                        setShowPlaybackRates(false);
                      }}
                      aria-label={`${rate}x speed`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quality Settings */}
            <button 
              className="control-button settings-button" 
              onClick={onQualityClick}
              aria-label="Quality settings"
              title="Quality settings"
            >
              <IoSettings size={20} />
            </button>

            {/* Fullscreen Button */}
            <button 
              className="control-button fullscreen-button" 
              onClick={onFullscreen}
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              title={isFullscreen ? 'Exit fullscreen (F)' : 'Fullscreen (F)'}
            >
              {isFullscreen ? <IoContract size={20} /> : <IoExpand size={20} />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoControls; 