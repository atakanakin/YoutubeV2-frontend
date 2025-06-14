import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './VideoPage.css';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import VideoMetadata from '../../components/VideoMetadata/VideoMetadata';
import apiService from '../../services/apiService';
import toast from 'react-hot-toast';

const VideoPage = () => {
  const { videoId: rawParam } = useParams();
  const videoId = decodeURIComponent(rawParam || '');
  const [videoData, setVideoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchInitiated = useRef(false); // Ref to track if fetch has been initiated

  useEffect(() => {
    // Only run the fetch if it hasn't been initiated yet for this videoId
    if (fetchInitiated.current) return;
    fetchInitiated.current = true;

    const fetchVideo = async () => {
      if (!videoId) {
        setError('Video ID is required');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await apiService.getVideo(videoId);
        
        if (result.success) {
          setVideoData(result.data);
        } else {
          setError(result.error?.message || 'Failed to load video');
          toast.error('Failed to load video');
        }
      } catch (error) {
        console.error('Video fetch error:', error);
        setError('Something went wrong');
        toast.error('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideo();
  }, [videoId]); // Keep videoId in dependency array to refetch if it changes

  // Reset the fetch flag when the component unmounts or videoId changes
  useEffect(() => {
    return () => {
      fetchInitiated.current = false;
    };
  }, [videoId]);

  if (isLoading) {
    return (
      <main className="video-page">
        <div className="video-page-content">
          <div className="video-loading">
            <div className="loading-spinner"></div>
            <p>Loading video...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !videoData) {
    return (
      <main className="video-page">
        <div className="video-page-content">
          <div className="video-error">
            <h2>Video not found</h2>
            <p>{error || 'The video you requested could not be found.'}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="video-page">
      <div className="video-page-content">
        <div className="video-container">
          <VideoPlayer
            videoStreams={videoData.videoStreams}
            audioStreams={videoData.audioStreams}
            metadata={videoData.metadata}
          />
        </div>
        <div className="video-info">
          <VideoMetadata metadata={videoData.metadata} />
        </div>
      </div>
    </main>
  );
};

export default VideoPage; 