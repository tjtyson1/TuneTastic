import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import albumPlaceHolder from "../assets/albumPlaceHolder.png";
import Search from "../Search";
import { usePlayer } from "../context/PlayerContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import Dropdown from "./Dropdown";
export default function SearchPageResults({currentView, result = [], filter,}){
    
    const { id } = useParams();
    const {addSongToLibrary, setShowDropdown, playSong, openDropdown, normalizeSong , addAlbumToLibrary} = usePlayer()
    if (currentView !== "search") return null;


    const {upscaleImage} = usePlayer()
    const navigate = useNavigate()


    console.log(result)
    return(
        <div className="bg-gray-300 min-h-screen dark:bg-gray-900">
            {/* all results */}
            { filter == " " &&
                <div>
                    All
                </div>
            }
                    {/* Song search*/}
                      { filter=="songs" &&
                          <div className=" grid xl:grid-cols-5 lg:grid-cols-3  md:grid-cols-2 px-4 py-2 gap-4 pb-24 "> 
                              {result.slice(0,20).map((song) => (
                                  <div 
                                    key={song.videoId} onClick={() => {playSong(normalizeSong(song), result)}} 
                                    className="w-66 h-64 flex p-4 justify-center overflow-hide rounded-lg dark:bg-gray-700 bg-gray-200 
                                        dark:hover:bg-gray-600 hover:bg-gray-100 active:bg-gray-100/50 dark:active:bg-gray-800/50  ">  

                                  <div className=" flex-shrink-0 grid  justify-center m-auto w-64 rounded-lg ">
                                     <img loading="lazy" decoding="async" src={upscaleImage(song.thumbnails[0].url, 120)} alt="" className="m-auto justify-center rounded w-30 h-30 aspect-square object-cover" onError={(e) =>{e.target.onerror =null; e.target.src = albumPlaceHolder}}/>
                                      
                                      <h2 className=" text-left font-semibold line-clamp-2 mt-2 w-30 text-l text-gray-800 dark:text-gray-200">{song.title}</h2>

                                      <p className="text-left h-6 text-gray-600 hover:underline text-l truncate  dark:text-gray-200 dark:text-gray-400 "
                                        onClick={(e) => {navigate(song?.artists?.[0].id? `/artist/${song?.artists?.[0].id}` : `search?q=${song?.artists?.[0].name}&filter=artists`)}}>
                                        {song.artists.map(artist => artist.name).join(", ")}</p>
                                    <div className="flex justify-end  p-2 w-30 h-10 ">
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addSongToLibrary(song);
                                                }}
                                                className="text-gray-700 dark:text-gray-300 hover:text-gray-400 hover:text-gray-500 hover:cursor-pointer ">
                                            
                                         <FontAwesomeIcon icon="fa-solid fa-plus" />
                                        
                                      </button>
                                        <button onClick={(e) => {
                                             e.stopPropagation();
                                            openDropdown(e, song)}} 
                                            className="text-gray-700 dark:text-gray-300 hover:text-gray-400 hover:text-gray-500 hover:cursor-pointer"> 
                                                <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                                                </button>
                                               
                                    </div>
                                  </div>
                                     
                                      </div>
                              
                              
                              ))}  
          
                    
                          </div>           
                          }  
                    {/* Album Search */}
                        { filter=="albums" &&
                                        <div className="grid xl:grid-cols-5 lg:grid-cols-3  md:grid-cols-2 px-4 py-2 gap-4 pb-24 "> 
                                        {result.slice(0,20).map((song) => (
                                            <div key={song.browseId} onClick={() => {navigate(`/album/${song.browseId}`)}}
                                             className="w-66 h-64 flex p-4 justify-center overflow-hide rounded-lg dark:bg-gray-700 bg-gray-200 
                                        dark:hover:bg-gray-600 hover:bg-gray-100 active:bg-gray-100/50 dark:active:bg-gray-800/50  ">  
                                                <div className="flex-shrink-0 grid  justify-center m-auto w-64 rounded-lg ">
                                                    <img loading="lazy" src={upscaleImage(song.thumbnails[0].url, 120)} alt="" className="m-auto rounded" onError={(e) =>{ e.target.onerror =null; e.target.src = albumPlaceHolder}}/>
                                                <h2 className="text-left font-semibold line-clamp-2 mt-2 w-30 text-l text-gray-800 dark:text-gray-200  ">{song.title}</h2>
                                                <p className="text-left h-6 text-gray-600 hover:underline text-l  dark:text-gray-200 dark:text-gray-400 ">{song.artists.map(artist => artist.name).join(", ")}</p>
                                                 <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addAlbumToLibrary(song);
                                                }}
                                                className="text-gray-700 dark:text-gray-300 hover:text-gray-400 hover:text-gray-500 hover:cursor-pointer flex justify-end">
                                            
                                         <FontAwesomeIcon icon="fa-solid fa-plus" />
                                        
                                      </button>
                                                </div>
                                                

                                                </div>
                                                
                                                
                                        
                                        ))}  
                    
                                
                                    </div>      
                                
                                        } 
                        
                        {/* Artist Search */}
                                          { filter=="artists" &&
                                            <div className="grid xl:grid-cols-5 lg:grid-cols-3  md:grid-cols-2 px-4 py-2 gap-4 pb-24 "> 
                                            {result.slice(0,20).map((song) => (
                                                <div key={song.browseId} 
                                                    onClick={() => {navigate(`/artist/${song.browseId}`)}} 
                                                    className="w-66 h-64 flex p-4 justify-center overflow-hide rounded-lg dark:bg-gray-700 bg-gray-200 
                                                    dark:hover:bg-gray-600 hover:bg-gray-100 active:bg-gray-100/50 dark:active:bg-gray-800/50">  
                                                    <div className="flex-shrink-0 grid  justify-center m-auto w-64 rounded-lg ">
                                                        <img loading="lazy" src={upscaleImage(song.thumbnails[0].url, 120)} alt="" className="m-auto rounded" onError={(e) =>{ e.target.onerror =null; e.target.src = albumPlaceHolder}}/>
                                                    <h2 className=" text-left font-semibold line-clamp-2 mt-2 w-30 text-l text-gray-800 dark:text-gray-200">{song.title}</h2>

                                                    </div>
                                                    

                                                    </div>
                                            
                                                 
                                            
                                            ))} 
                                            </div> 
                                          }
        </div>
    )
}

