import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { IoPlaySkipForward, IoPlaySkipBack, IoVolumeMute, IoVolumeHigh } from 'react-icons/io5';
import './VideoPlayer.css';
import VideoControls from './VideoControls';
import QualitySelector from './QualitySelector';

const VideoPlayer = ({ videoStreams, audioStreams, metadata }) => {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const containerRef = useRef(null);
  const syncIntervalRef = useRef(null);
  const seekTimeoutRef = useRef(null);
  const loadingTimeoutRef = useRef(null);
  const wasPlayingRef = useRef(false);

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

  // Enhanced loading states for proper sync
  const [videoReady, setVideoReady] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [videoBuffering, setVideoBuffering] = useState(false);
  const [audioBuffering, setAudioBuffering] = useState(false);
  const [isChangingStreams, setIsChangingStreams] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);

  // Control visibility timer
  const controlsTimeoutRef = useRef(null);

  // HUD message now stores an object { icon: JSX, text?: string, position?: 'left'|'right'|'center' }
  const [hudMessage, setHudMessage] = useState(null);
  const [hudVisible, setHudVisible] = useState(false);
  const hudTimeoutRef = useRef(null);

  const showHud = useCallback((payload) => {
    setHudMessage({ ...payload, _id: Date.now() });
    setHudVisible(true);
    if (hudTimeoutRef.current) clearTimeout(hudTimeoutRef.current);
    hudTimeoutRef.current = setTimeout(() => setHudVisible(false), 1200);
  }, []);

  // Select default streams
  const defaultStreams = useMemo(() => {
    const videoDefault = videoStreams?.find(stream => String(stream.quality).includes('1080p')) || videoStreams?.[0];
    const audioDefault = audioStreams?.[0];
    return { video: videoDefault, audio: audioDefault };
  }, [videoStreams, audioStreams]);

  // Initialize default streams
  useEffect(() => {
    if (defaultStreams.video && !selectedVideoStream) {
      setSelectedVideoStream(defaultStreams.video);
    }
    if (defaultStreams.audio && !selectedAudioStream) {
      setSelectedAudioStream(defaultStreams.audio);
    }
  }, [defaultStreams, selectedVideoStream, selectedAudioStream]);

  // Both streams ready state - CRITICAL for sync
  const bothStreamsReady = videoReady && audioReady && !videoBuffering && !audioBuffering && !isChangingStreams && !isSeeking;

  // Enhanced loading state management
  useEffect(() => {
    if (bothStreamsReady) {
      setIsLoading(false);
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    } else {
      setIsLoading(true);
      // Fallback: if streams don't load within 10 seconds, stop loading state
      loadingTimeoutRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 10000);
    }

    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, [bothStreamsReady]);

  // CRITICAL: Unified play/pause control to ensure perfect sync
  const unifiedPlayPause = useCallback(async (shouldPlay) => {
    const video = videoRef.current;
    const audio = audioRef.current;

    if (!video || !audio || !bothStreamsReady) return;

    try {
      if (shouldPlay) {
        // Always pause both first to reset state
        video.pause();
        audio.pause();

        // Small delay to ensure both are paused
        await new Promise(resolve => setTimeout(resolve, 50));

        // Start both simultaneously
        const videoPromise = video.play();
        const audioPromise = audio.play();

        await Promise.all([videoPromise, audioPromise]);
        setIsPlaying(true);
      } else {
        // Pause both immediately
        video.pause();
        audio.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Playback error:', error);
      setIsPlaying(false);
    }
  }, [bothStreamsReady]);

  // Enhanced sync mechanism with stricter controls
  const syncStreams = useCallback(() => {
    const video = videoRef.current;
    const audio = audioRef.current;

    if (!video || !audio || !bothStreamsReady) return;

    const timeDiff = Math.abs(video.currentTime - audio.currentTime);

    // Tighter sync tolerance
    if (timeDiff > 0.1) {
      // If video is ahead, sync audio to video
      if (video.currentTime > audio.currentTime) {
        audio.currentTime = video.currentTime;
      } else {
        // If audio is ahead, sync video to audio
        video.currentTime = audio.currentTime;
      }
    }

    // Ensure playback rates match
    if (Math.abs(audio.playbackRate - video.playbackRate) > 0.01) {
      audio.playbackRate = video.playbackRate;
    }

    // CRITICAL: Ensure play/pause state sync
    if (video.paused !== audio.paused) {
      if (video.paused) {
        audio.pause();
        setIsPlaying(false);
      } else if (bothStreamsReady) {
        audio.play().catch(() => {
          // If audio can't play, pause video too
          video.pause();
          setIsPlaying(false);
        });
      }
    }
  }, [bothStreamsReady]);

  // More frequent sync when playing for tighter control
  useEffect(() => {
    if (bothStreamsReady && isPlaying) {
      syncIntervalRef.current = setInterval(syncStreams, 100); // Sync every 100ms when playing
    } else {
      if (syncIntervalRef.current) {
        clearInterval(syncIntervalRef.current);
      }
    }

    return () => {
      if (syncIntervalRef.current) {
        clearInterval(syncIntervalRef.current);
      }
    };
  }, [syncStreams, bothStreamsReady, isPlaying]);

  // Enhanced event handlers with stricter buffering control
  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;

    if (!video || !audio) return;

    // Video event handlers
    const handleVideoLoadedData = () => {
      setVideoReady(true);
      setDuration(video.duration);
      setVideoBuffering(false);
    };

    const handleVideoCanPlay = () => {
      setVideoReady(true);
      setVideoBuffering(false);
    };

    const handleVideoWaiting = () => {
      setVideoBuffering(true);
      // CRITICAL: Pause audio when video is buffering
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
      }
    };

    const handleVideoLoadStart = () => {
      setVideoReady(false);
      setVideoBuffering(true);
    };

    const handleVideoTimeUpdate = () => {
      if (!isChangingStreams && !isSeeking) {
        setCurrentTime(video.currentTime);
      }
    };

    const handleVideoPlay = () => {
      if (bothStreamsReady) {
        setIsPlaying(true);
        // Ensure audio plays when video plays
        if (audioRef.current && audioRef.current.paused) {
          audioRef.current.play().catch(console.error);
        }
      } else {
        // If not ready, pause video
        video.pause();
      }
    };

    const handleVideoPause = () => {
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };

    const handleVideoEnded = () => {
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      video.currentTime = 0;
    };

    const handleVideoSeeking = () => {
      setIsSeeking(true);
      setVideoBuffering(true);

      // Pause audio immediately when seeking starts
      if (audioRef.current) {
        audioRef.current.pause();
      }

      if (seekTimeoutRef.current) {
        clearTimeout(seekTimeoutRef.current);
      }
    };

    const handleVideoSeeked = () => {
      setIsSeeking(false);
      setVideoBuffering(false);

      // Sync audio position after seek
      if (audioRef.current) {
        audioRef.current.currentTime = video.currentTime;
      }
    };

    // Audio event handlers
    const handleAudioLoadedData = () => {
      setAudioReady(true);
      setAudioBuffering(false);
    };

    const handleAudioCanPlay = () => {
      setAudioReady(true);
      setAudioBuffering(false);
    };

    const handleAudioWaiting = () => {
      setAudioBuffering(true);
      // CRITICAL: Pause video when audio is buffering
      if (videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
      }
    };

    const handleAudioLoadStart = () => {
      setAudioReady(false);
      setAudioBuffering(true);
    };

    const handleAudioSeeked = () => {
      setAudioBuffering(false);
    };

    // Add video event listeners
    video.addEventListener('loadeddata', handleVideoLoadedData);
    video.addEventListener('canplay', handleVideoCanPlay);
    video.addEventListener('waiting', handleVideoWaiting);
    video.addEventListener('loadstart', handleVideoLoadStart);
    video.addEventListener('timeupdate', handleVideoTimeUpdate);
    video.addEventListener('play', handleVideoPlay);
    video.addEventListener('pause', handleVideoPause);
    video.addEventListener('ended', handleVideoEnded);
    video.addEventListener('seeking', handleVideoSeeking);
    video.addEventListener('seeked', handleVideoSeeked);

    // Add audio event listeners
    audio.addEventListener('loadeddata', handleAudioLoadedData);
    audio.addEventListener('canplay', handleAudioCanPlay);
    audio.addEventListener('waiting', handleAudioWaiting);
    audio.addEventListener('loadstart', handleAudioLoadStart);
    audio.addEventListener('seeked', handleAudioSeeked);

    return () => {
      // Clean up video listeners
      video.removeEventListener('loadeddata', handleVideoLoadedData);
      video.removeEventListener('canplay', handleVideoCanPlay);
      video.removeEventListener('waiting', handleVideoWaiting);
      video.removeEventListener('loadstart', handleVideoLoadStart);
      video.removeEventListener('timeupdate', handleVideoTimeUpdate);
      video.removeEventListener('play', handleVideoPlay);
      video.removeEventListener('pause', handleVideoPause);
      video.removeEventListener('ended', handleVideoEnded);
      video.removeEventListener('seeking', handleVideoSeeking);
      video.removeEventListener('seeked', handleVideoSeeked);

      // Clean up audio listeners
      audio.removeEventListener('loadeddata', handleAudioLoadedData);
      audio.removeEventListener('canplay', handleAudioCanPlay);
      audio.removeEventListener('waiting', handleAudioWaiting);
      audio.removeEventListener('loadstart', handleAudioLoadStart);
      audio.removeEventListener('seeked', handleAudioSeeked);
    };
  }, [selectedVideoStream, selectedAudioStream, bothStreamsReady, isChangingStreams, isSeeking]);

  // Effect to handle resuming playback after both streams are ready
  useEffect(() => {
    if (bothStreamsReady && wasPlayingRef.current) {
      unifiedPlayPause(true);
      wasPlayingRef.current = false;
    }
  }, [bothStreamsReady, unifiedPlayPause]);

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

  // Player controls with unified control
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      unifiedPlayPause(false);
    } else {
      unifiedPlayPause(true);
    }
  }, [isPlaying, unifiedPlayPause]);

  // Enhanced seek with proper buffering management
  const seek = useCallback(async (time) => {
    const video = videoRef.current;
    const audio = audioRef.current;

    if (!video || !audio) return;

    // Determine if the player was actively playing **before** this seek
    // If it was, remember that we should resume playback *after* all seeks finish.
    // IMPORTANT: We ONLY ever set this flag to true here – we never set it to false
    // during subsequent (possibly rapid-fire) seeks. It will be cleared once playback
    // successfully resumes (see the bothStreamsReady effect below).
    if (!video.paused) {
      wasPlayingRef.current = true;
    }

    // Pause both streams immediately
    video.pause();
    audio.pause();
    setIsPlaying(false);

    // Reset readiness so `bothStreamsReady` waits for fresh `canplay` events at the
    // new seek position. Without this the player could try to resume **before**
    // audio/video have buffered enough, causing a quick play-then-pause symptom.
    setVideoReady(false);
    setAudioReady(false);

    // Set seeking state
    setIsSeeking(true);
    setVideoBuffering(true);
    setAudioBuffering(true);

    const clampedTime = Math.max(0, Math.min(duration, time));

    try {
      // Set time for both streams
      video.currentTime = clampedTime;
      audio.currentTime = clampedTime;

      // Wait a moment for seek to process
      await new Promise(resolve => setTimeout(resolve, 100));

    } catch (error) {
      console.error('Seek error:', error);
      setIsSeeking(false);
      setVideoBuffering(false);
      setAudioBuffering(false);
    }
  }, [duration]);

  const toggleMute = useCallback(() => {
    setIsMuted(!isMuted);
  }, [isMuted]);

  const changeVolume = useCallback((newVolume) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolume(clampedVolume);
    if (clampedVolume > 0 && isMuted) {
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

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Only handle if video player is focused or no input is focused
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          seek(Math.max(0, currentTime - 10));
          showHud({ icon: <IoPlaySkipBack size={36} />, text: '10', position: 'left' });
          break;
        case 'ArrowRight':
          e.preventDefault();
          seek(Math.min(duration, currentTime + 10));
          showHud({ icon: <IoPlaySkipForward size={36} />, text: '10', position: 'right' });
          break;
        case 'ArrowUp':
          e.preventDefault();
          const newVolUp = Math.min(1, volume + 0.1);
          changeVolume(newVolUp);
          showHud({ icon: <IoVolumeHigh size={30} />, text: `${Math.round(newVolUp * 100)}%` });
          break;
        case 'ArrowDown':
          e.preventDefault();
          const newVolDown = Math.max(0, volume - 0.1);
          changeVolume(newVolDown);
          showHud({ icon: <IoVolumeHigh size={30} />, text: `${Math.round(newVolDown * 100)}%` });
          break;
        case 'KeyM':
          e.preventDefault();
          const willMute = !isMuted;
          toggleMute();
          showHud({ icon: willMute ? <IoVolumeMute size={30} /> : <IoVolumeHigh size={30} />, text: willMute ? 'Muted' : 'Unmuted' });
          break;
        case 'KeyF':
          e.preventDefault();
          toggleFullscreen();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [currentTime, duration, volume, isPlaying, togglePlay, seek, changeVolume, toggleMute, toggleFullscreen, showHud]);

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

  // Enhanced stream change handlers with proper sync
  const changeVideoStream = useCallback(async (stream) => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video || !audio) return;

    setIsChangingStreams(true);
    const currentTime = video.currentTime;
    const wasPlaying = !video.paused;

    // Pause both streams
    video.pause();
    audio.pause();
    setIsPlaying(false);

    // Reset ready states
    setVideoReady(false);
    setVideoBuffering(true);

    // Change stream
    setSelectedVideoStream(stream);

    // Wait for video to be ready, then restore state
    const handleVideoReady = () => {
      video.currentTime = currentTime;
      setIsChangingStreams(false);

      if (wasPlaying && bothStreamsReady) {
        setTimeout(() => {
          unifiedPlayPause(true);
        }, 100);
      }

      video.removeEventListener('canplay', handleVideoReady);
    };

    video.addEventListener('canplay', handleVideoReady);
  }, [bothStreamsReady, unifiedPlayPause]);

  const changeAudioStream = useCallback(async (stream) => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video || !audio) return;

    setIsChangingStreams(true);
    const currentTime = audio.currentTime;
    const wasPlaying = !video.paused;

    // Pause both streams
    video.pause();
    audio.pause();
    setIsPlaying(false);

    // Reset ready states
    setAudioReady(false);
    setAudioBuffering(true);

    // Change stream
    setSelectedAudioStream(stream);

    // Wait for audio to be ready, then restore state
    const handleAudioReady = () => {
      audio.currentTime = currentTime;
      setIsChangingStreams(false);

      if (wasPlaying && bothStreamsReady) {
        setTimeout(() => {
          unifiedPlayPause(true);
        }, 100);
      }

      audio.removeEventListener('canplay', handleAudioReady);
    };

    audio.addEventListener('canplay', handleAudioReady);
  }, [bothStreamsReady, unifiedPlayPause]);

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
      tabIndex={0}
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

      {/* Audio Element */}
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
          {isChangingStreams && <p>Changing quality...</p>}
          {isSeeking && <p>Seeking...</p>}
          {(videoBuffering || audioBuffering) && <p>Buffering...</p>}
        </div>
      )}

      {/* HUD message */}
      {hudMessage && (
        <div className={`hud-bubble ${hudMessage.position || 'center'} ${hudVisible ? 'visible' : ''}`} role="status" aria-live="polite">
          {hudMessage.icon}
          {hudMessage.text && <span className="hud-text">{hudMessage.text}</span>}
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