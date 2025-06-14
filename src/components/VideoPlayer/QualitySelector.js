import React, { useState } from 'react';
import './QualitySelector.css';
import { IoClose, IoCheckmark } from 'react-icons/io5';

const QualitySelector = ({
  videoStreams,
  audioStreams,
  selectedVideoStream,
  selectedAudioStream,
  onVideoStreamChange,
  onAudioStreamChange,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('quality'); // 'quality' or 'audio'

  // Group video streams by quality
  const videoQualities = videoStreams.reduce((acc, stream) => {
    if (!acc[stream.quality]) {
      acc[stream.quality] = [];
    }
    acc[stream.quality].push(stream);
    return acc;
  }, {});

  // Sort qualities (highest first)
  const sortedVideoQualities = Object.keys(videoQualities).sort((a, b) => {
    const aNum = parseInt(a);
    const bNum = parseInt(b);
    if (isNaN(aNum) || isNaN(bNum)) return a.localeCompare(b);
    return bNum - aNum;
  });

  // Group audio streams by codec and bitrate
  const audioQualities = audioStreams.reduce((acc, stream) => {
    const key = `${stream.audioCodec} - ${Math.round(stream.bitrate / 1000)}kbps`;
    if (!acc[key]) {
      acc[key] = stream;
    }
    return acc;
  }, {});

  const getBestVideoStreamForQuality = (quality) => {
    const streams = videoQualities[quality];
    if (!streams) return null;
    
    // Prefer MP4 over WebM, then by smaller file size
    return streams.sort((a, b) => {
      if (a.container === 'mp4' && b.container !== 'mp4') return -1;
      if (a.container !== 'mp4' && b.container === 'mp4') return 1;
      return a.size - b.size;
    })[0];
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getCodecDisplayName = (codec) => {
    const codecMap = {
      'avc1': 'H.264',
      'vp09': 'VP9',
      'av01': 'AV1',
      'mp4a.40.2': 'AAC',
      'mp4a.40.5': 'AAC (HE)',
      'opus': 'Opus'
    };
    
    for (const [key, name] of Object.entries(codecMap)) {
      if (codec?.startsWith(key)) return name;
    }
    return codec || 'Unknown';
  };

  return (
    <div className="quality-selector-overlay" onClick={onClose}>
      <div className="quality-selector" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="quality-header">
          <h3>Quality Settings</h3>
          <button className="close-button" onClick={onClose}>
            <IoClose size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="quality-tabs">
          <button 
            className={`tab-button ${activeTab === 'quality' ? 'active' : ''}`}
            onClick={() => setActiveTab('quality')}
          >
            Video Quality
          </button>
          <button 
            className={`tab-button ${activeTab === 'audio' ? 'active' : ''}`}
            onClick={() => setActiveTab('audio')}
          >
            Audio Quality
          </button>
        </div>

        {/* Content */}
        <div className="quality-content">
          {activeTab === 'quality' && (
            <div className="video-quality-list">
              <div className="quality-info">
                <p>Higher quality uses more bandwidth</p>
              </div>
              
              {sortedVideoQualities.map(quality => {
                const stream = getBestVideoStreamForQuality(quality);
                if (!stream) return null;
                
                const isSelected = selectedVideoStream?.quality === stream.quality;
                
                return (
                  <div 
                    key={`${quality}-${stream.container}`}
                    className={`quality-option ${isSelected ? 'selected' : ''}`}
                    onClick={() => onVideoStreamChange(stream)}
                  >
                    <div className="quality-main">
                      <span className="quality-label">{quality}</span>
                      {isSelected && <IoCheckmark className="check-icon" />}
                    </div>
                    <div className="quality-details">
                      <span className="quality-codec">
                        {getCodecDisplayName(stream.videoCodec)} • {stream.container.toUpperCase()}
                      </span>
                      <span className="quality-size">
                        {formatFileSize(stream.size)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'audio' && (
            <div className="audio-quality-list">
              <div className="quality-info">
                <p>Choose audio format and quality</p>
              </div>
              
              {Object.entries(audioQualities).map(([label, stream]) => {
                const isSelected = selectedAudioStream?.url === stream.url;
                
                return (
                  <div 
                    key={stream.url}
                    className={`quality-option ${isSelected ? 'selected' : ''}`}
                    onClick={() => onAudioStreamChange(stream)}
                  >
                    <div className="quality-main">
                      <span className="quality-label">{label}</span>
                      {isSelected && <IoCheckmark className="check-icon" />}
                    </div>
                    <div className="quality-details">
                      <span className="quality-codec">
                        {getCodecDisplayName(stream.audioCodec)} • {stream.container.toUpperCase()}
                      </span>
                      <span className="quality-size">
                        {formatFileSize(stream.size)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QualitySelector; 