import axios from "axios";
import { useEffect, useState, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)
function Search(){

    const [search,setSearch] = useState()
    const [result,setResults] = useState([])
    const [filter,setFilter] = useState("songs")
    const [stream, setStream] = useState(null)
    const audioRef =useRef(null)
    


    async function handleSearch(e){
        e.preventDefault();
        console.log(`Searching for: ${search} filter: ${filter}`)
        if (filter == undefined){
            filter = ""
        }
        const response = await axios.get(
                `http://localhost:3001/api/music/search?q=${search}&filter=${filter}`

        );
        
        setResults(response.data.results)
        console.log(results)
    }

    useEffect(() =>{
        if(!stream) return;

        async function handleStream(){
        
        console.log(`Streaming: ${stream}`)
        const response = await axios.get(
            `http://localhost:3001/api/music/stream?id=${stream}`
        );
        
        const url = response.data.streamingUrls[0].url
        console.log(url)
        
        if(audioRef.current){
            audioRef.current.src = url;
            audioRef.current.play();
        }

        } 
        handleStream();
    },[stream]);
 
    function upscaleImage(url) {
        return url.replace(/w\d+-h\d+/, "w480-h480");
    }
        
    


    return( 
        <div className="bg-gray-300 h-screen ">
              <nav className="bg-blue-500 text-white">
                <div className="h-16 flex justify-around items-center hidden:sm">
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
            
            <div className="flex justify-around items-center mt-5">
                <form onSubmit={handleSearch}className="relative">
                    <input type="text" placeholder="Search..." onChange={(e)=> setSearch(e.target.value)}className="flex px-4 py-2 text-l border border-white border-2 rounded-full focus:outline-none bg-gray-200"/>
                    <button onClick={handleSearch}className="absolute right-2 top-1 rounded-full text-2xl  h-4 text-gray-700 hover:cursor-pointer hover:scale-105 hover:text-gray-900"> <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></button>
                    <select name="" id="selectInput"value={filter} onChange={(e)=> setFilter(e.target.value)}className=" focus:outline-none">
                        <option value="">Filter</option>
                        <option value="songs">Songs</option>
                        <option value="artists">Artist</option>
                        <option value ="albums">Album</option>
                    </select>         
                </form>
                
            </div>
               {/* {console.log(result)} */}
            if(filter=="songs"){

                 result.map((song) => (
                        <ul key={song.videoId}>
                           <div className="flex justify-around">  
                            <img src={upscaleImage(song.thumbnails[0].url)} alt="" className="scale-25"/>
                            <h2 className="text-2xl">{song.title}</h2>
                            <p>{song.artist}</p>
                            <button className=" bg-blue-300 px-4 py-2 rounded-full hover:scale-105 hover:cursor-pointer" onClick={() =>setStream(song.videoId)}> Play Song </button>
                            </div>
                          
                        {}
                        </ul>
                    ))   
                    
                }
                  <audio ref={audioRef} controls />
        </div>
        
    )
}

export default Search