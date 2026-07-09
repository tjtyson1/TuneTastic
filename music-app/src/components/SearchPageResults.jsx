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
    const {addSongToLibrary, setShowDropdown, playSong, getArtist, getAlbum, setOpenMenu, openMenu} = usePlayer()
    if (currentView !== "search") return null;

// optional helper (move to utils later)
    const {upscaleImage} = usePlayer()




    return(
        <div className="bg-gray-300 min-h-screen">
            {/* all results */}
            { filter == " " &&
                <div>
                    All
                </div>
            }
                    {/* Song search*/}
                      { filter=="songs" &&
                          <div className=" grid xl:grid-cols-5 lg:grid-cols-3  md:grid-cols-2 px-4 py-2 gap-4 mb-[85px]"> 
                              {result.slice(0,20).map((song) => (
                                  <div key={song.videoId} onClick={() => {playSong(song, result)}} className=" flex p-4 justify-center overflow-hide rounded-lg  bg-gray-200 hover:bg-gray-100 active:bg-gray-300">  
                                  <div className=" flex-shrink-0 grid p-2 justify-center m-auto w-64 rounded-lg hover:bg-gray-100">
                                     <img loading="lazy" decoding="async" src={upscaleImage(song.thumbnails[0].url, 120)} alt="" className="m-auto justify-center rounded w-30 h-30 aspect-square object-cover" onError={(e) =>{e.target.onerror =null; e.target.src = albumPlaceHolder}}/>
                                      <h2 className=" text-left font-semibold line-clamp-3 mt-2 h-12 ">{song.title}</h2>
                                      <p className="text-left h-6">{song.artists.map(artist => artist.name).join(", ")}</p>
                                    <div className="flex justify-end relative ">
                                        <button onClick={(e) => {
                                            e.stopPropagation();
                                            addSongToLibrary(song);
                                            }}>
                                         <FontAwesomeIcon icon="fa-solid fa-plus" />
                                        
                                      </button>
                                        <button onClick={() => {setOpenMenu(openMenu === song.videoId ? null : song.videoId)}} 
                                            className="hover:gray-200 hover:cursor-pointer px-4 py-2"> 
                                                <FontAwesomeIcon icon="fa-solid fa-ellipsis" /></button>
                                                <Dropdown
                                                song={song}/>
                                    </div>
                                  </div>
                                     
                                      </div>
                              
                              
                              ))}  
          
                    
                          </div>           
                          }  
                    {/* Album Search */}
                        { filter=="albums" &&
                                        <div className=" grid grid-cols-4 gap-4"> 
                                        {result.slice(0,20).map((song) => (
                                            <div key={song.browseId} onClick={() => {getAlbum(song.browseId)}} className=" grid items-center text-center justify-center overflow-hide px-4 py-2 rounded-lg  bg-gray-200 hover:bg-gray-100 active:bg-gray-300">  
                                                <img loading="lazy" src={upscaleImage(song.thumbnails[0].url, 120)} alt="" className="m-auto rounded" onError={(e) =>{ e.target.onerror =null; e.target.src = albumPlaceHolder}}/>
                                                <h2 className=" text-l ">{song.title}</h2>
                                                <p className="text-m">{song.artists.map(artist => artist.name).join(", ")}</p>
                                                <button className=" bg-blue-300 px-4 py-2 rounded-full hover:scale-105 hover:cursor-pointer"> Go to Album </button>
                                                </div>
                                                
                                        
                                        ))}  
                    
                                
                                    </div>      
                                
                                        } 
                        
                        {/* Artist Search */}
                                          { filter=="artists" &&
                                            <div className=" grid grid-cols-4 gap-4"> 
                                            {result.slice(0,20).map((song) => (
                                                <div key={song.browseId} onClick={() => {getArtist(song.browseId)}} className=" grid items-center text-center justify-center overflow-hide px-4 py-2 rounded-lg  bg-gray-200 hover:bg-gray-100 active:bg-gray-300">  
                                                    <img loading="lazy" src={upscaleImage(song.thumbnails[0].url, 120)} alt="" className="m-auto rounded" onError={(e) =>{ e.target.onerror =null; e.target.src = albumPlaceHolder}}/>
                                                    <h2 className=" text-l ">{song.title}</h2>
                                                    <p className="text-m">{song.artists.map(artist => artist.name).join(", ")}</p>
                                                    <button className=" bg-blue-300 px-4 py-2 rounded-full hover:scale-105 hover:cursor-pointer"> View Artist </button>
                                                    </div>
                                            
                                                 
                                            
                                            ))} 
                                            </div> 
                                          }
        </div>
    )
}

