import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

import { useParams } from "react-router-dom";

import axios from "axios";
import albumPlaceHolder from "../assets/albumPlaceHolder.png";
import { useEffect, useState } from "react"
import { usePlayer } from "../context/PlayerContext"
import { useNavigate } from "react-router-dom"
import Dropdown from "./Dropdown"
export default function ArtistPage({}){
    const { id } = useParams();

    const [currentArtist, setCurrentArtist] = useState(null);
   
    const {upscaleImage, playSong, addSongToLibrary, normalizeSong, openDropdown} = usePlayer();
    const navigate = useNavigate();
    useEffect(() => {
    async function fetchArtist() {
        const res = await axios.get(
                `http://localhost:3001/api/music/artists/${id}`
            );
            
            setCurrentArtist(res.data)
    }
    fetchArtist();
    
 },[id]);

     if (!currentArtist) return  <div className=" bg-gray-300 dark:bg-gray-900 h-screen flex flex-col items-center justify-center">
                <div className=" h-12 w-12 animate-spin rounded-full border-4 border-gray-400 border-t-blue-600">
                </div>

                <p className="mt-4 text-gray-700 dark:text-gray-200 text-lg">
                        Loading Artist...
                    </p>

            </div>;

    console.log(currentArtist)
   
    
    const addArtistInfo = (song) => 
        ({...song, artists: 
            {
            name: currentArtist?.artist?.name,
            browseId: currentArtist?.artist?.browseId}
        });

    const normalizedArtistSongs = currentArtist?.topSongs?.map((song) =>
        normalizeSong(addArtistInfo(song))
    );

    return(
        <div
        className="bg-gray-300 dark:bg-gray-900 min-h-screen pb-25 pt-25 ">
              
            {/* Artist page */}
                    { 
                    
                        <div className="text-gray-900 dark:text-gray-200">
                            <button 
                                onClick={() => {navigate(-1)}}
                                    className="ml-5 border rounded-full px-3 py-2 border-gray-200 
                                        bg-gray-300 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800/50 hover:scale-105">
                                    <FontAwesomeIcon className="text-gray-600 dark:text-gray-300"icon="fa-solid fa-angle-left" />
                                    </button>
                            <div className="flex m-5 gap-6">
                                <img
                                loading="lazy"
                                className="rounded-full border-gray-200 dark:border-gray-700 border m-auto w-150.5 h-150.5 object-cover"
                                src={upscaleImage(currentArtist?.artist?.thumbnail, 600)} alt=""
                                onError={(e) =>{e.target.onerror =null; e.target.src = albumPlaceHolder}} />

                                <div className="place-content-end ">
                                    <p className="capitalize text-gray-600 dark:text-gray-400">Artist</p>
                                    <strong className="text-6xl ">
                                        {currentArtist?.artist?.name}
                                    </strong>
                                    <p className="line-clamp-3 break-normal w-3/4 overflow-y-scroll ">
                                        {currentArtist?.artist?.description}
                                    </p>
                                </div>

                               
                            </div>
                            <strong className={`${!currentArtist?.topSongs.length ? "hidden" : "block"} text-3xl ml-5 text-left`}>
                                Top Songs
                            </strong>
                            <div className="overflow-visible">

                                <div className="flex px-4 py-2 gap-5 overflow-x-auto scrollbar-none ">
                                
                                {currentArtist?.topSongs?.map((song) =>{
                                   
                                    
                                   return(
                                    <div key={song?.videoId} className="flex justify-center w-56 h-70 ">
                                            
                                         <figure className="grid p-2 justify-center m-auto w-56 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 group" 
                                         onClick={() =>{playSong(normalizeSong(addArtistInfo(song)), normalizedArtistSongs)}}>
                                            <img 
                                            loading="lazy"
                                            src={upscaleImage(song?.thumbnail, 226)} alt=""
                                            className="rounded-lg justify-center m-auto w-52 h-52 object-cover"
                                            onError={(e) =>{e.target.onerror =null; e.target.src = albumPlaceHolder}} />
                                            <span className="block wrap-normal text-left font-semibold h-6 line-clamp-2 mt-2">
                                                {song.title}
                                            </span>
                                    <div className="flex gap-4 justify-end items-center ">
                                        <div >

                                            <button className="hidden text-gray-600  hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500 group-hover:block"
                                                onClick={(e) =>{e.stopPropagation(); addSongToLibrary(normalizeSong(addArtistInfo(song)))}}>
                                        
                                            <FontAwesomeIcon icon="fa-solid fa-plus " />
                                            </button>
                                        </div>
                                        <div className="">

                                            <button 
                                            className="text-gray-600 hidden hover:text-gray-400 group-hover:block dark:text-gray-300 dark:hover:text-gray-500"
                                            onClick={(e) =>{e.stopPropagation(); openDropdown(e, normalizeSong(addArtistInfo(song)))} }
                                            title="More Options">
                                                <FontAwesomeIcon icon="fa-solid fa-ellipsis " />
                                               

                                            </button>
                                          
                                        
                                         
                                    </div>
                                   
                                        </div>
                                       
                                        </figure>
                                         
                                    
                                    </div>
                                    
                                )})
                                }

                            </div>

                            </div>
                            
                            
                             <strong className={`${!currentArtist?.albums.length ? "hidden" : "block"} text-3xl ml-5 text-left`}>
                               Albums
                            </strong>
                             <div className="flex overflow-x-auto scrollbar-none gap-5 px-4 py-2" >
                                {currentArtist?.albums?.map((album) => (

                                    <div className=" flex justify-center w-56 h-74 "key={album?.browseId}>
                                        <figure 
                                            className="flex-shrink-0 grid p-2 justify-center m-auto w-56 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 "
                                            onClick={() =>  navigate(`/album/${album?.browseId}`)}>
                                            <img 
                                            loading="lazy"
                                            src={upscaleImage(album?.thumbnail, 226)} alt=""
                                            className="rounded-lg justify-center m-auto w-52 h-52 object-cover" 
                                            onError={(e) =>{e.target.onerror =null; e.target.src = albumPlaceHolder}}/>
                                            <h3 className="text-left font-semibold line-clamp-2 mt-2 h-6">
                                                {album?.title}
                                            </h3>
                                            <p className="text-left h-6 text-gray-700 dark:text-gray-300">
                                                {album?.year}
                                            </p>
                                           
                                        </figure>
                                   
                                    </div>
                                ))}
                             </div>
                               <strong className={`${!currentArtist?.singles.length ? "hidden" : "block"} text-3xl ml-5 text-left`}>
                               Singles
                            </strong>
                             <div className="flex overflow-x-scroll scrollbar-none gap-5 px-4 py-2" >
                                {currentArtist?.singles?.map((single) => (

                                    <div className=" flex justify-center w-56 h-74 "key={single?.browseId}>
                                        <figure 
                                            className="flex-shrink-0 grid p-2 justify-center m-auto w-56 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                                            onClick={() =>navigate(`/album/${single?.browseId}`)}>
                                            <img 
                                            loading="lazy"
                                            src={upscaleImage(single?.thumbnail, 226)} alt=""
                                            className="rounded-lg justify-center m-auto w-52 h-52 object-cover" 
                                            onError={(e) =>{e.target.onerror =null; e.target.src = albumPlaceHolder}}/>
                                            <h3 className="text-left font-semibold line-clamp-2 mt-2 h-6">
                                                {single?.title}
                                            </h3>
                                            <p className="text-left h-6 text-gray-700 dark:text-gray-300">
                                                {single?.year}
                                            </p>
                                           
                                        </figure>
                                   
                                    </div>
                                ))}
                             </div>
                             
                        </div>
                        
                    
                  
                    }
        </div>
    )
}