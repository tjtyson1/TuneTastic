import { Link } from "react-router-dom";

export default function Navbar(){

    return(
        <div className="bg-gray-300">
            <nav className="bg-blue-500 text-white mb-0">
                <div className="h-16 flex justify-around items-center hidden:sm">
                    <div className="text-3xl font-bold px-4">LOGO</div>
                    <div className=" flex w-full justify-around items-center">
                        <Link to="/library" className="text-xl px-4  border rounded-full bg-yellow-300 hover:bg-yellow-600 flex items-center hover:scale-105 ">LIBRARY</Link>
                        <Link to="/playlist" className="text-xl px-4 border rounded-full flex items-center bg-yellow-300 hover:bg-yellow-600 hover:scale-105">PLAYLIST</Link>
                        <Link to="/search" className="text-xl px-4 border rounded-full flex items-center bg-yellow-300 hover:bg-yellow-600 hover:scale-105">SEARCH</Link>
                        <Link to="#" className="text-xl px-4 border rounded-full flex items-center bg-yellow-300 hover:bg-yellow-600 hover:scale-105">SETTINGS</Link>
                        <Link to="/register" className="text-xl px-4 border rounded-full flex items-center bg-yellow-300 hover:bg-yellow-600 hover:scale-105">LOG IN/SIGN UP</Link>
                    </div>
                    
                </div>
                </nav> 
        </div>
        
    )
    
}