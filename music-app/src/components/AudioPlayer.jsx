import _React from "react";
import MarqueeModule from "react-fast-marquee";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { usePlayer } from "../context/PlayerContext";
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

const Marquee = MarqueeModule.default ?? MarqueeModule;

function AudioPlayer({ songCover, songTitle, artists, streamUrl }) {


    const {
        shuffle,
        toggleShuffle,
        nextSong,
        previousSong,
        currentSong,
        isVisible,
        setVisible,
        upscaleImage,
        addSongToLibrary,
        setOpenMenu,
        openMenu,
        openDropdown,
        currentUser,
        shouldAutoPlay,
        setShowMobAudio,
        showMobAudio,
        audioRef,
        duration,
        setDuration,
        currentTime,
        setCurrentTime,
        isPlaying,
        setIsPlaying,
        volume,
        setVolume
    } = usePlayer();

    const navigate = useNavigate();

    // Load a song and restore its saved position.
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !streamUrl) return;

        const positionKey = currentSong?.videoId
            ? `song-position:${currentSong.videoId}`
            : null;

        const savePosition = () => {
            if (!positionKey || audio.readyState < 1) return;

            localStorage.setItem(
                positionKey,
                String(audio.ended ? 0 : audio.currentTime)
            );
        };

        const onLoaded = () => {
            setDuration(audio.duration);

            const savedTime = positionKey
                ? Number(localStorage.getItem(positionKey) || 0)
                : 0;

            if (
                !shouldAutoPlay &&
                Number.isFinite(savedTime) &&
                savedTime > 0 &&
                Number.isFinite(audio.duration) &&
                savedTime < audio.duration
            ) {
                audio.currentTime = savedTime;
            }

            setCurrentTime(audio.currentTime);

            if (shouldAutoPlay) {
                audio.play().catch(error => {
                    console.error("Playback failed:", error);
                });
            } else {
                audio.pause();
                setIsPlaying(false);
            }
        };

        const onTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
            savePosition();
        };

        const onError = () => {
            console.error("Audio element error:", audio.error);
        };

        audio.pause();
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);

        audio.addEventListener("loadedmetadata", onLoaded);
        audio.addEventListener("timeupdate", onTimeUpdate);
        audio.addEventListener("pause", savePosition);
        audio.addEventListener("ended", savePosition);
        audio.addEventListener("error", onError);
        window.addEventListener("pagehide", savePosition);

        audio.src = streamUrl;
        audio.load();

        return () => {
            savePosition();

            audio.removeEventListener("loadedmetadata", onLoaded);
            audio.removeEventListener("timeupdate", onTimeUpdate);
            audio.removeEventListener("pause", savePosition);
            audio.removeEventListener("ended", savePosition);
            audio.removeEventListener("error", onError);
            window.removeEventListener("pagehide", savePosition);
        };
    }, [streamUrl]);

    // Keep the button synchronized with actual playback.
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);

        audio.addEventListener("play", onPlay);
        audio.addEventListener("pause", onPause);

        return () => {
            audio.removeEventListener("play", onPlay);
            audio.removeEventListener("pause", onPause);
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const handleSeek = e => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.currentTime = Number(e.target.value);
        setCurrentTime(audio.currentTime);
    };

    const handlePlayPause = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (audio.paused) {
            audio.play().catch(error => {
                console.error("Playback failed:", error);
            });
        } else {
            audio.pause();
        }
    };

    const handleVolume = e => {
        const audio = audioRef.current;
        if (!audio) return;

        const newVolume = Number(e.target.value);
        audio.volume = newVolume;
        setVolume(newVolume);
    };

    const formatTime = time => {
        if (!Number.isFinite(time)) return "0:00";

        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);

        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <motion.div
            animate={{
                x: isVisible ? "-70%" : "-50%",
            }}
            transition={{
                duration: 0.3,
            }}
            drag="y"
            onDragEnd={() => {setShowMobAudio(!showMobAudio)}}
            dragConstraints={{ top: 0, bottom: 0 }}
            className={`${!currentUser ||showMobAudio ? "hidden" : "block"} fixed bottom-2 w-4/6 left-1/2
                bg-gray-200/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-200 border-gray-200
                dark:border-gray-600 flex items-center justify-between px-4 py-3 rounded-full border`}
        >
            <div className="flex">
                <img
                    className="rounded-lg h-[60px] w-[60px] ml-3"
                    loading="lazy"
                    src={upscaleImage(songCover, 60)}
                    alt=""
                    onError={() => {}}
                />

                <div className="px-2 w-1/3 lg:w-1/2">
                    <Marquee speed={20} pauseOnHover={true} >
                        <p
                            className="text-sm line-clamp-1 ml-1"
                            title={songTitle}
                        >
                            {songTitle || "No song selected"}
                        </p>
                        <p>
                            
                        </p>
                    </Marquee>

                    <Marquee speed={20} pauseOnHover={true}>
                        <p
                        className="text-xs text-gray-600 dark:text-gray-400 hover:cursor-pointer hover:underline line-clamp-2 ml-1 "
                        onClick={e => {
                            e.stopPropagation();

                            navigate(
                                currentSong?.artists?.[0]?.browseId
                                    ? `/artist/${currentSong.artists[0].browseId}`
                                    : `search?q=${currentSong?.artists?.[0]?.name}&filter=artists`
                            );
                        }}
                    >
                        {currentSong?.artists
                            ?.map(artist => artist?.name)
                            .join(", ")}
                    </p>


                    </Marquee>
                    
                </div>
            </div>

            <span className="hidden lg:flex px-2 ml-2">
                {formatTime(currentTime)}
            </span>

            <input
                className="hidden lg:flex w-full h-2 bg-primary accent-primary"
                type="range"
                min="0"
                max={Number.isFinite(duration) ? duration : 0}
                value={currentTime}
                onChange={handleSeek}
            />

            <span className="hidden lg:flex px-2 mr-2">
                {formatTime(duration)}
            </span>

            <div className="flex px-2">
                <button
                    onClick={previousSong}
                    className="hidden lg:block text-xl hover:cursor-pointer"
                >
                    <FontAwesomeIcon icon="fa-solid fa-backward" />
                </button>

                <button
                    onClick={handlePlayPause}
                    className="text-xl hover:cursor-pointer"
                >
                    {isPlaying ? (
                        <FontAwesomeIcon icon="fa-solid fa-pause" />
                    ) : (
                        <FontAwesomeIcon icon="fa-solid fa-play" />
                    )}
                </button>

                <button
                    onClick={nextSong}
                    className="text-xl hover:cursor-pointer"
                >
                    <FontAwesomeIcon icon="fa-solid fa-forward" />
                </button>
            </div>

            <button
                onClick={toggleShuffle}
                className={`hidden lg:block text-md hover:cursor-pointer ${
                    shuffle ? "text-primary" : ""
                }`}
            >
                <FontAwesomeIcon icon="fa-solid fa-shuffle" />
            </button>

            <button
                onClick={() => setVisible(!isVisible)}
                className="hidden lg:block text-md hover:cursor-pointer"
            >
                <FontAwesomeIcon icon="fa-solid fa-list" />
            </button>

            <button
                className={`${!currentSong ? "hidden" : "block"} hidden lg:block hover:cursor-pointer text-md`}
                title="Add to Library"
                onClick={() => addSongToLibrary(currentSong)}
            >
                <FontAwesomeIcon icon="fa-solid fa-plus" />
            </button>

            <button
                className={`${!currentSong ? "hidden" : "block"} hidden lg:block hover:cursor-pointer text-md`}
                onClick={e => {
                    e.stopPropagation();
                    openDropdown(e, currentSong);
                }}
            >
                <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
            </button>

            <div className="justify-between hidden lg:flex text-lg justify-center">
                <FontAwesomeIcon icon="fa-solid fa-volume" />

                <input
                    className="accent-primary"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolume}
                />
            </div>

            <audio ref={audioRef} onEnded={nextSong} />
        </motion.div>
    );
}

export default AudioPlayer;