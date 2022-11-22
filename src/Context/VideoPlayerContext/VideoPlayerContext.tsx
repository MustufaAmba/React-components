import { FC, useEffect, useState, createContext, useRef } from 'react';
import { ChildrenType } from '../TodoContext';
import { ContextType, VideoControlsType } from './VideoPlayerContext.type';
import { Document } from './VideoPlayerContext.type';

export const CustomVideoPlayerContext = createContext<ContextType>(
  {} as ContextType
);
const VideoPlayerContext: FC<ChildrenType> = ({ children }) => {
  const videoRef = useRef<HTMLVideoElement>(
    null as unknown as HTMLVideoElement
  );
  const videoContainerRef = useRef<Document>(null as unknown as Document);
  const [videoControls, setVideoControls] = useState<VideoControlsType>({
    play: false,
    mute: false,
    fullScreen: false,
    totalSeconds: 0,
    seconds: 0,
    minutes: 0,
    hours: 0,
    currentTime: 0,
    totalDuration: '',
    startTime: 0,
  });

  useEffect(() => {
    document.addEventListener('fullscreenchange', exitHandler);
    document.addEventListener('webkitfullscreenchange', exitHandler);
    document.addEventListener('mozfullscreenchange', exitHandler);
    document.addEventListener('MSFullscreenChange', exitHandler);
    document.addEventListener('keydown', keyPressHandler);
  }, []);
  const exitHandler = () => {
    if (
      !(document as unknown as Document).webkitIsFullScreen &&
      !(document as unknown as Document).mozFullScreen &&
      !(document as unknown as Document).msFullscreenElement
    ) {
      setVideoControls((state: any) => ({
        ...state,
        fullScreen: !state,
      }));
      if (videoRef.current) {
        videoRef.current.style.height = '500px';
      }
    }
  };
  const keyPressHandler = (e: any) => {
    if (e.keyCode == '38') {
      // up arrow
    } else if (e.keyCode == '40') {
      // down arrow
    } else if (e.keyCode == '37') {
      handleCurrentTimeChange('backward');
    } else if (e.keyCode == '39') {
      handleCurrentTimeChange('forward');
    }
  };
  const handlePlayPauseVideo = () => {
    videoControls.play ? videoRef.current?.pause() : videoRef.current?.play();
    setVideoControls((state: any) => ({
      ...state,
      play: !state.play,
    }));
  };
  const handleVideoSpeakerState = () => {
    if (videoRef.current) {
      videoRef.current.muted = videoControls.mute ? true : false;
      setVideoControls((state: any) => ({ ...state, mute: !state.mute }));
    }
  };
  const handleVideoFullScreen = (value: boolean) => {
    setVideoControls((state: any) => ({
      ...state,
      fullScreen: value,
    }));
    if (videoRef.current) {
      if (value) {
        if (videoContainerRef.current?.requestFullscreen) {
          videoContainerRef.current?.requestFullscreen();
        } else if (videoContainerRef.current?.webkitRequestFullscreen) {
          videoContainerRef.current?.webkitRequestFullscreen();
        } else if (videoContainerRef.current?.mozRequestFullScreen) {
          videoContainerRef.current?.mozRequestFullScreen();
        } else if (videoContainerRef.current?.msRequestFullscreen) {
          videoContainerRef.current?.msRequestFullscreen();
        } else {
          console.log('Fullscreen API is not supported.');
        }
        videoRef.current.style.height = '80vh';
      } else {
        document.exitFullscreen();
        videoRef.current.style.height = '500px';
      }
    }
  };
  const calculateTime = (
    hours: number,
    minutes: number,
    seconds: number
  ): number => {
    return hours * 60 * 60 + minutes * 60 + seconds;
  };
  const handleCurrentTimeChange = (skip?: string) => {
    if (videoRef.current) {
      var hours = videoControls.hours;
      var minutes = videoControls.minutes;
      var seconds = videoControls.seconds;
      if (skip === 'forward') {
        if (seconds >= 55) {
          seconds = seconds - 60 + 5;
          if (minutes >= 60) {
            hours++;
            minutes = 1;
          } else {
            minutes++;
          }
        } else {
          seconds = seconds + 5;
        }
        videoRef.current.currentTime = calculateTime(hours, minutes, seconds);
      } else if (skip === 'backward') {
        if (seconds <= 4) {
          if (minutes >= 1) {
            seconds = 60 + seconds - 5;
            minutes--;
          } else {
            seconds = 0;
          }
        } else {
          seconds = seconds - 5;
        }
        videoRef.current.currentTime = calculateTime(hours, minutes, seconds);
      } else {
        if (seconds >= 60) {
          seconds = 1;
          if (minutes >= 60) {
            hours++;
            minutes = 1;
          } else {
            minutes++;
          }
        } else {
          seconds++;
        }
      }
      console.log({
        currentTime: calculateTime(hours, minutes, seconds),
        totalDuration: videoControls.totalSeconds,
        currentVideoTime: videoRef.current?.currentTime,
      });
      setVideoControls((state: any) => ({
        ...state,
        hours,
        minutes,
        seconds,
        currentTime: calculateTime(hours, minutes, seconds),
      }));
    }
  };
  return (
    <CustomVideoPlayerContext.Provider
      value={{
        videoControls,
        videoContainerRef,
        videoRef,
        setVideoControls,
        handlePlayPauseVideo,
        handleVideoSpeakerState,
        handleVideoFullScreen,
        calculateTime,
        handleCurrentTimeChange,
      }}
    >
      {children}
    </CustomVideoPlayerContext.Provider>
  );
};

export default VideoPlayerContext;
