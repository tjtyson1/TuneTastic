import { Link, useNavigate } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";
import { useEffect } from "react";
export default function Navbar(){
    const {currentUser, setCurrentUser, library, setLibrary, currentAlbum, setCurrentAlbum, currentArtist ,setCurrentArtist, currentPlaylist ,setCurrentPlaylist, queue, setQueue, currentSong,setCurrentSong, streamUrl,setStreamUrl} = usePlayer()
    const navigate = useNavigate()

    function logOut(){
            localStorage.clear()

            setLibrary({
                likedSongs: [],
                likedAlbums: [],
                playlists: [],
                recentlyPlayed: []
                });
            setCurrentUser(null)
            setCurrentSong(null);
            setQueue([]);
            setCurrentAlbum(null);
            setCurrentArtist(null);
            setCurrentPlaylist([]);
            setStreamUrl(null);

             const audio = document.querySelector("audio");

    if(audio){
        audio.pause();
        audio.currentTime = 0;
    }
        }

       
        useEffect(() =>{
            console.log("hello")
        },[currentUser])
        if(!currentUser) return(
            <div className="bg-primary dark:bg-primary-dark w-full h-20 flex justify-center items-center text-gray-200">
                <h1 className="text-center text-4xl font-bold  ">TUNETASTIC</h1>                
            </div>
        )
    return(
        <div className="bg-gray-300 fixed w-full z-100 text-gray-200 ">
            <nav className=" sticky bg-primary dark:bg-primary-dark mb-0">
                <div className="h-20 flex justify-around items-center hidden:sm">
                    <div className="text-3xl font-bold px-4">TUNETASTIC</div>
                    <div className=" flex w-full justify-around items-center">
                        <Link to="/library" className="text-xl px-4 w-50 border rounded-full bg-secondary dark:bg-secondary-dark hover:bg-secondary-dark flex justify-center  items-center hover:scale-105 ">LIBRARY</Link>
                        <Link to="/playlist" className="text-xl px-4 w-45 border rounded-full flex items-center bg-secondary dark:bg-secondary-dark hover:bg-secondary-dark justify-center hover:scale-105">PLAYLIST</Link>
                        <Link to="/search" className="text-xl px-4 w-45 border rounded-full flex items-center justify-center bg-secondary dark:bg-secondary-dark hover:bg-secondary-dark hover:scale-105">SEARCH</Link>
                        {/* <Link to="#" className="text-xl px-4 border rounded-full flex items-center justify-center bg-secondary dark:bg-secondary-dark hover:bg-secondary-dark hover:scale-105">SETTINGS</Link> */}
                        <Link to="/register" className={`${currentUser ? "hidden" : "block"} text-xl text-center px-4 w-45 border rounded-full flex items-center justify-center bg-secondary dark:bg-secondary-dark hover:bg-secondary-dark hover:scale-105`}>LOG IN/SIGN UP</Link>
                        <Link to="/"
                        onClick={()=>{logOut()}}
                        className={`${!currentUser ? "hidden" : "block"} text-xl text-center px-4 w-45 border rounded-full flex items-center justify-center bg-secondary dark:bg-secondary-dark hover:bg-secondary-dark hover:scale-105`}>LOG OUT</Link>
                    </div>
                    
                </div>
                </nav> 
        </div>
        
    )
    
}