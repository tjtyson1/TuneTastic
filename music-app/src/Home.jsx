import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom"

export default function Home(){
    const navigate = useNavigate()
    return(
        <div className="bg-gray-300 dark:bg-gray-900 h-screen flex items-center justify-center   ">
            <div className=" ">

                <div className="flex text-4xl font-bold p-10 items-center justify-center ">
                <h1 className="text-center dark:text-gray-200">Click To Get Started</h1> 
                </div>

                <div className=" text-4xl font-bold flex justify-center items-center text-center animate-bounce dark:text-gray-200 ">
                    <FontAwesomeIcon icon="fa-solid fa-arrow-down" />
               </div>
            
                <div className="flex justify-center items-center p-10">
                    <button className="px-8  py-4 bg-green-600 text-gray-200 text-xl w-44 font-bold rounded-md"
                    onClick={() =>{navigate("/register")}}>
                    Sign Up
                    </button>
            
                
                    <h1 className=" font-semibold text-4xl text-center p-10 dark:text-gray-200">Or </h1>
               
               
                    <button className="px-8  py-4 bg-blue-600  w-44 text-gray-200 text-xl font-bold rounded-md"
                    onClick={() =>{navigate("/login")}}>
                    Log In
                    </button>
                </div>
                
            
            

               

            </div>
            

           


        </div>
    )

}