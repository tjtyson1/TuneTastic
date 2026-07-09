import _React from "react"
import { useState, useRef, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { usePlayer } from "../context/PlayerContext";
function AudioPlayer({songCover, songTitle, artists, streamUrl}){

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const audioRef = useRef(null);
    const { shuffle, toggleShuffle,  nextSong, previousSong, currentSong, isVisible, setVisible } = usePlayer();
    //Load new song
    useEffect(() =>{

        if(!streamUrl) return;

        
       
            const audio = audioRef.current;
           if (!audio || !streamUrl) return;
           
                audio.pause();
                audio.src = streamUrl;
                audio.load();
               
                setCurrentTime(0);
                setDuration(0);

                const playPromise = audio.play()
                
                if (playPromise !== undefined){
                    playPromise.catch(err => {
                        console.error("Playback failed;", err);
                    });
                }
                
                const onLoaded = () => setDuration(audio.duration);
                audio.addEventListener("loadedmetadata", onLoaded)
               
                return() => {
                    audio.removeEventListener("loadedmetadata", onLoaded)   
                };
    }, [streamUrl]);

    useEffect(() =>{
        const audio = audioRef.current;
        if(!audio) return;
    
        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);
        const onEnded = () => nextSong?.();

        audio.addEventListener("play", onPlay);
        audio.addEventListener("pause", onPause);
        audio.addEventListener("ended", onEnded);

        return() => {
            audio.removeEventListener("play", onPlay);
            audio.removeEventListener("pause", onPause);
            audio.removeEventListener("ended", onEnded);
        };
    }, []);
    
    //track progress
    useEffect(()=>{

        const audio = audioRef.current;

        const update = () => {
            if (!audio) return
             setCurrentTime(audio.currentTime);
        };
       

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
        if (!audio) return

        if (isPlaying){
            audio.pause();
            
        } else{
            audio.play();
            
        }
    };
        useEffect(() => {
            if (audioRef.current) {
                audioRef.current.volume = volume;
            }
        }, [volume]);
        const handleVolume = (e) =>{

             const audio = audioRef.current;
             if (!audio) return

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
        <div className="fixed bottom-0 left-0 w-full bg-gray-600/80 text-white flex items-center justify-between px-4 py-3 ">
           <img 
           className="rounded"
           loading="lazy"
            src={songCover} 
           alt="" 
           onError={(e) =>{e.target.onerror = null; e.target.src = "/assets/albumPlaceHolder.png"}}/>

            <div className="w-1/3">
                <p className="text-sm">{songTitle || "No song selected"}</p>
                <p className="text-xs text-gray-200">{artists?.map(artist => artist.name).join(", ")}</p>
            </div>
            
            <span>{formatTime(currentTime)}</span>
            <input 
                className="w-full h-2 bg-blue-500 accent-yellow-300"
                type="range"
                min="0"
                max={Number.isFinite(duration) ? duration : 0}
                value={currentTime}
                onChange={handleSeek}/>

            <span>{formatTime(duration)}</span>
            
            <button onClick={previousSong} className="text-xl hover:cursor-pointer">
                <FontAwesomeIcon icon="fa-solid fa-backward-step" />
            </button>
            <button onClick={handlePlayPause} className="text-xl hover:cursor-pointer">
                    {isPlaying ? <FontAwesomeIcon icon="fa-solid fa-pause" /> : <FontAwesomeIcon icon="fa-solid fa-play" />}
            </button>  
            
            <button onClick={nextSong} className="text-xl hover:cursor-pointer">
                <FontAwesomeIcon icon="fa-solid fa-forward-step" />
            </button>

            <button onClick={toggleShuffle} className={`text-xl hover:cursor-pointer ${shuffle ? "text-primary" : "" }`}>
                <FontAwesomeIcon icon="fa-solid fa-shuffle" /> 
            </button>
            <button onClick={() =>!isVisible ? setVisible(true): setVisible(false) }className="text-xl hover:cursor-pointer">
                <FontAwesomeIcon icon="fa-solid fa-list"/>
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

            <audio ref={audioRef} onEnded={nextSong}/>
              
        </div>

        
    );
}


export default AudioPlayer 