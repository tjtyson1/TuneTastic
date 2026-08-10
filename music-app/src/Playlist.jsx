import { usePlayer } from "./context/PlayerContext"
import axios from "axios"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect } from "react"
import ListCard from "./components/ListCard"
import albumPlaceHolder from "./assets/albumPlaceHolder.png"
import { useNavigate } from "react-router-dom"

export default function Playlist(){
    const {library, loadLibrary,addPlaylist, playlistName, setPlaylistName, removePlaylist} = usePlayer()
    const navigate = useNavigate()
    useEffect(() => {
            loadLibrary();
        }, []);

    return(
        <div className="bg-gray-300 dark:bg-gray-900 text-gray-900 dark:text-gray-200 h-screen pt-20 ">
           <h1 className="flex text-3xl justify-center p-10 font-bold text-gray-900 dark:text-gray-200">Playlists</h1>
            
            <div>
                <div className="flex justify-center px-4 py-2 gap-5 overflow-x-auto scrollbar-none  ">
                    
                </div>
                <div className=" flex flex-row flex-wrap flex-wrap gap-5">
                    <div className="grid p-2 justify-center m-0 w-56 h-54 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800">
                        
                        <button className=" bg-gray-300 rounded-lg w-30 h-30 justify-self-center mb-4">
                        <FontAwesomeIcon  className="text-6xl text-white "icon="fa-solid fa-circle-plus" />
                        </button>
                        <input 
                            type="text" 
                            placeholder="New Playlist"
                            className="border px-2 rounded h-6 text-gray-800 dark:text-gray-300 font-semibold text-center"  onChange={(e) => setPlaylistName(e.target.value) }/>
                        <button type="submit" className=" border-white text-gray-200 font-semibold py-2 rounded bg-green-600  mt-1 "onClick={() => addPlaylist(playlistName)}> Add Playlist </button>
                        </div>
                    
                     {library.playlists.toReversed().map( (playlist)=> 
            <div 
                className="flex justify-start"   
                key={playlist._id}>
                   <div className=" hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg ">
                        <ListCard
                        name={playlist.name}
                        imgSrc={albumPlaceHolder}
                        function1={() => navigate(`/playlist/${playlist._id}`)}/>
                        <div className="flex justify-end m-2 mt-0 "> 
                             <button 
                                className=" px-4 py-2 rounded-full border-white  bg-red-600 " 
                                onClick={() => {if(window.confirm("Are you sure you want to delete this playlist?")){removePlaylist(playlist._id)}}}> 
                                <FontAwesomeIcon 
                                    icon="fa-solid fa-x "
                                    className="text-xs  text-gray-200 w-1 h-1"/>
                            </button>
                        </div>
                        

                        
                        
                   </div>
                   
            </div>
            )}
            </div>
                </div>
                
           
        </div>
    )
}