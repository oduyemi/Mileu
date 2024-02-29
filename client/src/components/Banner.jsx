import "animate.css";
import { Link } from "react-router-dom";




export const Banner = () => {
    return(
        <>
            <div className="mx-auto my-auto mb-5">
                <h1 className="text-4l text-center fw-light mt-5">
                    Nigeria's Location &nbsp;
                    <span>
                        <h1 className="animate__animated animate__flash animated__delay__2 text-warning d-inline">
                            Data &nbsp;
                        </h1>
                    </span> 
                    in One Place
                </h1>
                <p className="mx-auto text-xl font-light text-center mt-8 w-50 mb-4">
                    Locale is a developer tool for anyone who needs to know Nigeria, geographically. 
                    Our API shows you all of Nigeria&apos;s regions, states, and local government
                    areas(LGAs). Locale is looking to be a very useful tool for the thousands of
                    businesses building for Nigeria’s 200M+ population size. 
                </p>
                <div className="mx-auto text-center">
                    <Link to="/signup" className="text-xl"><button className="btn btn-lg btn-warning">Get Started</button></Link>
                </div>
            </div>
            
        </>
    )
}