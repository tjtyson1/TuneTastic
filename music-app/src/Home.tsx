import React from "react";

function Home(){
    return(
        <div>
            <nav className=" navbar navbar-expand-lg bg-primary">
                <ul className="navbar-nav"> 
                    <li className="nav-item"><a className="nav-link"href="#">library</a></li>
                    <li><a href="#">playlist</a></li>
                    <li><a href="#">search</a></li>
                    <li><a href="#">login/signup</a></li>
                </ul> 

            </nav>
            <div>Home</div>
        </div>
    )
}

export default Home