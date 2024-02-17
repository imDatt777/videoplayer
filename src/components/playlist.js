// Importing NPM Dependencies
import React, { useState } from "react";

// Importing Helper Method
import { trimText } from "../utilities/helperMethods";

const Playlist = (props) => {
    const { videos, onVideoSelect, setVideos, setIsPlaying } = props;
    const [playlist, setPlaylist] = useState(videos);

    /**
     * VideoSelectHandler
     *
     * @description - Method to handle video selection from playlist
     * @param {Number} index - The index of the video
     * @returns {undefined}
     */
    const videoSelectHandler = (index) => {
        /* Call the onVideoSelect function with the selected video index */
        if (onVideoSelect) {
            onVideoSelect(index);
            /* Whenever a  new video is selected set playing state to be true */
            setIsPlaying(true);
        }
    };

    /**
     * HandleDragStart
     *
     * @description - Method to handle drag start for reordering videos in playlist
     * @param {Object} event - The event object
     * @param {Number} index - The index of the video
     * @returns {undefined}
     */
    const handleDragStart = (event, index) => {
        /* Store the index of the dragged video in the dataTransfer object */
        event.dataTransfer.setData("index", index);
    };

    /**
     * HandleDragOver
     *
     * @description - Method to handle drag over for reordering videos in playlist
     * @param {Object} event - The event object
     * @returns {undefined}
     */
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    /**
     * HandleDrop
     *
     * @description - Method to handle drop for reordering videos in playlist
     * @param {Object} event - The event object
     * @param {Number} targetIndex - The target index to define order of video in playlist
     */
    const handleDrop = (event, targetIndex) => {
        event.preventDefault();
        const draggedIndex = event.dataTransfer.getData("index");
        const newPlaylist = [...playlist];
        const [draggedItem] = newPlaylist.splice(draggedIndex, 1);
        newPlaylist.splice(targetIndex, 0, draggedItem);
        setPlaylist(newPlaylist);
        setVideos(newPlaylist);
    };

    return (
        <div className=' px-[10px] max-h-[660px] mt-[10px] tablet:w-[30%] tablet:overflow-y-auto tablet:ml-[20px]'>
            <ul className='max-h-full'>
                {playlist.map((video, index) => (
                    <li
                        className='cursor-pointer flex mt-[10px] first:mt-0'
                        key={index}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                        onClick={() => videoSelectHandler(index)}
                    >
                        <img
                            className='h-[90px] w-[160px] object-cover bg-black rounded-[5px]'
                            src={video?.thumb}
                            alt={video.title}
                        />
                        <div className='block ml-[10px] pt-[5px] mr-[10px]'>
                            <p className=' text-[16px] leading-5 font-medium text-white'>
                                {video?.title}
                            </p>
                            <p className='mt-[5px] text-[12px] leading-4 text-white'>
                                {trimText(video?.description, 40)}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Playlist;
