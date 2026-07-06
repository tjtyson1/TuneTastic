import _React from "react"
import { useState, useRef, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'


export default function Songlist({list,  playSong ,  removeSong , function3 }){
    return(
        <div > 
                       {list?.map((song,index) => (
        
                                <div key={song?.videoId} 
                                onClick={() => playSong(song, list)}
                                className="flex justify-between items-center p-4 border-t hover:bg-gray-200 cursor-pointer group">
                                
                                    <div className="flex gap-4 items-center">
                                        <div 
                                            className="text-gray-600 group-hover:hidden">
                                                {index + 1} 
                                            
                                        </div>
                                        
                                        <div className="hidden group-hover:block text-gray-600 ">
                                                <FontAwesomeIcon className="" icon="fa-solid fa-play" />
                                                </div>
                                        <div>
                                            <img src={song.thumbnail} alt="" 
                                                className='rounded-lg'/>
                                            
                                        </div>
        
                                        <div className="">
                                            {song?.title}
                                            <p className="text-gray-600">{song?.artist?.name}</p>
                                            <p className='text-gray-500'>{song.artists.map(artist => artist.name).join(", ")}</p>
                                    </div>
                                    </div>
                                    
                                    <div className="flex gap-4 items-center">
                                        <div className="text-gray-600 hidden hover:text-gray-400 group-hover:block">
                                                <button title="Remove from library" onClick={() =>{removeSong(song.videoId)}}>
                                                    <FontAwesomeIcon  icon="fa-solid fa-x " />
                                                </button>
                                            
                                        </div>
                                        
                                        <p>{song?.duration}</p>
                                        <div className="text-gray-600 hidden hover:text-gray-400 group-hover:block">
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