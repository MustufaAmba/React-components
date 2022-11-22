import { MutableRefObject } from 'react';
export interface Document extends HTMLDivElement {
  msRequestFullscreen(): Element;
  mozRequestFullScreen(): Element;
  webkitRequestFullscreen(): Element;
  exitFullscreen(): void;
  fullscreenElement: Element;
  msExitFullscreen(): void;
  msFullscreenElement: Element;
  mozCancelFullScreen(): void;
  mozFullScreenElement(): void;
  webkitFullscreenElement: Element;
  webkitExitFullscreen(): void;
  webkitCancelFullScreen(): void;
  webkitIsFullScreen: Element;
  mozFullScreen: Element;
}
export type VideoControlsType = {
  play: boolean;
  mute: boolean;
  fullScreen: boolean;
  totalSeconds: number;
  seconds: number;
  minutes: number;
  hours: number;
  currentTime: number;
  totalDuration: string;
  startTime: number;
};
export type ContextType = {
  videoControls: VideoControlsType;
  setVideoControls: (value: any) => void;
  videoRef: MutableRefObject<HTMLVideoElement>;
  videoContainerRef: MutableRefObject<Document>;
  handleVideoSpeakerState: () => void;
  handlePlayPauseVideo: () => void;
  handleVideoFullScreen: (value: boolean) => void;
  calculateTime: (hours: number, minutes: number, seconds: number) => number;
  handleCurrentTimeChange: (value?: string) => void;
};
