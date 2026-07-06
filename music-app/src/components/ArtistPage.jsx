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
export default function ArtistPage({}){
    const { id } = useParams();

    const [currentArtist, setCurrentArtist] = useState(null);
    const { playSong } = usePlayer();
    const {upscaleImage} = usePlayer();
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

     if (!currentArtist) return <div>Loading...</div>;

    console.log(currentArtist)
   
    

    return(
        <div
        className="bg-gray-300 min-h-screen ">
              <nav className="bg-primary text-white ">
                <div className="h-16 flex justify-around items-center sm:overflow-hidden ">
                    <div className="text-3xl font-bold px-4">LOGO</div>
                    <div className=" flex w-full justify-around items-center">
                        <a href="/library" className="text-xl px-4  border rounded-full bg-secondary hover:bg-yellow-600 flex items-center hover:scale-105 ">LIBRARY</a>
                        <a href="#" className="text-xl px-4 border rounded-full flex items-center bg-secondary-dark hover:bg-yellow-600 hover:scale-105">PLAYLIST</a>
                        <a href="/search" className="text-xl px-4 border rounded-full flex items-center bg-yellow-500 hover:bg-yellow-600 hover:scale-105">SEARCH</a>
                        <a href="#" className="text-xl px-4 border rounded-full flex items-center bg-yellow-300 hover:bg-yellow-600 hover:scale-105">SETTINGS</a>
                        <a href="#" className="text-xl px-4 border rounded-full flex items-center bg-yellow-300 hover:bg-yellow-600 hover:scale-105">LOG IN/SIGN UP</a>
                    </div>
                </div>
            </nav>
            {/* Artist page */}
                    { 
                    
                        <div className="mb-86">
                            <button 
                                onClick={() => {navigate(-1)}}
                                    className="ml-5 border rounded-full px-3 py-2 border-white bg-gray-300 hover:bg-gray-200 hover:scale-105">
                                    <FontAwesomeIcon className="text-gray-600"icon="fa-solid fa-angle-left" />
                                    </button>
                            <div className="flex m-5 gap-6">
                                <img
                                loading="lazy"
                                className="rounded-full border-white border m-auto"
                                src={upscaleImage(currentArtist?.artist?.thumbnail, 600)} alt=""
                                onError={(e) =>{e.target.onerror =null; e.target.src = albumPlaceHolder}} />

                                <div className="place-content-end">
                                    <p className="capitalize ">Artist</p>
                                    <strong className="text-6xl">
                                        {currentArtist.artist.name}
                                    </strong>
                                    <p className="line-clamp-3">
                                        {currentArtist.artist.description}
                                    </p>
                                </div>

                               
                            </div>
                            <strong className="text-3xl ml-5 text-left">
                                Top Songs
                            </strong>
                            <div className="flex px-4 py-2 gap-5 overflow-x-auto scrollbar-none">
                                
                                {currentArtist.topSongs.map((song) =>(
                                    
                                    <div key={song.videoId} className="flex justify-center ">
                                            
                                         <figure className="grid p-2 justify-center m-auto w-56 rounded-lg hover:bg-gray-100 " onClick={() =>playSong(song,currentArtist.topSongs )}>
                                            <img 
                                            loading="lazy"
                                            src={upscaleImage(song.thumbnail, 226)} alt=""
                                            className="rounded-lg justify-center m-auto "
                                            onError={(e) =>{e.target.onerror =null; e.target.src = albumPlaceHolder}} />
                                            <span className="block wrap-normal text-left font-semibold h-6 line-clamp-2 mt-2">
                                                {song.title}
                                            </span>
                                           
                                        </figure>
                                   
                                    </div>
                                ))
                                }
                            </div>
                             <strong className="px-4 text-left text-3xl">
                               Albums
                            </strong>
                             <div className="flex overflow-x-auto scrollbar-none gap-5 px-4 py-2" >
                                {currentArtist.albums.map((album) => (

                                    <div className=" flex justify-center "key={album.browseId}>
                                        <figure 
                                            className="flex-shrink-0 grid p-2 justify-center m-auto w-56 rounded-lg hover:bg-gray-100 "
                                            onClick={() =>  navigate(`/album/${album.browseId}`)}>
                                            <img 
                                            loading="lazy"
                                            src={upscaleImage(album.thumbnail, 226)} alt=""
                                            className="rounded-lg justify-center m-auto  w-full aspect-square object-cover " 
                                            onError={(e) =>{e.target.onerror =null; e.target.src = albumPlaceHolder}}/>
                                            <h3 className="text-left font-semibold line-clamp-2 mt-2 h-6">
                                                {album.title}
                                            </h3>
                                            <p className="text-left h-6">
                                                {album.year}
                                            </p>
                                           
                                        </figure>
                                   
                                    </div>
                                ))}
                             </div>
                               <strong className="px-4 text-left text-3xl">
                               Singles
                            </strong>
                             <div className="flex overflow-x-auto scrollbar-none gap-5 px-4 py-2" >
                                {currentArtist.singles.map((single) => (

                                    <div className=" flex justify-center "key={single.browseId}>
                                        <figure 
                                            className="flex-shrink-0 grid p-2 justify-center m-auto w-56 rounded-lg hover:bg-gray-100"
                                            onClick={() =>getAlbum(single.browseId)}>
                                            <img 
                                            loading="lazy"
                                            src={upscaleImage(single.thumbnail, 226)} alt=""
                                            className="rounded-lg justify-center m-auto  w-full aspect-square object-cover " 
                                            onError={(e) =>{e.target.onerror =null; e.target.src = albumPlaceHolder}}/>
                                            <h3 className="text-left font-semibold line-clamp-2 mt-2 h-6">
                                                {single.title}
                                            </h3>
                                            <p className="text-left h-6">
                                                {single.year}
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