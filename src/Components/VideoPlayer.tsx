import { useContext, useEffect } from 'react';
import { FC } from 'react';
import Header from './Header';
import PlayerActions from './PlayerActions';
import { CustomVideoPlayerContext } from '../Context/VideoPlayerContext/VideoPlayerContext';
const VideoPlayer: FC = () => {
  const { videoRef, videoContainerRef, setVideoControls } = useContext(
    CustomVideoPlayerContext
  );
  useEffect(() => {
    console.log(videoRef.current.duration);
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
  }, [videoRef.current]);
  return (
    <div>
      <Header />
      <div style={{ padding: '50px', width: '100%' }} ref={videoContainerRef}>
        <h3>Custom Video Player</h3>
        <video
          height="500px"
          width="100%"
          style={{ background: 'black' }}
          ref={videoRef}
        >
          <source src="/video2.mp4" type="video/mp4"></source>
        </video>
        <PlayerActions />
      </div>
    </div>
  );
};

export default VideoPlayer;
