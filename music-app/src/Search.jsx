
import SearchPageResults from "./components/SearchPageResults";
import albumPlaceHolder from "./assets/albumPlaceHolder.png"

import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
    const [loading, setLoading] = useState(false)
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q")
    const filterParam = searchParams.get("filter")

    const navigate = useNavigate();

    useEffect(() => {
        if (query) {
            setSearch(query)
            setFilter(filterParam || "songs")
            searchMusic(query, filterParam || "songs");
        }
    }, [query, filterParam])

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
         e.preventDefault();
        if (!search.trim()) return;
       
        console.log(`Searching for: ${search} filter: ${filter}`)
        
        
       
        navigate(`/search?q=${search}&filter=${filter}`)
        setCurrentView("search")
        
        
    }
    async function searchMusic(query, filter){
        try{
            setLoading(true)
            const response = await axios.get(
            `http://localhost:3001/api/music/search?q=${query}&filter=${filter}`

        );

        setResults(response?.data?.results)
            
        }catch(error){
            console.error(error);
        } finally {
            setLoading(false);
        }
        
    }
    return(
        
        <div className="bg-gray-300 dark:bg-gray-900 dark:text-gray-200  min-h-screen pt-20 ">
            {/* search bar */}
            <div className="flex justify-around items-center ">
                <form onSubmit={handleSearch}className="relative">
                    <input type="text" placeholder="Search..." onChange={(e)=> setSearch(e.target.value)}
                    className="flex px-4 py-2 text-l border border-white  border rounded-full mt-10  focus:outline-none bg-gray-200 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"/>
                    <button 
                        onClick={handleSearch}
                        className="absolute right-2 top-11 rounded-full text-2xl  h-4 text-gray-700 hover:cursor-pointer hover:scale-105 hover:text-gray-900"> 
                        <FontAwesomeIcon 
                            className="text-gray-600 dark:text-gray-200"
                            icon="fa-solid fa-magnifying-glass" />
                    </button>
                    <select name="" id="selectInput"value={filter} 
                    onChange={(e)=> {const newFilter = e.target.value
                        setFilter(newFilter); if (search.trim()) {
            navigate(`/search?q=${search}&filter=${newFilter}`);
            }   
            }}
                    className=" focus:outline-none">
                        <option value="songs">Songs</option>
                        <option value="artists">Artist</option>
                        <option value ="albums">Album</option>
                    </select>         
                </form>
                
            </div>
            {loading ? ( 
                <div className=" h-screen flex flex-col items-center justify-center dark:bg-gray-900">
                    <div className=" h-12 w-12 animate-spin rounded-full border-4 border-gray-400 border-t-blue-600">
                    </div>

                    <p className="mt-4 text-gray-700 text-lg dark:text-gray-200">
                            Searching...
                        </p>

            </div>) : (
              <SearchPageResults 
                currentView={currentView}
                result={result}
                    filter={filter}
                    playSong={playSong}
                    getArtist={getArtist}
                    getAlbum={getAlbum}>
                    </SearchPageResults>
            )
            }
        </div>
        
    )
}

export default Search