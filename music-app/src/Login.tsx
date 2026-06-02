import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login(){
    
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/login', {email, password})
        .then(result => {console.log(result)
            if (result.data === "Success") {
                navigate('/home')
            }
        
        })
        .catch(err=> console.log(err))
    }
     return(
        <div className=" d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Login</h2>
                 <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input 
                        type="email"
                        placeholder="Enter Email"
                        autoComplete="off"
                        name="email"
                        className="form-control rounded-1"
                        onChange={(e) => setEmail(e.target.value)}  
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Password</strong>
                        </label>
                        <input 
                        type="text"
                        placeholder="Enter Password"
                        autoComplete="off"
                        name="email"
                        className="form-control rounded-1" 
                         onChange={(e) => setPassword(e.target.value)}  
                        />
                    <br />
                    <button type="submit" className="btn btn-success w-100 rounded-1"> Login</button>
                    
                </div>
            </form>
                <p> Don't Have an Account?</p>
                <Link to="/Register" className="btn btn-default border w-100 bg-light rounded-1 text-decoration-none">
                    Sign Up
                    </Link>
            </div>
           
           
        </div>
    );
}

export default Login