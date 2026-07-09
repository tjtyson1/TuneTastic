import React, {useState, useEffect} from 'react'
import axios from 'axios';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { usePlayer } from './context/PlayerContext';
import Songlist from './components/SongList';
function Library(){
    const {library, loadLibrary, removeSongFromLibrary, playSong, upscaleImage, removeAlbumFromLibrary, queue} = usePlayer()
    const [songs, setSongs] = useState([]);
    
    const currentUser = JSON.parse(localStorage.getItem("user"));
    console.log(currentUser)
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
        <div className='bg-gray-300 min-h-screen'>
            <div>Library</div>
            <div>
                {library.likedAlbums.map((album) => (
                    <div key={album.browseId}>
                        {album.title}
                       <img src={upscaleImage(album.thumbnail, 120)} alt="" />
                    </div>
                ))}
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