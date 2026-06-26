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
    const [queue, setQueue] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    
    const handleWheel = (e) => {
    e.currentTarget.scrollLeft += e.deltaY;
};

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
        setCurrentView("search")
        setResults(response.data.results)
        console.log(response)
    }




        async function playSong(song, songList = []){
        
            setCurrentSong(song);
            console.log(song)
            
            if (songList.length >0){
                setQueue(songList);
                setCurrentIndex(songList.findIndex(s => s.videoId ===song.videoId)
            )
            }
            
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

    async function getArtist(browseId){
        try{
            const response = await axios.get(
                `http://localhost:3001/api/music/artists/${browseId}`
            )
            setCurrentView("artist");
            setCurrentArtist(response.data);
            console.log(response.data);
            console.log(currentArtist);
            console.log(currentView);
            
        }catch(error){
            console.error(error)
        }
    }
 

    async function playAlbum(index = 0) {
        console.log(currentAlbum.tracks.length)
        if (!currentAlbum?.tracks?.length) return;

        const albumTracks = currentAlbum?.tracks?.map(track => ({...track, thumbnails: [{url: upscaleImage(currentAlbum?.album?.thumbnail,60)}] }))
        setQueue(albumTracks);
        setCurrentIndex(index);

        await playSong(albumTracks[index]);
    }
    function upscaleImage(url, size) {
        return url.replace(/w\d+-h\d+/, `w${size}-h${size}`);
    }
        

    function nextSong(){
        if (currentIndex < queue.length - 1){

            const next = queue[currentIndex + 1];

            setCurrentIndex(currentIndex + 1);

            playSong(next);
        }

    }

    function previousSong(){

         if (currentIndex > 0){

            const prev = queue[currentIndex - 1];

            setCurrentIndex(currentIndex - 1);

            playSong(prev);
        }
    }



    return(
        // navBar 
        <div className="bg-gray-300 min-h-screen ">
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
                        <div key={song.videoId} onClick={() => {playSong(song, result)}} className=" grid items-center text-center justify-around overflow-hide px-4 py-2 rounded-lg  bg-gray-200 hover:bg-gray-100 active:bg-gray-300">  
                            <img loading="lazy" decoding="async" src={upscaleImage(song.thumbnails[0].url, 120)} alt="" className="m-auto" onError={(e) =>{e.target.onerror =null; e.target.src = albumPlaceHolder}}/>
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
                            <img loading="lazy" src={upscaleImage(song.thumbnails[0].url, 120)} alt="" className="m-auto" onError={(e) =>{ e.target.onerror =null; e.target.src = albumPlaceHolder}}/>
                            <h2 className=" text-l ">{song.title}</h2>
                            <p className="text-m">{song.artists.map(artist => artist.name).join(", ")}</p>
                            <button className=" bg-blue-300 px-4 py-2 rounded-full hover:scale-105 hover:cursor-pointer"> Go to Album </button>
                            </div>
                         
                    
                    ))}  

          
                </div>      
            
                    } 
                    {/* Album page */}
                  { currentView == "album" && 
                    <div className="mb-[50px] ">
                        <button onClick={() => setCurrentView("search")}className="ml-5 border rounded-full px-3 py-2 border-white bg-gray-300 hover:bg-gray-200 hover:scale-105">
                        <FontAwesomeIcon className="text-gray-600"icon="fa-solid fa-angle-left" />
                        </button>
                        <div>
                            
                        </div>
                        <div className="flex m-5 gap-6">
                             
                                 <img 
                                    src={upscaleImage(currentAlbum?.album?.thumbnail,544)} 
                                    className="rounded-lg"
                                    alt="" />
                             
                            
                             
                             <div className="place-content-end">

                                <p className="capitalize text-gray-600">{currentView}</p>
                                <strong className="text-7xl ">
                                    {currentAlbum?.album?.title}
                                </strong>
                                <p className="text-4xl text-primary active:text-primary/50" onClick={() => getArtist(currentAlbum.artist.browseId)}>
                                    {currentAlbum?.artist?.name}
                                </p>
                        </div>
                            <div className="place-content-end">
                                
                             <button className=" justify-center h-border border-gray-500 rounded-full text-3xl text-primary bg-gray-400 px-3 py-2 hover:bg-gray-600 "onClick={() =>playAlbum(0)}>
                                <FontAwesomeIcon className="text-2xl  " icon="fa-solid fa-play" /> 
                                Play
                            </button>
                            </div>
                           
                        </div>
                        {currentAlbum?.tracks?.map((track,index) => (

                            <div key={track?.videoId} 
                            onClick={() => playAlbum(index)} 
                            className="flex justify-between items-center p-4 border-t hover:bg-gray-200 cursor-pointer group"> 
                                <div className="flex gap-4 items-center">
                                   <div 
                                        className="text-gray-600 group-hover:hidden">
                                            {track?.trackNumber}
                                       
                                    </div>
                                    <div className="hidden group-hover:block text-gray-600 ">
                                           <FontAwesomeIcon className="" icon="fa-solid fa-play" />
                                         </div>

                                    <div className="">
                                        {track?.title}
                                        <p className="text-gray-600">{currentAlbum?.artist?.name}</p>
                              </div>
                                </div>
                             
                                <div className="flex gap-4 items-center">
                                    <div className="text-gray-600 hidden hover:text-gray-400 group-hover:block">
                                         <button title="Add To Library">
                                             <FontAwesomeIcon  icon="fa-solid fa-plus " />
                                         </button>
                                        
                                    </div>
                                   
                                 <p>{track?.duration}</p>
                                    <div className="text-gray-600 hidden hover:text-gray-400 group-hover:block">
                                       <button title="More Options">
                                         <FontAwesomeIcon icon="fa-solid fa-ellipsis" />
                                       </button>
                                       
                                    </div>
                                 

                                </div>
                                    
                                   
                            </div>
                        
                        ))}
                        

                    </div>
                  
                  }

                  {/* Artist Search */}
                  { currentView == "search" && filter=="artists" &&
                    <div className=" grid grid-cols-4 gap-4"> 
                    {result.slice(0,20).map((song) => (
                        <div key={song.browseId} onClick={() => {getArtist(song.browseId)}} className=" grid items-center text-center justify-center overflow-hide px-4 py-2 rounded-lg  bg-gray-200 hover:bg-gray-100 active:bg-gray-300">  
                            <img loading="lazy" src={upscaleImage(song.thumbnails[0].url, 120)} alt="" className="m-auto" onError={(e) =>{ e.target.onerror =null; e.target.src = albumPlaceHolder}}/>
                            <h2 className=" text-l ">{song.title}</h2>
                            <p className="text-m">{song.artists.map(artist => artist.name).join(", ")}</p>
                            <button className=" bg-blue-300 px-4 py-2 rounded-full hover:scale-105 hover:cursor-pointer"> View Artist </button>
                            </div>
                    
                         
                    
                    ))} 
                    </div> 
                  }
                    
                    {/* Artist page */}
                    { currentView =="artist" &&
                        <div className="mb-86">
                            <button 
                                onClick={() => setCurrentView("search")}
                                    className="ml-5 border rounded-full px-3 py-2 border-white bg-gray-300 hover:bg-gray-200 hover:scale-105">
                                    <FontAwesomeIcon className="text-gray-600"icon="fa-solid fa-angle-left" />
                                    </button>
                            <div className="flex m-5 gap-6">
                                <img 
                                className="rounded-full border-white border m-auto"
                                src={upscaleImage(currentArtist?.artist?.thumbnail, 600)} alt="" />

                                <div className="place-content-end">
                                    <p className="capitalize ">{currentView}</p>
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
                            <div className="flex px-4 py-2 gap-5 overflow-x-auto">
                                
                                {currentArtist.topSongs.map((song) =>(
                                    
                                    <div key={song.videoId} className="flex justify-center ">
                                            
                                         <figure className="grid p-2 justify-center m-auto w-56 rounded-lg hover:bg-gray-100 " onClick={() =>playSong(song)}>
                                            <img src={upscaleImage(song.thumbnail, 226)} alt=""
                                            className="rounded-lg justify-center m-auto  " />
                                            <span className="block wrap-normal text-left font-semibold h-6 line-clamp-2 mt-2">
                                                {song.title}
                                            </span>
                                           
                                        </figure>
                                   
                                    </div>
                                ))}
                            </div>
                             <strong className="px-4 text-left text-3xl">
                               Albums
                            </strong>
                             <div className="flex overflow-x-auto scrollbar-none gap-5 px-4 py-2" onWheel={handleWheel}>
                                {currentArtist.albums.map((album) => (

                                    <div className=" flex justify-center "key={album.browseId}>
                                        <figure className="flex-shrink-0 grid p-2 justify-center m-auto w-56 rounded-lg hover:bg-gray-100 ">
                                            <img src={upscaleImage(album.thumbnail, 226)} alt=""
                                            className="rounded-lg justify-center m-auto  w-full aspect-square object-cover " />
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
                             
                        </div>
                        
                    
                  
                    }
                  

                     
                  
                <AudioPlayer 
                    streamUrl={streamUrl}
                    songTitle={currentSong?.title}
                    artists={currentSong?.artists}
                    songCover={currentSong?.thumbnails?.[0]?.url || albumPlaceHolder}
                    nextSong={nextSong}
                    previousSong={previousSong}
                    
                />
                 
        </div>
        
    )
}

export default Search