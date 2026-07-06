
import SearchPageResults from "./components/SearchPageResults";
import albumPlaceHolder from "./assets/albumPlaceHolder.png"

import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "./context/PlayerContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'


library.add(fas, far, fab)
function Search({ getAlbum, streamUrl}){
    const [search,setSearch] = useState("")
    const [result,setResults] = useState([])
    const [filter,setFilter] = useState("songs")
    const [currentView, setCurrentView] = useState("search");
    const [currentAlbum, setCurrentAlbum] = useState(null)
    const [currentArtist, setCurrentArtist] = useState(null)
    const navigate = useNavigate();

    const { playSong } = usePlayer();

    async function getArtist(browseId){
          try{
              const response = await axios.get(
                  `http://localhost:3001/api/music/artists/${browseId}`
              )
              setCurrentArtist(response.data);
              navigate(`/artist/${browseId}`);
              console.log(response.data);
              console.log(currentArtist);
              console.log(currentView);
              
          }catch(error){
              console.error(error)
          }
      }
    
    async function getAlbum(browseId){
        
        try{
            const response = await axios.get(
            `http://localhost:3001/api/music/albums/${browseId}`

        ) 
            setCurrentAlbum(response.data);
            navigate(`/album/${browseId}`)
            console.log(response.data);
            console.log(currentAlbum);
            console.log(currentView);
        }catch(error){
            console.error(error)
        }
        
    }

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

    return(
        // navBar 
        <div className="bg-gray-300 min-h-screen ">
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
                        <option value="">All</option>
                        <option value="songs">Songs</option>
                        <option value="artists">Artist</option>
                        <option value ="albums">Album</option>
                    </select>         
                </form>
                
            </div>
              
              <SearchPageResults 
                currentView={currentView}
                result={result}
                    filter={filter}
                    playSong={playSong}
                    getArtist={getArtist}
                    getAlbum={getAlbum}>
                    </SearchPageResults>
                 
        </div>
        
    )
}

export default Search