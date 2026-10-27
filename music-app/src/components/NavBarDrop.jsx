import { Link } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function NavbarDrop(){
    const {isVisible, navBarClicked, setNavBarClicked, currentUser, logOut} = usePlayer()
    
    
    return(
        <div className={`${navBarClicked? " translate-y-0 opacity-100" : "  opacity-0 -translate-y-full"} transition-all duration-250 ease-in-out 
        fixed  mt-20 top-0 right-0 z-99 bg-secondary-dark h-1/4 w-1/4 rounded-bl-lg  text-gray-200 text-xl text-center`}>
           <Link to="/library" onClick={() => {setNavBarClicked(!navBarClicked); }}className="block w-fullbpx-4 py-2 active:bg-primary-dark ">
                <FontAwesomeIcon icon="fa-solid fa-home"/> 
           </Link >
           <Link to="/playlist" onClick={() => {setNavBarClicked(!navBarClicked); }} className="block w-full px-4 py-2 active:bg-primary-dark ">
                <FontAwesomeIcon icon="fa-solid fa-list"/> 
           </Link>
           <Link Link to="/search" onClick={() => {setNavBarClicked(!navBarClicked); }} className="block w-full px-4 py-2 active:bg-primary-dark ">
                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass"/> 
           </Link>
           <Link to="/" onClick={() => {setNavBarClicked(!navBarClicked);logOut() }} className={`${currentUser ? "block" : "hidden"} w-full px-4 py-2 active:bg-primary-dark`}>
                <FontAwesomeIcon icon="fa-solid fa-right-from-bracket"/> 
           </Link>
           
            </div>
    )
}