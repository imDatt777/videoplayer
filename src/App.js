// Importing NPM Dependencies
import React, { useState } from "react";

// Importing Components
import VideoPlayer from "./components/videoPlayer";
import Playlist from "./components/playlist";

// Importing Styles
import "./App.css";

// Importing JSON Data
import videosData from "./utilities/media.json";

function App() {
    const [videos, setVideos] = useState(videosData?.videos);
    const [isPlaying, setIsPlaying] = useState(false);
    const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

    /**
     * HandleVideoSelect
     *
     * @description - Method for handling video selection
     * @param {Number} index
     */
    const handleVideoSelect = (index) => {
        setSelectedVideoIndex(index);
    };

    /**
     * HandleVideoEnd
     *
     * @description - Method for autoplaying next video from playlist when the current video ends
     * @returns {undefined}
     */
    const handleVideoEnd = () => {
        // Autoplay next video when the current video ends
        setSelectedVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    };

    return (
        <div className=' w-full py-[20px] px-[10px] bg-[#121212] tablet:flex tablet:py-[30px] px-[50px]'>
            <VideoPlayer
                video={videos[selectedVideoIndex]}
                onVideoEnd={handleVideoEnd}
                autoPlay
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
            />
            <Playlist
                videos={videos}
                onVideoSelect={handleVideoSelect}
                setVideos={setVideos}
                setIsPlaying={setIsPlaying}
            />
        </div>
    );
}

export default App;
