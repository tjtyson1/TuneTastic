import { usePlayer } from "../context/PlayerContext";
import Songlist from "./SongList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { useEffect } from "react";
import QueueSongs from "./QueueSongs";
 function Queue(){
   const { queue, history, currentSong, playSong, currentIndex, isVisible, upscaleImage} = usePlayer()
   
    const upcoming = queue.slice(currentIndex + 1)
   
   console.log("queue")

   useEffect(() => {
    console.log("Queue updated:", queue);
    console.log(history)
}, [queue]);
    return(
    isVisible &&
        <div className=" fixed top-0 right-0 w-1/4  h-full bg-gray-600/80 justify-self-end overflow-y-auto snap-y mb-25">
           <div className="flex justify-center  align-items-center sticky">
                <strong className={`text-xl text-white ${!history  ? "hidden" : ""}`}> History </strong>
                 <QueueSongs 
            list={history}/>
           </div>
           <div className="flex justify-center align-items-center sticky">
            <strong className="text-xl text-white ">Up Next</strong>
            </div>
            <QueueSongs 
            list={upcoming}/>
            
        </div>

                                   
)
   }

export default Queue