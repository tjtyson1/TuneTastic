import { useRef, useEffect, useState} from "react";
import { usePlayer } from "../context/PlayerContext"

export default function Dropdown({song}){
const {openMenu, setOpenMenu, library, addSongToPlaylist} = usePlayer()
const menuRef = useRef(null);
const [playlistHovered, setPlaylistHovered] = useState(false)
useEffect(() => {
    function handleClickOutside(event) {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setOpenMenu(null);
        }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, []);

return(
        openMenu === song.videoId && 
        <div 
        ref={menuRef}
        className="absolute right-0 mt-2 w-48 bg-gray-300 rounded-lg border-white border-1 ">
            <div></div>
           <div 
            onMouseEnter={()=> {setPlaylistHovered(true)}}
            onMouseLeave={() => {setPlaylistHovered(false);}}
            className="justify-center items-center">
                <div className=" relative block w-full text-left px-4 py-2 hover:bg-gray-100">
                    Add to Playlist
                { playlistHovered &&
                <div className="absolute left-full top-0 mt-2 w-48 h-60 bg-gray-400 rounded-lg overflow-y-scroll scrollbar-none">
                    {  library.playlists.map(playlist => (
            
                 <button
                key={playlist._id}
                className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                onClick={() => {
                    addSongToPlaylist(song, playlist._id);
                    setOpenMenu(null);
                }}
            >
                {playlist.name}
            </button>
                    ))}
            </div>
                }
           
       
                </div>
            
                <button className=" block w-full text-left px-4 py-2 hover:bg-gray-100">
                    Add to Queue

                </button>
           </div>
           
        </div>
    )
}