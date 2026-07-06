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
export default function AlbumPage({}){
     
    const { id } = useParams();
    
    const [currentAlbum, setCurrentAlbum] = useState(null);

    const { playSong} = usePlayer();
    const { playAlbum } = usePlayer();
    const {upscaleImage} = usePlayer();
    const { shuffle } = usePlayer();
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
        
        <div>
            {/* Album page */}
                {
                <div className="mb-[80px] mx-5 ">
                    <button onClick={() => {  navigate(-1)}}className="ml-5 border rounded-full px-3 py-2 border-white bg-gray-300 hover:bg-gray-200 hover:scale-105">
                    <FontAwesomeIcon className="text-gray-600"icon="fa-solid fa-angle-left" />
                    </button>
                    <div>
                        
                    </div>
                    <div className="flex m-5 gap-6">
                            
                                <img 
                                loading="lazy"
                                src={upscaleImage(currentAlbum?.album?.thumbnail,544)} 
                                className="rounded-lg"
                                alt="" 
                                onError={(e) =>{e.target.onerror =null; e.target.src = albumPlaceHolder}}/>
                            
                        
                            
                            <div className="place-content-end">

                            <p className="capitalize text-gray-600">Album</p>
                            <strong className="text-7xl ">
                                {currentAlbum?.album?.title}
                            </strong>
                            <p className="text-4xl text-primary active:text-primary/50 hover:cursor-pointer" onClick={() => navigate(`/artist/${currentAlbum?.artist?.browseId}`)}>
                                {currentAlbum?.artist?.name}
                            </p>
                    </div>
                        <div className="place-content-end gap-x-5 flex items-end">
                           <div>
                                <button className="   justify-center h-border border-gray-500 rounded-full text-3xl text-primary bg-gray-400 px-3 py-2 hover:bg-gray-600 "onClick={() =>playAlbum(currentAlbum,0)}>
                                <FontAwesomeIcon className="text-2xl  " icon="fa-solid fa-play" /> 
                                Play
                                </button>
                            </div> 
                            <div>
                                <button className=" justify-center h-border border-gray-500 rounded-full text-3xl text-primary bg-gray-400 px-3 py-2 hover:bg-gray-600 "onClick={() =>playAlbum(currentAlbum,0, true)}>
                                <FontAwesomeIcon className="text-2xl  " icon="fa-solid fa-shuffle" /> 
                                Shuffle
                                </button>

                            </div>
                         
                        </div>
                        
                    </div>
                    {currentAlbum?.tracks?.map((track,index) => (

                        <div key={track?.videoId} 
                        onClick={() => playAlbum(currentAlbum,index)} 
                        className="flex justify-between items-center p-4 border-t hover:bg-gray-200 cursor-pointer group"> 
                            <div className="flex gap-4 items-center">
                                <div 
                                    className="text-gray-600 group-hover:hidden">
                                        {track?.trackNumber}
                                    
                                </div>
                                <div className="hidden group-hover:block text-gray-600 ">
                                        <FontAwesomeIcon className="" icon="fa-solid fa-play" />
                                        </div>

                                <div className="">
                                    {track?.title}
                                    <p className="text-gray-600">{currentAlbum?.artist?.name}</p>
                            </div>
                            </div>
                            
                            <div className="flex gap-4 items-center">
                                <div className="text-gray-600 hidden hover:text-gray-400 group-hover:block">
                                        <button title="Add To Library">
                                            <FontAwesomeIcon  icon="fa-solid fa-plus " />
                                        </button>
                                    
                                </div>
                                
                                <p>{track?.duration}</p>
                                <div className="text-gray-600 hidden hover:text-gray-400 group-hover:block">
                                    <button title="More Options">
                                        <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                                    </button>
                                    
                                </div>
                                

                            </div>
                                
                                
                        </div>
                    
                    ))}
                    

                </div>
                
                }

</div>
    )
}