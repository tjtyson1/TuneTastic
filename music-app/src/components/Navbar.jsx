

export default function Navbar(){

    return(
        <div className="bg-gray-300">
            <nav className="bg-blue-500 text-white">
                <div className="h-16 flex justify-around items-center hidden:sm">
                    <div className="text-3xl font-bold px-4">LOGO</div>
                    <div className=" flex w-full justify-around items-center">
                        <a href="/library" className="text-xl px-4  border rounded-full bg-yellow-300 hover:bg-yellow-600 flex items-center hover:scale-105 ">LIBRARY</a>
                        <a href="#" className="text-xl px-4 border rounded-full flex items-center bg-yellow-300 hover:bg-yellow-600 hover:scale-105">PLAYLIST</a>
                        <a href="/search" className="text-xl px-4 border rounded-full flex items-center bg-yellow-300 hover:bg-yellow-600 hover:scale-105">SEARCH</a>
                        <a href="#" className="text-xl px-4 border rounded-full flex items-center bg-yellow-300 hover:bg-yellow-600 hover:scale-105">SETTINGS</a>
                        <a href="/register" className="text-xl px-4 border rounded-full flex items-center bg-yellow-300 hover:bg-yellow-600 hover:scale-105">LOG IN/SIGN UP</a>
                    </div>
                    
                </div>
                </nav> 
        </div>
        
    )
    
}