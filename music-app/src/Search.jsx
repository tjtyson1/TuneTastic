import AudioPlayer from "./components/AudioPlayer";
import albumPlaceHolder from "./assets/albumPlaceHolder.png"

import axios from "axios";
import { useEffect, useState, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)
function Search(){
    const [search,setSearch] = useState("")
    const [result,setResults] = useState([])
    const [filter,setFilter] = useState("songs")
    const [streamUrl, setStreamUrl] = useState(null)
    const [currentView, setCurrentView] = useState("search");
    const [currentSong, setCurrentSong] = useState(null)
    const [currentAlbum, setCurrentAlbum] = useState(null)
    const [currentArtist, setCurrentArtist] = useState(null)

    
    async function handleSearch(e){
        if (!search.trim()) return;
        e.preventDefault();
        console.log(`Searching for: ${search} filter: ${filter}`)
        if (filter == undefined){
            filter = ""
        }
        const response = await axios.get(
                `http://localhost:3001/api/music/search?q=${search}&filter=${filter}`

        );
        
        setResults(response.data.results)
        console.log(response)
    }




        async function playSong(song){
        
            setCurrentSong(song);
            console.log(song)

            
        try{
            const response = await axios.get(
                `http://localhost:3001/api/music/stream?id=${song.videoId}`
            ); 
     
            console.log(response)
            const urls = response.data.streamingUrls

            if (!urls || urls.length ===0 ){
               throw new Error("No stream available");
                
                return;
            }
        
       
        console.log(urls[0].url)
        

        setStreamUrl(urls[0].url);
        } catch (error){

            console.error("Unable to load stream", error);

            alert("Unable to find song, try again.")
        }
        

        

        } 
       

    async function getAlbum(browseId){
        
        try{
            const response = await axios.get(
            `http://localhost:3001/api/music/albums/${browseId}`

        ) 
            setCurrentAlbum(response.data);
            setCurrentView("album");
            console.log(response.data);
            console.log(currentAlbum);
            console.log(currentView);
        }catch(error){
            console.error(error)
        }
        
    }
 
    function upscaleImage(url, size) {
        return url.replace(/w\d+-h\d+/, `w${size}-h${size}`);
    }
        
    


    return(
        // navBar 
        <div className="bg-gray-300 h-1vh ">
              <nav className="bg-blue-500 text-white ">
                <div className="h-16 flex justify-around items-center sm:overflow-hidden ">
                    <div className="text-3xl font-bold px-4">LOGO</div>
                    <div className=" flex w-full justify-around items-center">
                        <a href="/library" className="text-xl px-4  border rounded-full bg-yellow-300 hover:bg-yellow-600 flex items-center hover:scale-105 ">LIBRARY</a>
                        <a href="#" className="text-xl px-4 border rounded-full flex items-center bg-yellow-300 hover:bg-yellow-600 hover:scale-105">PLAYLIST</a>
                        <a href="/search" className="text-xl px-4 border rounded-full flex items-center bg-yellow-500 hover:bg-yellow-600 hover:scale-105">SEARCH</a>
                        <a href="#" className="text-xl px-4 border rounded-full flex items-center bg-yellow-300 hover:bg-yellow-600 hover:scale-105">SETTINGS</a>
                        <a href="#" className="text-xl px-4 border rounded-full flex items-center bg-yellow-300 hover:bg-yellow-600 hover:scale-105">LOG IN/SIGN UP</a>
                    </div>
                </div>
            </nav>
            {/* search bar */}
            <div className="flex justify-around items-center mt-5">
                <form onSubmit={handleSearch}className="relative">
                    <input type="text" placeholder="Search..." onChange={(e)=> setSearch(e.target.value)}className="flex px-4 py-2 text-l border border-white border rounded-full focus:outline-none bg-gray-200"/>
                    <button 
                        onClick={handleSearch}
                        className="absolute right-2 top-1 rounded-full text-2xl  h-4 text-gray-700 hover:cursor-pointer hover:scale-105 hover:text-gray-900"> 
                        <FontAwesomeIcon 
                            className="text-gray-600"
                            icon="fa-solid fa-magnifying-glass" />
                    </button>
                    <select name="" id="selectInput"value={filter} onChange={(e)=> setFilter(e.target.value)}className=" focus:outline-none">
                        <option value="songs">Songs</option>
                        <option value="artists">Artist</option>
                        <option value ="albums">Album</option>
                    </select>         
                </form>
                
            </div>
               {/* Song search results */}
            { currentView == "search" && filter=="songs" &&
                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-[85px]"> 
                    {result.slice(0,20).map((song) => (
                        <div key={song.videoId} onClick={() => {playSong(song)}} className=" grid items-center text-center justify-around overflow-hide px-4 py-2 rounded-lg  bg-gray-200 hover:bg-gray-100 active:bg-gray-300">  
                            <img loading="lazy" decoding="async" src={upscaleImage(song.thumbnails[0].url, 120)} alt="" className="" onError={(e) =>{e.target.onerror =null; e.target.src = albumPlaceHolder}}/>
                            <h2 className=" text-l ">{song.title}</h2>
                            <p className="text-m">{song.artists.map(artist => artist.name).join(", ")}</p>
                            <button className=" bg-blue-300 px-4 py-2 rounded-full hover:scale-105 hover:cursor-pointer" onClick={() => {playSong(song)}}> Play Song </button>
                            </div>
                    
                    
                    ))}  

          
                </div>           
                }
                    {/* Album search results */}
                  { currentView == "search" && filter=="albums" &&
                    <div className=" grid grid-cols-4 gap-4"> 
                    {result.slice(0,20).map((song) => (
                        <div key={song.browseId} onClick={() => {getAlbum(song.browseId)}} className=" grid items-center text-center justify-center overflow-hide px-4 py-2 rounded-lg  bg-gray-200 hover:bg-gray-100 active:bg-gray-300">  
                            <img loading="lazy" src={upscaleImage(song.thumbnails[0].url, 120)} alt="" className="" onError={(e) =>{ e.target.onerror =null; e.target.src = albumPlaceHolder}}/>
                            <h2 className=" text-l ">{song.title}</h2>
                            <p className="text-m">{song.artists.map(artist => artist.name).join(", ")}</p>
                            <button className=" bg-blue-300 px-4 py-2 rounded-full hover:scale-105 hover:cursor-pointer"> Play Album </button>
                            </div>
                         
                    
                    ))}  

          
                </div>      
            
                    } 
                    {/* Album page */}
                  { currentView == "album" && 
                    <div className="mb-[84px] ">
                        <button onClick={() => setCurrentView("search")}className="ml-5 border rounded-full px-3 py-2 border-white bg-gray-300 hover:bg-gray-200 hover:scale-105">
                        <FontAwesomeIcon className="text-gray-600"icon="fa-solid fa-angle-left" />
                        </button>
                        <div>
                            
                        </div>
                        <div className="flex m-5">
                             <img 
                             src={upscaleImage(currentAlbum?.album?.thumbnail,544)} 
                             className="rounded"
                             alt="" />
                             
                             <div className="">
                            <strong className="text-3xl ">
                                {currentAlbum?.album?.title}
                            </strong>
                            <p>
                                {currentAlbum?.artist?.name}
                            </p>
                        </div>
                        
                        </div>
                        {currentAlbum?.tracks?.map(track => (

                            <div key={track?.videoId} 
                            onClick={() => playSong({...track, thumbnails: [{url: upscaleImage(currentAlbum?.album?.thumbnail,60)}]})} 
                            className="flex justify-between p-4 border-t hover:bg-gray-200 cursor-pointer"> 
                                <div>
                                    <p>{track?.trackNumber}</p>
                                    <h2>{track?.title}</h2>
                                    <p>{track?.artist?.name}</p>
                                    <p>{track?.duration}</p>
                                </div>
                             
                            </div>
                        
                        ))}
                        

                    </div>
                  
                  }
                <AudioPlayer 
                    streamUrl={streamUrl}
                    songTitle={currentSong?.title}
                    artists={currentSong?.artists}
                    songCover={currentSong?.thumbnails[0]?.url}
                />
                 
        </div>
        
    )
}

export default Search