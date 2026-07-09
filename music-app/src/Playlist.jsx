import { usePlayer } from "./context/PlayerContext"
import axios from "axios"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect } from "react"
import ListCard from "./components/ListCard"
import albumPlaceHolder from "./assets/albumPlaceHolder.png"

export default function Playlist(){
    const {library, loadLibrary,addPlaylist, playlistName, setPlaylistName, removePlaylist} = usePlayer()

    useEffect(() => {
            loadLibrary();
        }, []);

    return(
        <div className="bg-gray-200 h-screen ">
            Playlist
            <div>
                <div className="flex justify-center px-4 py-2 gap-5 overflow-x-auto scrollbar-none  ">
                    
                </div>
                <div className=" flex flex-row flex-wrap flex-wrap">
                    <div className="grid p-2 justify-center m-0 w-56 h-42 rounded-lg hover:bg-gray-100">
                        
                        <button className=" bg-gray-300 rounded-lg w-[120px] h-[120px] justify-self-center mb-4">
                        <FontAwesomeIcon  className="text-6xl text-white "icon="fa-solid fa-circle-plus" />
                        </button>
                        <input type="text" className="border px-2 rounded h-6 text-gray-800 font-semibold"  onChange={(e) => setPlaylistName(e.target.value) }/>
                        <button type="submit" className=" border-white text-white font-semibold py-2 rounded bg-green-600  mt-1 "onClick={() => addPlaylist(playlistName)}> Add Playlist </button>
                        </div>
                    
                     {library.playlists.toReversed().map( (playlist)=> 
            <div 
                className="flex flex justify-start"   
                key={playlist._id}>
                   <div>
                        <ListCard
                        name={playlist.name}
                        imgSrc={albumPlaceHolder}/>
                         <button className=" px-4 py-2 rounded-full border" 
                            onClick={() => {if(window.confirm("Are you sure you want to delete this playlist?")){removePlaylist(playlist._id)}}}> 
                            x
                         </button>

                        
                        
                   </div>
                   
            </div>
            )}
            </div>
                </div>
                
           
        </div>
    )
}