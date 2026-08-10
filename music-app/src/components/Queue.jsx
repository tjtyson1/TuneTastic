import { usePlayer } from "../context/PlayerContext";
import Songlist from "./SongList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { useEffect, useRef } from "react";
import QueueSongs from "./QueueSongs";
import HistorySongs from "./HistorySongs.jsx";
 function Queue(){
   const { queue, setQueue, history, setHistory, currentSong, playSong, currentIndex, isVisible, upscaleImage} = usePlayer()
   
    const upcoming = queue.slice(currentIndex + 1)
   
     const queueRef = useRef(null);
     const upNextRef = useRef(null)

   console.log("queue")

       useEffect(() => {
        if(queueRef.current){
            queueRef.current.scrollTop = queueRef.current.scrollHeight;
        }
    }, [isVisible]);
    useEffect(() => {
    if(isVisible && upNextRef.current){
        upNextRef.current.scrollIntoView();
    }
}, [isVisible]);
   useEffect(() => {
    console.log("Queue updated:", queue);
    console.log(history)
}, [queue]);
    return(
        <div 
        ref={queueRef}
        className={`  fixed top-0 right-1 w-1/4 transition-all delay-150 ease-in-out ${isVisible? " translate-x-0" : " translate-x-full"}
         h-90/100 mt-20 bg-gray-200/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-200  justify-self-end overflow-y-auto rounded-lg scrollbar-none   `}>
           
                <section >
                <div className={`text-xl  bg-gray-300/80 dark:bg-gray-800/80 ${!history.length  ? "hidden border-b" : "block"} 
                flex justify-around  align-items-center sticky top-0 border-b border-gray-300 dark:border-gray-600  py-2 font-bold`}>
                     <h1 className=" self-start">
                    History 
                    </h1>
                 <h1 className="justify-self-end text-primary hover: font-normal">
                    <button onClick={() => {setHistory([])}}>
                        Clear
                    </button>
                    </h1>
                </div>
               
                
                 <HistorySongs 
                list={history}/>
                 </section>

                 <section ref={upNextRef}>
                <div className={`text-xl  bg-gray-300/80 dark:bg-gray-800/80 block flex justify-around 
                    align-items-center sticky top-0 border-b border-gray-300 dark:border-gray-600 py-2 font-bold`}>
                     <h1 className=" self-start">
                    Up Next 
                    </h1>
                 <h1 className="justify-self-end text-primary hover: font-normal">
                    <button onClick={() => {setQueue([])}}>
                        Clear
                    </button>
                    </h1>
                </div>
                <QueueSongs 
                list={upcoming}/>
                </section>
              
                
          
            
        </div>

                                   
)
   }

export default Queue