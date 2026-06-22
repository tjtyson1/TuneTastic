import _React from "react"
import { useState, useRef, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

function AudioPlayer({streamUrl, songTitle, artists, songCover}){

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const audioRef = useRef(null);

    //Load new song
    useEffect(() =>{

        if(!streamUrl) return;

        const audio = audioRef.current;

        async function loadSong(){

            try{
                
                audio.src = streamUrl;
                audio.play();
                setIsPlaying(true);

                audio.onloadedmetadata = () => {
                    setDuration(audio.duration);
                }
            }
            catch (error){
            
            console.error("Playback failed:", error)
            
        } 
        }
        loadSong();
       

    }, [streamUrl]);

    //track progress
    useEffect(()=>{

        const audio = audioRef.current;

        const update = () => setCurrentTime(audio.currentTime);

        audio.addEventListener("timeupdate",update);

        return () => audio.removeEventListener("timeupdate", update);
    }, []);
    const handleSeek = (e) =>{

        const audio = audioRef.current;
        audio.currentTime = Number(e.target.value);
        setCurrentTime(audio.currentTime);
    }

    const handlePlayPause = () => {

        const audio = audioRef.current;

        if (isPlaying){
            audio.pause();
            setIsPlaying(false);
        } else{
            audio.play();
            setIsPlaying(true);
        }
    }

    const handleVolume = (e) => {

        const audio = audioRef.current;

        const newVolume = Number(e.target.value);

        audio.volume = newVolume;

        setVolume(newVolume)
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time/ 60);

        const seconds = Math.floor(time % 60);

        return `${minutes}:${seconds.toString().padStart(2,"0")}`;
    }
    return(
        <div className="fixed bottom-0 left-0 w-full bg-gray-600 text-white flex items-center justify-between px-4 py-3 ">
           <img loading="lazy" src={songCover} alt="" onError={(e) =>{e.target.onerror = null; e.target.src = "/assets/albumPlaceHolder.png"}}/>

            <div className="w-1/3">
                <p className="text-sm">{songTitle || "No song selected"}</p>
                <p className="text-xs text-gray-200">{artists?.map(artist => artist.name).join(", ")}</p>
            </div>
            
            <span>{formatTime(currentTime)}</span>
            <input 
                className="w-full h-2 bg-blue-500 accent-yellow-300"
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={handleSeek}/>

            <span>{formatTime(duration)}</span>
            

            <button onClick={handlePlayPause} className="text-xl hover:cursor-pointer">
                    {isPlaying ? <FontAwesomeIcon icon="fa-solid fa-pause" /> : <FontAwesomeIcon icon="fa-solid fa-play" />}
            </button>  
            
            <FontAwesomeIcon icon="fa-solid fa-volume" />
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolume}
/>
            <div className="w-1/3 text-right text-xs">LOGO</div>

            <audio ref={audioRef} />
              
        </div>

        
    );
};


export default AudioPlayer 