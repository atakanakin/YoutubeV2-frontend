import React, { useState, useRef, useEffect, useCallback } from 'react';
import './VideoPlayer.css';
import VideoControls from './VideoControls';
import QualitySelector from './QualitySelector';

const VideoPlayer = ({ videoStreams, audioStreams, metadata }) => {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const containerRef = useRef(null);
  const syncRequestRef = useRef(null);
  
  // Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showQualitySelector, setShowQualitySelector] = useState(false);
  
  // Stream selection
  const [selectedVideoStream, setSelectedVideoStream] = useState(null);
  const [selectedAudioStream, setSelectedAudioStream] = useState(null);
  
  // Control visibility timer
  const controlsTimeoutRef = useRef(null);
  
  // Initialize default streams
  useEffect(() => {
    if (videoStreams?.length > 0) {
      // Select highest quality video stream by default (first one is usually highest)
      const defaultVideo = videoStreams.find(stream => stream.quality === '720p') || videoStreams[0];
      setSelectedVideoStream(defaultVideo);
    }
    
    if (audioStreams?.length > 0) {
      // Select highest quality audio stream
      const defaultAudio = audioStreams.find(stream => stream.quality === 'mp4a.40.2') || audioStreams[0];
      setSelectedAudioStream(defaultAudio);
    }
  }, [videoStreams, audioStreams]);
  
  // Sync video and audio using requestAnimationFrame for better performance
  const syncStreams = useCallback(() => {
    const video = videoRef.current;
    const audio = audioRef.current;
    
    if (!video || !audio) return;
    
    // Sync audio to video's current time if deviation is significant
    const timeDiff = Math.abs(video.currentTime - audio.currentTime);
    if (timeDiff > 0.15) { // 150ms tolerance
      audio.currentTime = video.currentTime;
    }
    
    // Sync playback rate and pause state constantly
    if (audio.playbackRate !== video.playbackRate) {
      audio.playbackRate = video.playbackRate;
    }
    if (video.paused && !audio.paused) {
      audio.pause();
    } else if (!video.paused && audio.paused) {
      audio.play().catch(console.error);
    }
    
    syncRequestRef.current = requestAnimationFrame(syncStreams);
  }, []);
  
  // Start and stop the sync loop
  useEffect(() => {
    syncRequestRef.current = requestAnimationFrame(syncStreams);
    return () => {
      if (syncRequestRef.current) {
        cancelAnimationFrame(syncRequestRef.current);
      }
    };
  }, [syncStreams]);
  
  // Handle video/audio events
  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;
    
    if (!video || !audio) return;
    
    const handleLoadedData = () => {
      setDuration(video.duration);
      setIsLoading(false);
    };
    
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };
    
    const handlePlay = () => {
      setIsPlaying(true);
      audio.play().catch(console.error);
    };
    
    const handlePause = () => {
      setIsPlaying(false);
      audio.pause();
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      audio.pause();
      // Resetting audio time might not be needed as video drives the sync
    };
    
    const handleSeeking = () => {
      if (audioRef.current) {
        audioRef.current.currentTime = videoRef.current.currentTime;
      }
    };
    
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleWaiting = () => setIsLoading(true);
    
    // Add event listeners
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('seeking', handleSeeking);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('waiting', handleWaiting);
    
    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('seeking', handleSeeking);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('waiting', handleWaiting);
    };
  }, [selectedVideoStream, selectedAudioStream]); // Rerun when streams change
  
  // Update playback rate for both streams
  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = playbackRate;
    if (audioRef.current) audioRef.current.playbackRate = playbackRate;
  }, [playbackRate]);
  
  // Update volume and muted state for audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);
  
  // Controls visibility management
  const showControlsTemporarily = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  }, [isPlaying]);
  
  const handleMouseMove = useCallback(() => {
    showControlsTemporarily();
  }, [showControlsTemporarily]);
  
  const handleMouseLeave = useCallback(() => {
    if (isPlaying) {
      setShowControls(false);
    }
  }, [isPlaying]);
  
  // Player controls
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(console.error);
    }
  }, [isPlaying]);
  
  const seek = useCallback((time) => {
    if (videoRef.current) videoRef.current.currentTime = time;
    if (audioRef.current) audioRef.current.currentTime = time;
  }, []);
  
  const toggleMute = useCallback(() => {
    setIsMuted(!isMuted);
  }, [isMuted]);
  
  const changeVolume = useCallback((newVolume) => {
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  }, [isMuted]);
  
  const toggleFullscreen = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    
    if (!isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      }
    }
  }, [isFullscreen]);
  
  // Fullscreen change handler
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  // Stream change handlers
  const changeVideoStream = useCallback((stream) => {
    const video = videoRef.current;
    if (!video) return;
    
    const currentTime = video.currentTime;
    const wasPlaying = !video.paused;
    
    setSelectedVideoStream(stream);
    
    // After stream loads, restore position and play state
    const handleLoadedData = () => {
      video.currentTime = currentTime;
      if (wasPlaying) {
        video.play().catch(console.error);
      }
      video.removeEventListener('loadeddata', handleLoadedData);
    };
    
    video.addEventListener('loadeddata', handleLoadedData);
  }, []);
  
  const changeAudioStream = useCallback((stream) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const currentTime = audio.currentTime;
    const wasPlaying = !audio.paused;
    
    setSelectedAudioStream(stream);
    
    // After stream loads, restore position and play state
    const handleLoadedData = () => {
      audio.currentTime = currentTime;
      if (wasPlaying) {
        audio.play().catch(console.error);
      }
      audio.removeEventListener('loadeddata', handleLoadedData);
    };
    
    audio.addEventListener('loadeddata', handleLoadedData);
  }, []);
  
  if (!selectedVideoStream || !selectedAudioStream) {
    return (
      <div className="video-player-container">
        <div className="video-player-loading">
          <div className="loading-spinner"></div>
          <p>Loading player...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      className={`video-player-container ${isFullscreen ? 'fullscreen' : ''}`}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="video-element"
        src={selectedVideoStream.url}
        poster={metadata.thumbnails?.[metadata.thumbnails.length - 1]?.url}
        preload="metadata"
        playsInline
        onClick={togglePlay}
      />
      
      {/* Audio Element (hidden) */}
      <audio
        ref={audioRef}
        src={selectedAudioStream.url}
        preload="metadata"
        style={{ display: 'none' }}
      />
      
      {/* Loading Overlay */}
      {isLoading && (
        <div className="video-loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      
      {/* Controls */}
      <VideoControls
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        isMuted={isMuted}
        playbackRate={playbackRate}
        isFullscreen={isFullscreen}
        showControls={showControls}
        onPlay={togglePlay}
        onSeek={seek}
        onVolumeChange={changeVolume}
        onMute={toggleMute}
        onPlaybackRateChange={setPlaybackRate}
        onFullscreen={toggleFullscreen}
        onQualityClick={() => setShowQualitySelector(!showQualitySelector)}
      />
      
      {/* Quality Selector */}
      {showQualitySelector && (
        <QualitySelector
          videoStreams={videoStreams}
          audioStreams={audioStreams}
          selectedVideoStream={selectedVideoStream}
          selectedAudioStream={selectedAudioStream}
          onVideoStreamChange={changeVideoStream}
          onAudioStreamChange={changeAudioStream}
          onClose={() => setShowQualitySelector(false)}
        />
      )}
    </div>
  );
};

export default VideoPlayer; 