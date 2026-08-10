import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

import albumPlaceHolder from "../assets/albumPlaceHolder.png";
import axios from "axios";
import { useEffect, useState } from "react"
import { usePlayer } from "../context/PlayerContext"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";
import Songlist from "./SongList"

export default function PlaylistPage(){
     const { id } = useParams();
        
        const [currentPlaylist, setCurrentPlaylist] = useState(null)
    
        const { playSong, upscaleImage, shuffle, currentUser, removeSongFromPlaylist, library, } = usePlayer();
       
       
        const navigate = useNavigate();

         useEffect(() => {
        if (library?.playlists && id) {
            const playlist = library.playlists.find(
                p => p._id === id
            );

            if (playlist) {
                setCurrentPlaylist(playlist);
            }
        }
    }, [library, id]);

        useEffect(() =>{    
        async function fetchPlaylist() {
            
           
            const res = await axios.get(
                    `http://localhost:3001/api/library/playlist/${currentUser._id}/${id}`
                );
                
                setCurrentPlaylist(res.data)
                
        }
        fetchPlaylist();
        },[id]);
    
           if (!currentPlaylist) return <div>Loading...</div>;
          
           
    
    return(
        <div className="bg-gray-300 dark:bg-gray-900 text-gray-900 dark:text-gray-200 h-screen pt-24">
            <button 
                onClick={() => {navigate(-1)}}
                className="ml-5 border rounded-full px-3 py-2 border-white dark:border-gray-600 bg-gray-300 dark:bg-gray-800 hover:bg-gray-200 hover:bg-gray-600 hover:scale-105">
                <FontAwesomeIcon className="text-gray-600 dark:text-gray-300"icon="fa-solid fa-angle-left" />
            </button>
            <h1 className="flex text-3xl justify-center p-10 font-bold">{currentPlaylist.name} </h1>
           
            <div>
                {console.log(currentPlaylist)}
             <Songlist
                        playSong={playSong}
                        removeSong={(videoId) => removeSongFromPlaylist(currentPlaylist._id, videoId)}
                        list={currentPlaylist?.songs || []}
                        
                        />
            </div>
        </div>
    )
}