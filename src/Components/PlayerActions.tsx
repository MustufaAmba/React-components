import React, { FC, useEffect, useRef, useState } from 'react';
import { useContext } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { IconButton, LinearProgress } from '@mui/material';
import Styles from '../ComponentStyles/videoPlayer.module.css';
import {
  MdForward5,
  MdReplay5,
  MdFullscreenExit,
  MdFullscreen,
} from 'react-icons/md';
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2';
import { CustomVideoPlayerContext } from '../Context/VideoPlayerContext/VideoPlayerContext';
export type ProgressHoverType = {
  targetPosition: number;
  targetDuration: number;
  targetPercentage: number;
};
const PlayerActions: FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [progressHover, setProgressHover] = useState<ProgressHoverType>({
    targetPosition: 0,
    targetDuration: 0,
    targetPercentage: 0,
  });
  const imageRef = useRef<HTMLDivElement>(null);
  const [newImage, setNewImage] = useState<string>('');
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const {
    videoControls,
    handlePlayPauseVideo,
    handleVideoSpeakerState,
    handleVideoFullScreen,
    videoContainerRef,
    videoRef,
    calculateTime,
    setVideoControls,
    handleCurrentTimeChange,
  } = useContext(CustomVideoPlayerContext);
  useEffect(() => {
    let interval = setTimeout(() => {
      if (videoControls.currentTime < videoControls.totalSeconds) {
        if (videoControls.play) {
          handleCurrentTimeChange();
          setProgress((state: any) => {
            let previousValue = state;
            let newValue =
              (videoControls.currentTime * 100) / videoControls.totalSeconds;
            let diff = newValue - previousValue;
            return previousValue + diff;
          });
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });
  const handleProgressBarHover = (e: any) => {
    if (videoContainerRef.current) {
      setShowPreview(true);
      let parentElement = videoContainerRef.current?.getBoundingClientRect();
      let totalWidth = parentElement.width - 60;
      let targetPosition = e.pageX;
      let targetPercentage = (targetPosition * 100) / totalWidth;
      let targetDuration =
        (targetPercentage * videoControls.totalSeconds) / 100;
      let canvas = document.createElement('canvas');
      canvas.width = 1920;
      canvas.height = 1080;

      let ctx = canvas.getContext('2d');
      if (ctx && videoRef.current) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        // setNewImage(canvas.toDataURL('image/jpeg'));
        setTimeout(() => {
          setNewImage(canvas.toDataURL('image/jpeg'));
        }, 500);
        setProgressHover({
          targetPosition,
          targetPercentage,
          targetDuration,
        });
        if (imageRef.current) {
          console.log('pageX', imageRef.current.clientLeft);
          imageRef.current.style.left = `${e.pageX - 50 - 150}px`;
        }
        console.log(
          { targetPosition },
          { targetPercentage },
          { targetDuration }
        );
      }
    }
  };
  const handleProgressClick = () => {
    let totalSeconds = progressHover.targetDuration;
    var timeFrame = totalSeconds;
    var hours = Math.floor((timeFrame / (60 * 60)) % 24);
    var minutes = Math.floor((timeFrame / 60) % 60);
    var seconds = Math.floor(timeFrame % 60);
    setVideoControls((state: any) => ({
      ...state,
      hours,
      minutes,
      seconds,
      currentTime: calculateTime(hours, minutes, seconds),
    }));
    if (videoRef.current) {
      videoRef.current.currentTime = calculateTime(hours, minutes, seconds);
    }
  };

  return (
    <div className={Styles.controlStyles}>
      <div
        style={{ padding: '10px' }}
        onMouseMove={(e) => handleProgressBarHover(e)}
        onMouseEnter={(e) => handleProgressBarHover(e)}
        onMouseOut={() => setShowPreview(false)}
      >
        <LinearProgress
          style={{ cursor: 'pointer' }}
          variant="determinate"
          value={progress}
          color="warning"
          onMouseOut={() => setShowPreview(false)}
          onMouseEnter={(e) => handleProgressBarHover(e)}
          onMouseMove={(e) => handleProgressBarHover(e)}
          onClick={handleProgressClick}
        />
      </div>

      <div className={Styles.flexSpaceBetween}>
        <div>
          <IconButton onClick={handlePlayPauseVideo}>
            {videoControls.play ? (
              <FaPause color="white" />
            ) : (
              <FaPlay color="white" />
            )}
          </IconButton>
          <span style={{ color: 'white' }}>
            {videoControls.hours
              ? `${videoControls.hours}-${videoControls.minutes}-${videoControls.seconds}`
              : videoControls.minutes
              ? `${videoControls.minutes}-${videoControls.seconds}`
              : `${videoControls.seconds}`}{' '}
            / {videoControls.totalDuration}
          </span>
          <IconButton onClick={() => handleCurrentTimeChange('backward')}>
            <MdReplay5 color="white"></MdReplay5>
          </IconButton>
        </div>

        <div style={{ display: 'flex' }}>
          <IconButton onClick={() => handleCurrentTimeChange('forward')}>
            <MdForward5 color="white"></MdForward5>
          </IconButton>
          <IconButton onClick={handleVideoSpeakerState}>
            {videoControls.mute ? (
              <HiSpeakerXMark color="white" />
            ) : (
              <HiSpeakerWave color="white" />
            )}
          </IconButton>
          <IconButton
            onClick={() => handleVideoFullScreen(!videoControls.fullScreen)}
          >
            {videoControls.fullScreen ? (
              <MdFullscreenExit color="white" />
            ) : (
              <MdFullscreen color="white" />
            )}
          </IconButton>
        </div>
      </div>
      {showPreview && (
        <div>
          <img
            ref={imageRef}
            src={newImage}
            height="100%"
            width="100%"
            style={{
              position: 'absolute',
              top: -160 + 'px',
              borderRadius: '10px',
              height: 150 + 'px',
              width: 300 + 'px',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PlayerActions;
