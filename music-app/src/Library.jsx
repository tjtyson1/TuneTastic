import React, {useState, useEffect} from 'react'
import axios from 'axios';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { usePlayer } from './context/PlayerContext';
import Songlist from './components/SongList';
import Notification from './components/Notification';
import { useNavigate } from 'react-router-dom';
function Library(){
    const {library, loadLibrary, removeSongFromLibrary, playSong, upscaleImage, removeAlbumFromLibrary, queue, setShowNotification, currentUser} = usePlayer()
    const [songs, setSongs] = useState([]);
    const navigate = useNavigate() 
    
   
    console.log("queue: ", queue)
    useEffect(() => {
        loadLibrary();
    }, []);

    
    useEffect(() => {
        console.log(library)
    },[library])
    //for(let i =0; i<songs.length; i++){updateSongs}
    

    function handleRemoveSong(index){
        setSongs(songs.filter((_,i) => i !==index))
 
    }
     
    return(
        
        <div className='bg-gray-300 dark:bg-gray-900 text-gray-900 dark:text-gray-200 min-h-screen pb-5 pt-20 '>
            <h1 className="flex text-3xl justify-center p-10 font-bold text-gray-900 dark:text-gray-200">Library</h1>
            
            <div className='pb-5 flex justify-center'>
                    <strong className={`text-2xl ml-5 text-center  `}>
                    Liked Albums
                </strong>
                </div>
            <div className="pb-5 grid grid-cols-[repeat(auto-fit,minmax(224px,1fr))] gap-4">
                {library.likedAlbums.map((album) => (
                    <div className=' flex w-56 h-50   '
                    onClick={()=> {navigate(`/album/${album.browseId}`)}}
                    key={album?.browseId}>
                        <div className='grid  justify-center flex pb-2  w-56 rounded-lg  group hover:bg-gray-200 dark:hover:bg-gray-800'>
                           
                       <img 
                       className=" rounded-xl w-30 h-30"
                       src={upscaleImage(album?.thumbnail, 120)} alt="" />
                        <h1 className='align-center w-30 line-clamp-2'>
                            {album?.title}
                            
                        </h1>
                        <h1 className='text-gray-500 dark:text-gray-400 hover:underline'
                            onClick={(e) => {e.stopPropagation(); navigate(`/artist/${album?.artists[0].browseId}`)}}>
                            {album?.artists[0]?.name}
                        </h1>
                        <div className=" justify-self-end text-gray-600 hidden hover:text-gray-400 
                            dark:text-gray-300 dark:hover-text-gray-500 group-hover:block">
                            <button title="Remove from library" onClick={(e) =>{e.stopPropagation();removeAlbumFromLibrary(album.browseId)}}>
                                <FontAwesomeIcon  icon="fa-solid fa-x " />
                            </button>
                        
                        </div>
                        </div>
                        
                    </div>
                ))}
            </div>
                <div className='pb-5 flex justify-center'>
                    <strong className={`text-2xl ml-5 text-center  `}>
                    Liked Songs
                </strong>
                </div>
            <Songlist
            playSong={playSong}
            removeSong={removeSongFromLibrary}
            list={library.likedSongs}
            
            />

            
            

        </div>
   

    )
}
export default Library