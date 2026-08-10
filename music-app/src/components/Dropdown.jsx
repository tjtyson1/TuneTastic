import { useRef, useEffect, useState, } from "react";
import { usePlayer } from "../context/PlayerContext"
import { createPortal} from "react-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Dropdown(){
const {openMenu, setOpenMenu, library, addSongToPlaylist, addSongToQueue, playlistName, setPlaylistName, addPlaylist} = usePlayer()
const menuRef = useRef(null);
const timerRef = useRef(null)


const [playlistHovered, setPlaylistHovered] = useState(false)

const song = openMenu?.song
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

    function handleMouseLeave(){
        console.log(playlistHovered)
         timerRef.current = setTimeout(() => {
            setPlaylistHovered(false);
        }, 500);
    }
     function handleBoxLeave(){
        console.log(playlistHovered)
         timerRef.current = setTimeout(() => {
            setOpenMenu(null)
        }, 500);
    }
    function handleMouseEnter(){
        setPlaylistHovered(true);
        clearTimeout(timerRef.current);
        

    }
  const subMenuWidth = 192;
    const rect = menuRef.current?.getBoundingClientRect()
  const openLeft = rect && rect.right + subMenuWidth > window.innerWidth;



if (!openMenu) return null
return(
        
        <div 
        ref={menuRef}
        style={{left: openMenu.x, top: openMenu.y,}}
        onClick={(e)=> e.stopPropagation()}
        onMouseLeave={() => { handleBoxLeave()}}
        className="text-gray-900 dark:text-gray-200 fixed mt-2 w-48 bg-gray-300 dark:bg-gray-900 rounded-lg border-gray-200 dark:border-gray-700 border-1 z-100" >
            <div></div>
           <div 
           
            className="justify-center items-center">
                <div 
                onMouseEnter={()=> {handleMouseEnter()}}
                onMouseLeave={() => {handleMouseLeave()}}
                onClick={(e)=> e.stopPropagation()}
                className=" relative block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                    Add to Playlist
                { playlistHovered && 
                <div 
                    style={{position: "fixed",
                        top: menuRef.current?.getBoundingClientRect().top, 
                        left: openLeft ?  rect?.left - subMenuWidth : rect?.right + 5}}
                className={`  mt-2 w-48 h-60 bg-gray-400 dark:bg-gray-800 rounded-lg overflow-y-scroll scrollbar-none `}>
                    <div className="flex h-10 justify-center px-2 py-4 rounded items-center gap-2">
                        <form onSubmit={(e) =>{e.preventDefault(); addPlaylist(playlistName)}}>
                        <input type="text" value={playlistName} className="flex  rounded w-24 text-center  focus:outline-none "  
                            onChange={(e) => setPlaylistName(e.target.value) }
                            
                            placeholder="New Playlist"/>
                            
                    </form>
                    <div className="flex w-1  ">
                        <FontAwesomeIcon icon="fa-solid fa-plus"/>
                    </div>
                    
                    </div>
                    
                    
                    {  library.playlists.toReversed().map(playlist => (
            
                 <button
                key={playlist._id}
                className="block w-full text-left px-4 py-2 hover:bg-gray-600 hover:bg-gray-700 "
                onClick={(e) => {
                    e.stopPropagation();
                    addSongToPlaylist(song, playlist._id, playlist.name);
                    setOpenMenu(null);
                }}
            >
                {playlist.name}
            </button>
                    ))}
            </div>
                }
           
       
                </div>
            
                <button className=" block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={(e)=>{e.stopPropagation(); addSongToQueue(song); setOpenMenu(null)}}>
                    Play Next 

                </button>
           </div>
           
        </div>
        )
}