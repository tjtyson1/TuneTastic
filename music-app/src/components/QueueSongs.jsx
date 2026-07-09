import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { usePlayer } from "../context/PlayerContext"

export default function QueueSongs({list}){
    const {song, playSong, removeSong, currentSong, upscaleImage} = usePlayer()
    
    return(
        <div className="snap-y">
                {list?.map((song,index) => (
    
                    <div key={song?.videoId} 
                    onClick={() => playSong(song, list)}
                    className={`flex justify-between items-center p-4 border-t hover:bg-gray-200 cursor-pointer group snap-start`}>
                    
                        <div className="flex gap-4 items-center ">
                            <div 
                                className="text-gray-200 group-hover:hidden">
                                    {index + 1} 
                                
                            </div>
                            
                            <div>
                                <img src={song?.thumbnail || song.thumbnails[0].url} alt="" 
                                    className='rounded-lg'/>
                                
                            </div>

                            <div className="text-white">
                                {song?.title}
                                <p className="text-gray-200">{song?.artist?.name}</p>
                                <p className='text-gray-300'>{song?.artists?.map(artist => artist.name).join(", ")}</p>
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