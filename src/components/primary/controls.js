// Importing NPM Dependencies
import React from "react";

// Importing Assets
import playIcon from "../../assets/play.png";
import pause from "../../assets/pause.png";
import mute from "../../assets/mute.png";
import unmute from "../../assets/sound.png";

// Importing Helper Method
import { formatTime } from "../../utilities/helperMethods";

const Controls = (props) => {
    const {
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
    } = props;

    /**
     * VolumeChangeHandler
     *
     * @description - Method to change the volume of the video player
     * @param {Object} event - Event Object
     * @returns {undefined}
     */
    const volumeChangeHandler = (event) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        videoRef.current.volume = newVolume;
        if (newVolume === 0) {
            setIsMuted(true);
        } else {
            setIsMuted(false);
        }
    };

    /**
     * PlayToggleHandler
     *
     * @description - Method to toggle the playing state of the video player
     * @returns {undefined}
     */
    const playToggleHandler = () => {
        const video = videoRef.current;
        if (isPlaying) {
            video.pause();
        } else {
            video.play();
        }
        setIsPlaying(!isPlaying);
    };

    /**
     * SeekHandler
     *
     * @description - Method to handle the time seek functionality
     * @param {Object} event - Event object
     * @returns {undefined}
     */
    const seekHandler = (event) => {
        const video = videoRef.current;
        const newTime = event.target.value;
        video.currentTime = newTime;
        setCurrentTime(newTime);
    };

    /**
     * SpeedChangeHandler
     *
     * @description - Method to change the playback speed of the video player
     * @param {Object} event - Event Object
     * @returns {undefined}
     */
    const speedChangeHandler = (event) => {
        const newSpeed = parseFloat(event.target.value);
        setSpeed(newSpeed);
        videoRef.current.playbackRate = newSpeed;
    };

    /**
     * MuteToggleHandler
     *
     * @description - Method to change the mute/sound state of the video player
     * @returns {undefined}
     */
    const muteToggleHandler = () => {
        const video = videoRef.current;
        if (isMuted) {
            video.volume = volume;
            setVolume(0.2);
        } else {
            video.volume = 0;
            setVolume(0);
        }
        setIsMuted(!isMuted);
    };

    return (
        <div className='controls bg-black py-2 px-[5px] flex items-center justify-between rounded-b-xl'>
            <button onClick={playToggleHandler} className='text-white'>
                <img
                    className='h-[15px] w-[15px] tablet:h-[20px] tablet:w-[20px]'
                    src={isPlaying ? pause : playIcon}
                    alt={isPlaying ? "Pause" : "Play"}
                />
            </button>
            {/* Time Progress */}
            <input
                className='flex-1 mx-[5px] max-w-[50px] tablet:max-w-[700px]'
                type='range'
                min={0}
                step={1}
                max={Math.floor(duration)}
                value={currentTime}
                onChange={seekHandler}
            />
            {/* Time */}
            <span className='time text-[8px] text-white tablet:text-[12px]'>
                {`${formatTime(currentTime)} / ${formatTime(duration)}`}
            </span>
            <button onClick={muteToggleHandler} className='text-white ml-[5px]'>
                <img
                    className='h-[15px] w-[15px] tablet:h-[20px] tablet:w-[20px]'
                    src={isMuted ? mute : unmute}
                    alt={isMuted ? "Mute" : "Unmute"}
                />
            </button>
            {/* Volume */}
            <input
                className='max-w-[50px] tablet:max-w-[100px]'
                type='range'
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={volumeChangeHandler}
            />
            <select
                value={speed}
                onChange={speedChangeHandler}
                className='ml-[5px] bg-gray-700 text-white rounded-[5px]'
            >
                <option value={0.25}>0.25x</option>
                <option value={0.5}>0.5x</option>
                <option value={0.75}>0.75x</option>
                <option value={1}>Normal</option>
                <option value={1.25}>1.25x</option>
                <option value={1.5}>1.5x</option>
                <option value={1.75}>1.75x</option>
                <option value={2}>2x</option>
            </select>
        </div>
    );
};

export default Controls;
