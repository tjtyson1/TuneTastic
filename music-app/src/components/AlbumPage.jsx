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
import Dropdown from "./Dropdown"
export default function AlbumPage({}){
     
    const { id } = useParams();
    
    const [currentAlbum, setCurrentAlbum] = useState(null);

    const  { addAlbumToLibrary, shuffle, upscaleImage, playAlbum, playSong, addSongToLibrary,  openDropdown} = usePlayer();
    console.log(currentAlbum)
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

       if (!currentAlbum) return <div className=" bg-gray-300 dark:bg-gray-900 h-screen flex flex-col items-center justify-center ">
                    <div className=" h-12 w-12 animate-spin rounded-full border-4 border-gray-400 border-t-blue-600">
                    </div>

                    <p className="mt-4 text-gray-700 dark:text-gray-200 text-lg">
                            Loading Album...
                        </p>

            </div>;
      
       

 
          
      
   
  
    
          
      
    return(
        console.log(currentAlbum),
        
        <div className=" bg-gray-300 dark:bg-gray-900 dark:text-gray-200 h-full w-full pb-25 pt-25">
            {/* Album page */}
                {
                        <div className="text-gray-900 dark:text-gray-200 mx-5">
                            <button 
                                onClick={() => {navigate(-1)}}
                                    className="ml-5 border rounded-full px-3 py-2 border-gray-200 
                                        bg-gray-300 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800/50 hover:scale-105">
                                    <FontAwesomeIcon className="text-gray-600 dark:text-gray-300"icon="fa-solid fa-angle-left" />
                                    </button>
                    <div className="flex m-5 gap-6">
                            
                                <img 
                                loading="lazy"
                                src={upscaleImage(currentAlbum?.album?.thumbnail,544)} 
                                className="rounded-lg border-gray-200 dark:border-gray-700 border w-150.5 h-150.5 object-cover"
                                alt="" 
                               />
                            
                        
                            
                            <div className="place-content-end">

                            <p className="capitalize text-gray-600 dark:text-gray-400">Album</p>
                            <strong className="text-7xl ">
                                {currentAlbum?.album?.title}
                            </strong>
                            <p className="text-4xl text-primary active:text-primary/50 hover:cursor-pointer" onClick={() => navigate(`/artist/${currentAlbum?.artist?.browseId}`)}>
                                {currentAlbum?.artist?.name}
                            </p>
                    </div>
                        <div className="place-content-end gap-x-5 flex items-end">
                           <div>
                                <button title="Play Album"
                                className="   justify-center h-border border-gray-500 rounded-full text-3xl text-primary bg-gray-400 dark:bg-gray-800 px-3 py-2 hover:bg-gray-600 "onClick={() =>playAlbum(currentAlbum,0)}>
                                <FontAwesomeIcon className="text-2xl text-gray-600  dark:text-gray-300 " icon="fa-solid fa-play" /> 
                                Play
                                </button>
                            </div> 
                            <div>
                                <button title="Shuffle Album"
                                className=" justify-center h-border border-gray-500 rounded-full text-3xl text-primary bg-gray-400 dark:bg-gray-800 px-3 py-2 hover:bg-gray-600 "onClick={() =>playAlbum(currentAlbum,0, true)}>
                                <FontAwesomeIcon className="text-2xl  text-gray-600  dark:text-gray-300 " icon="fa-solid fa-shuffle" /> 
                                Shuffle
                                </button>

                            </div>
                            <div>
                                <button title="Add to Library"
                                className="justify-center h-border border-gray-500 rounded-full text-3xl text-primary bg-gray-400 dark:bg-gray-800 px-3 py-2 hover:bg-gray-600 "
                                onClick={ (e) => {
                                            e.stopPropagation(); addAlbumToLibrary(currentAlbum)}}>
                                    <FontAwesomeIcon className="text-2xl  text-gray-600  dark:text-gray-300  " icon="fa-solid fa-plus" /> 
                                </button>
                            </div>
                         
                        </div>
                        
                    </div>
                    {currentAlbum?.tracks?.map((track,index) => (

                        <div key={track?.videoId} 
                        onClick={() => playAlbum(currentAlbum,index)} 
                        className="flex justify-between items-center p-4 border-t hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer group"> 
                            <div className="flex gap-4 items-center">
                                <div 
                                    className="text-gray-600 dark:text-gray-400 group-hover:hidden">
                                        {track?.trackNumber}
                                    
                                </div>
                                <div className="hidden group-hover:block text-gray-600 dark:text-gray-400 ">
                                        <FontAwesomeIcon className="" icon="fa-solid fa-play" />
                                        </div>

                                <div className="">
                                    {track?.title}
                                    <p className="text-gray-600 dark:text-gray-400 ">{currentAlbum?.artist?.name}</p>
                            </div>
                            </div>
                            
                            <div className="flex gap-4 items-center">
                                <div className=" text-gray-600  hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500 hidden group-hover:block">
                                        <button  onClick={(e) => {
                                            e.stopPropagation(); addSongToLibrary({...track, thumbnail: currentAlbum?.album?.thumbnail, artists: [currentAlbum?.artist]});} }
                                        
                                        title="Add To Library">
                                            <FontAwesomeIcon  icon="fa-solid fa-plus " />
                                        </button>
                                    
                                </div>
                                
                                <p>{track?.duration}</p>
                                <div className="  ">
                                    <button
                                        className=" text-gray-600 dark:text-gray-300 dark:hover:text-gray-500 hidden hover:text-gray-400 group-hover:block"
                                        onClick={(e) =>{e.stopPropagation(); openDropdown(e, {...track, thumbnail: currentAlbum?.album?.thumbnail, artists: [currentAlbum?.artist]} )} }
                                        title="More Options">
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