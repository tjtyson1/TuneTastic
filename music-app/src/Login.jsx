import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "./context/PlayerContext";
function Login(){
    
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const {setCurrentUser, currentUser } = usePlayer()
    const {API_URL} = usePlayer()
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${API_URL}/login`, {email, password})
        .then(result => {console.log(result)
            if (result.data.success) {
                console.log(result.data.user); 
                
                localStorage.setItem("user", JSON.stringify(result.data.user));
                setCurrentUser(result.data.user)

                navigate('/search')
                
            }else{
                console.error("Login failed")
                window.alert("Login failed")
            }
        
        })
        .catch(err=> console.log(err))
    }
     return(
        <div className=" flex justify-center items-center bg-gray-500 dark:bg-gray-900 text-gray-900 dark:text-gray-200  h-screen">
            <div className="bg-gray-200 dark:bg-gray-800 p-4 rounded w-1/4">
                <h2 className="text-3xl font-bold mb-4">Login</h2>
                 <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input 
                        type="email"
                        placeholder="Enter Email"
                        autoComplete="off"
                        name="email"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        onChange={(e) => setEmail(e.target.value)}  
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email">
                            <strong>Password</strong>
                        </label>
                        <input 
                        type="password"
                        placeholder="Enter Password"
                        autoComplete="off"
                        name="email"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-4" 
                         onChange={(e) => setPassword(e.target.value)}  
                        />
                    <br />
                    <button type="submit" className="px-4 py-2 bg-green-700 w-full rounded-lg text-white hover:bg-green-900"> Login</button>
                    
                </div>
            </form>
                <p> Don't Have an Account?</p>
                <br />
                <Link to="/Register" className="block text-center px-4 py-2 bg-gray-400 w-full rounded-lg text-white hover:bg-gray-600">
                    Sign Up
                    </Link>
            </div>
           
           
        </div>
    );
}

export default Login