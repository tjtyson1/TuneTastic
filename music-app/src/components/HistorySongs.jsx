import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { usePlayer } from "../context/PlayerContext"

export default function HistorySongs({list}){
    const {song, playSong, removeSong, currentSong, upscaleImage, setHistory, history, normalizeSong, openDropdown} = usePlayer()
    
    function removeSongFromHistory(videoId){
        setHistory(prev => 

                prev.filter(
                    song => song.videoId !== videoId
        ));
        
        
        }
    function clearHistory(){
        setHistory([])
    }
    
    return(
        <div className="">
                {list?.map((song,index) => (
    
                    <div key={`{song?.videoId}-${index}`} 
                    onClick={(e) => {e.stopPropagation(); playSong(normalizeSong(song), list)}}
                    className={`flex justify-between items-center p-4 border-b last:border-none border-gray-400 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer group snap-start`}>
                    
                        <div className="flex gap-4 items-center ">
                            <div 
                                className="text-gray-900 dark:text-gray-200 group-hover:hidden">
                                    {index + 1} 
                                
                            </div>
                            
                            <div>
                                <img src={song?.thumbnail || song.thumbnails[0].url} alt="" 
                                    className='rounded-lg w-15 h-15 object-cover '/>
                                
                            </div>

                            <div className="text-gray-900 dark:text-gray-200 line-clamp-3 w-50">
                                {song?.title}
                                <p className='text-gray-700 dark:text-gray-400 '>{song?.artists?.map(artist => artist.name).join(", ")}</p>
                        </div>
                        </div>
                        
                        <div className="flex gap-4 items-center">
                            <p className="text-gray-800 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300">{song?.duration}</p>
                            <div className="text-gray-800 hidden hover:text-gray-600 group-hover:block dark:text-gray-500 dark:group-hover:text-gray-300">
                                 
                                    <button title="Remove From History" onClick={(e) =>{e.stopPropagation(); removeSongFromHistory(song.videoId)}}>
                                        <FontAwesomeIcon  icon="fa-solid fa-x " />
                                    </button>
                                
                            </div>
                            
                           
                            <div className="text-gray-600 hidden hover:text-gray-400 group-hover:block dark:text-gray-500 dark:group-hover:text-gray-300">
                                <button 
                                onClick={(e) => {e.stopPropagation(); openDropdown(e, song)}}
                                
                                title="More Options">
                                    <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                                </button>
                                
                            </div>
                            

                        </div>
                            
                            
                    </div>
                
                ))}
            </div>
    )
}