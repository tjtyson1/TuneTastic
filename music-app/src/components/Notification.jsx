

import { useEffect } from "react";
import { usePlayer } from "../context/PlayerContext"


export default function Notification(){

    const {showNotification, setShowNotification} = usePlayer()
    useEffect(() => {

         if(!showNotification.show) return;

         const timer = setTimeout(() => {
            setShowNotification(false);
         }, showNotification.showTime * 1000);

         return () => clearTimeout(timer);

    },[showNotification]);

    if (!showNotification.show) return null;
   
   
    return(
        showNotification.show &&
        <div className="fixed top-16 justify-center justify-self-center h-16 w-full  bg-white/80 align-items-center py-3 px-4 overflow-auto">
            <div className="flex justify-center">
            </div>
            <p className="text-center mt-2 font-semibold text-lg">{showNotification.message} </p>
        </div>
    )

}