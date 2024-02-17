// Importing NPM Dependencies
import React, { useState, useRef, useEffect } from "react";

// Importing Component
import Controls from "./primary/controls";

const VideoPlayer = (props) => {
    const {
        video,
        autoPlay = false,
        height = "auto",
        width = "100%",
        onVideoEnd,
        isPlaying,
        setIsPlaying,
    } = props;

    const videoRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [speed, setSpeed] = useState(1);
    const [isMuted, setIsMuted] = useState(true);
    const [volume, setVolume] = useState(0);

    useEffect(() => {
        const video = videoRef.current;

        /* Update current time and duration of video */
        const updateTime = () => {
            setCurrentTime(video.currentTime);
            setDuration(video.duration);
        };

        video.addEventListener("timeupdate", updateTime);

        /* Play Video */
        const playVideo = () => {
            video.play();
            setIsPlaying(true);
        };

        // If autoPlay is enabled, play the video immediately
        if (autoPlay) {
            playVideo();
        }

        // If autoPlay is not enabled, wait for user interaction to set autoPlay attribute
        const handleUserInteraction = () => {
            if (!autoPlay) {
                playVideo();
            }

            // Remove the event listener after the first user interaction
            window.removeEventListener("click", handleUserInteraction);
        };

        window.addEventListener("click", handleUserInteraction);

        const handleVideoEnd = () => {
            // Call the onVideoEnd callback if provided
            if (onVideoEnd) {
                onVideoEnd();
            }
        };

        video.addEventListener("ended", handleVideoEnd);

        return () => {
            video.removeEventListener("timeupdate", updateTime);
            video.removeEventListener("ended", handleVideoEnd);
        };

        // eslint-disable-next-line
    }, []);

    return (
        <section className='video-player w-full tablet:w-[70%] m-[5px]'>
            <video
                ref={videoRef}
                src={video?.src}
                className='bg-black w-full max-h-[540px] object-contain rounded-t-xl'
                height={height}
                width={width}
                muted={isMuted}
                autoPlay={autoPlay}
            />
            {/* Controls Section */}
            <Controls
                {...{
                    videoRef,
                    isPlaying,
                    setIsPlaying,
                    isMuted,
                    setIsMuted,
                    setVolume,
                    duration,
                    currentTime,
                    setCurrentTime,
                    speed,
                    volume,
                    setSpeed,
                }}
            />
            <div className='mt-[20px] px-[15px] py-[20px] rounded-xl bg-[#404040]'>
                <h3 className='text-[20px] leading-6 font-semibold text-white'>
                    {video?.title}
                </h3>
                <p className='text-[16px] leading-5 mt-[10px] text-white'>
                    {video?.description}
                </p>
            </div>
        </section>
    );
};

export default VideoPlayer;
