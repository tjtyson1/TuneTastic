import { usePlayer } from "../context/PlayerContext"
import { motion } from "motion/react"
import albumPlaceHolder from "../assets/albumPlaceHolder.png"
import { useEffect } from "react"
import { useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
export default function MobAudioPlayer(){
    const {
        showMobAudio, 
        setShowMobAudio, 
        currentSong, 
        upscaleImage,
         audioRef,
        duration,
        setDuration,
        isPlaying,
        setIsPlaying,
        volume,
        setVolume,
        currentTime,
        setCurrentTime,
        nextSong,
        previousSong,
        toggleShuffle,
        shuffle
    } = usePlayer()
    
    const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
        audio.play().catch(console.error);
    } else {
        audio.pause();
    }
};
    const handleSeek = e => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.currentTime = Number(e.target.value);
        setCurrentTime(audio.currentTime);
    };
        const handleVolume = e => {
        const audio = audioRef.current;
        if (!audio) return;

        const newVolume = Number(e.target.value);
        audio.volume = newVolume;
        setVolume(newVolume);
    };
    const songCover = currentSong?.thumbnails?.[0]?.url || currentSong?.thumbnail || albumPlaceHolder

    
    return(
        <div className= {`${showMobAudio ? "fixed" : "hidden"} top-1 left-1 h-screen w-screen bg-gray-300 dark:bg-gray-800  text-gray-900 dark:text-gray-200  pt-20 `} >
            <motion.div
             drag="y"
             dragConstraints={{ top: 0, bottom: 0 }}
             onDragEnd={() => {setShowMobAudio(!showMobAudio)}}
            className=" bg-gray-400 dark:bg-gray-700   rounded-full w-1/4 h-3 flex justify-self-center"
            >
            </motion.div>

            <div className="flex flex-col items-center justify-center h-full">
                <div className={`${window.innerWidth>768 ? "w-lg":"w-full"}block p-10   `}>
                    <picture className="flex items-center justify-center">
                        <source  
                            media="(min-width: 768px)"
                            srcSet={upscaleImage(songCover, 400)}/>
                        <source  
                            media="(min-width: 480px)"
                            srcSet={upscaleImage(songCover, 400)}/>

                        <img
                    className="rounded-lg object-cover "
                    loading="lazy"
                    src={upscaleImage(songCover, 300)}
                    alt=""
                    onLoad={() => console.log("IMAGE LOADED")}
                    onError={(e) => {console.log("IMAGE ERROR:", e.currentTarget.src); 
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = albumPlaceHolder;}}
                        />
                    </picture>
                    
                <div className="self-start text-xl pt-6 ">
                    <h1>
                    {currentSong?.title || "No song selected"}
                </h1>
                <h2 className="dark:text-gray-300">
                     {currentSong?.artists
                            ?.map(artist => artist?.name)
                            .join(", ")}
                </h2>

                <input  
                className="accent-primary flex w-full h-1 bg-primary mt-4 "
                type="range"
                min="0"
                max={Number.isFinite(duration) ? duration : 0}
                value={currentTime}
                onChange={handleSeek} />
                </div>
                <div className="flex flex-col justify-center text-4xl py-4">
                    <div className="flex justify-center py-4 ">
                            <div className="flex">
                                <button
                                    onClick={toggleShuffle}
                                    className={`hidden lg:block text-md hover:cursor-pointer  text-lg
                                        ${shuffle ? "text-primary" : ""}`
                                    }
                                >
                                    <FontAwesomeIcon icon="fa-solid fa-shuffle" />
                                </button>

                                <button
                                    onClick={previousSong}
                                    className=" hover:cursor-pointer text-2xl"
                                >
                                    <FontAwesomeIcon icon="fa-solid fa-backward" />
                                </button>

                <button
                    onClick={togglePlayback}
                    className="hover:cursor-pointer"
                >
                    {isPlaying ? (
                        <FontAwesomeIcon icon="fa-solid fa-pause" />
                    ) : (
                        <FontAwesomeIcon icon="fa-solid fa-play" />
                    )}
                </button>

                <button
                    onClick={nextSong}
                    className="hover:cursor-pointer text-2xl"
                >
                    <FontAwesomeIcon icon="fa-solid fa-forward" />
                </button>

                        </div>

                </div>
                <div className="flex ">
                     <input
                    className="accent-primary flex w-full h-1 bg-primary  "
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolume}
                />

                </div>
                   

                </div>

                </div>
                 


                
                </div>
        </div>
    )
}