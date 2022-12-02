import { useContext } from 'react';
import { FC } from 'react';
import Header from './Header';
import PlayerActions from './PlayerActions';
import { CustomVideoPlayerContext } from '../Context/VideoPlayerContext/VideoPlayerContext';
import { FaPause, FaPlay } from 'react-icons/fa';
import Styles from '../ComponentStyles/videoPlayer.module.css';
import { MdForward5, MdReplay5 } from 'react-icons/md';
import { useEffect } from 'react';
const VideoPlayer: FC = () => {
  const { videoRef, videoContainerRef, setVideoControls, videoControls } =
    useContext(CustomVideoPlayerContext);
  useEffect(() => {
    setVideoDuration();
  }, []);
  const setVideoDuration = () => {
    let totalSeconds = videoRef.current.duration
      ? videoRef.current.duration
      : 0;
    console.log(totalSeconds);
    var timeFrame = totalSeconds;
    var hours = Math.floor((timeFrame / (60 * 60)) % 24);
    var minutes = Math.floor((timeFrame / 60) % 60);
    var seconds = Math.floor(timeFrame % 60);
    setVideoControls((state: any) => ({
      ...state,
      totalSeconds,
      totalDuration: hours
        ? `${hours}-${minutes}-${seconds}`
        : minutes
        ? `${minutes}-${seconds}`
        : `${seconds}`,
    }));
    videoRef.current.focus();
  };

  return (
    <div>
      <Header />
      <div
        style={{
          padding: '50px',
          width: '100%',
          position: 'relative',
          height: 500 + 'px',
        }}
        ref={videoContainerRef}
      >
        <video
          height="100%"
          width="100%"
          style={{ background: 'black' }}
          ref={videoRef}
          preload="metadata"
          onLoadedMetadata={() => setVideoDuration()}
        >
          <source src="/sample-mp4-file-small.mp4" type="video/mp4"></source>
        </video>
        {videoControls.animationIcon === 'play' ? (
          <FaPlay className={Styles.playPauseIconAnimation} />
        ) : videoControls.animationIcon === 'pause' ? (
          <FaPause className={Styles.playPauseIconAnimation} />
        ) : videoControls.animationIcon === 'backward' ? (
          <MdReplay5
            color="white"
            className={Styles.playPauseIconAnimation}
            style={{ left: 10 + '%' }}
          />
        ) : videoControls.animationIcon === 'forward' ? (
          <MdForward5
            color="white"
            className={Styles.playPauseIconAnimation}
            style={{ left: 90 + '%' }}
          />
        ) : videoControls.animationIcon === 'volume' ? (
          <span className={Styles.VolumeTextAnimation}>
            Volume {videoControls.volume} %
          </span>
        ) : (
          ''
        )}
        <PlayerActions />
      </div>
    </div>
  );
};

export default VideoPlayer;
