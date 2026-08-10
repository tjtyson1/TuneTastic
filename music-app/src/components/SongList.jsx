import _React from "react"
import { useState, useRef, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { usePlayer } from "../context/PlayerContext";
import { useNavigate } from "react-router-dom";


export default function Songlist({list,  playSong ,  removeSong , function3}){
   const {upscaleImage, normalizeSong} = usePlayer()
   const navigate = useNavigate()
    return(
        <div className="pb-20"> 
                       {list?.map((song,index) => (
        
                                <div key={song?.videoId} 
                                onClick={() => {playSong(normalizeSong(song), list)}}
                                className="flex justify-between items-center p-4 border-t hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer group">
                                
                                    <div className="flex gap-4 items-center">
                                        <div 
                                            className="text-gray-600 dark:text-gray-400 group-hover:hidden">
                                                {index + 1} 
                                            
                                        </div>
                                        
                                        <div className="hidden group-hover:block text-gray-600 dark:text-gray-300">
                                                <FontAwesomeIcon className="" icon="fa-solid fa-play" />
                                                </div>
                                        <div>
                                            <img src={upscaleImage(song.thumbnail, 60)} alt="" 
                                                className='rounded-lg w-15 h-15'/>
                                            
                                        </div>
        
                                        <div className="">
                                            {song?.title}
                                            <p className="text-gray-600 dark:text-gray-400">{song?.artist?.name}</p>
                                            <p className='text-gray-500 hover:underline'
                                                onClick={(e) => {e.stopPropagation(); 
                                                    navigate(song?.artists?.[0].browseId? `/artist/${song?.artists?.[0].browseId}` : `/search?q=${song?.artists?.[0].name}&filter=artists`)}}
                                            >{song.artists.map(artist => artist?.name).join(", ") || ""}</p>
                                    </div>
                                    </div>
                                    
                                    <div className="flex gap-4 items-center">
                                        <div className="text-gray-600 dark:text-gray-300 dark:hover:text-gray-500 hidden hover:text-gray-400 group-hover:block">
                                                <button title="Remove from library" onClick={(e) =>{e.stopPropagation();removeSong(song.videoId)}}>
                                                    <FontAwesomeIcon  icon="fa-solid fa-x " />
                                                </button>
                                            
                                        </div>
                                        
                                        <p>{song?.duration}</p>
                                        <div className="text-gray-600 dark:text-gray-300 dark:hover:text-gray-500 hidden hover:text-gray-400 group-hover:block">
                                            <button title="More Options">
                                                <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                                            </button>
                                            
                                        </div>
                                        
        
                                    </div>
                                        
                                        
                                </div>
                            
                            ))}
                        </div>
    )

}