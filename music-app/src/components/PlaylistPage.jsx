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

export default function PlaylistPage(){
     const { id } = useParams();
        
        const [currentAlbum, setCurrentAlbum] = useState(null);
    
        const { playSong} = usePlayer();
        const { playAlbum } = usePlayer();
        const {upscaleImage} = usePlayer();
        const { shuffle } = usePlayer();
        const  { addAlbumToLibrary } = usePlayer();
        const navigate = useNavigate();
        useEffect(() =>{    
        async function fetchAlbum() {
            
           
            const res = await axios.get(
                    `http://localhost:3001/api/music/albums/${id}`
                );
                
                setCurrentAlbum(res.data)
                
        }
        fetchAlbum();
        },[id]);
    
           if (!currentAlbum) return <div>Loading...</div>;
          
           
    
     
              
          
       
      
        
    
    
    
    
    return(
        <div>Playlist page 
            <div>
            {library.playlists.map((song) =>(
                                                
                    <div key={song.videoId} className="flex justify-center ">
                            
                            <figure className="grid p-2 justify-center m-auto w-56 rounded-lg hover:bg-gray-100 " onClick={() =>playSong(song,currentArtist.topSongs )}>
                            <img 
                            loading="lazy"
                            src={upscaleImage(song.thumbnail, 226)} alt=""
                            className="rounded-lg justify-center m-auto "
                            onError={(e) =>{e.target.onerror =null; e.target.src = albumPlaceHolder}} />
                            <span className="block wrap-normal text-left font-semibold h-6 line-clamp-2 mt-2">
                                {song.title}
                            </span>
                            
                        </figure>
                    
                    </div>
                ))
                }
            </div>
        </div>
    )
}