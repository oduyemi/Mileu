import React from "react";
import logo from "../assets/images/logo/logo.png";
import { Link } from "react-router-dom";


export const Header = () => {
    return(
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark" id="probootstrap-navbar">
                <div className="container">
                    <Link to="/" className="toggleColor no-underline hover-no-underline font-bold text-2xl lg:text-4xl">
                        <img src={logo} alt="logo" className="w-40 h-40 object-cover" />
                    </Link>
                    <button className="navbar-toggler bg-warning" type="button" data-toggle="collapse" data-target="#probootstrap-menu" aria-controls="probootstrap-menu" aria-expanded="false" aria-label="Toggle navigation">
                        <span><i className="ion-navicon"></i></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-center" id="probootstrap-menu">
                        <ul className="navbar-nav">
                            <li className="nav-item active"><Link className="nav-link" to="/">Home</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/regions">Regions</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/states">States</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/lgas">LGAs</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/user-account">My Account</Link></li>
                        </ul>
                    </div>
                    <div className="d-none d-md-flex ml-auto">
                        <Link className="nav-link" to="/signin">
                            <button className="btn btn-lg btn-outline-warning btnUp">Sign In</button>
                        </Link> &emsp;
                        <Link className="nav-link" to="/signup">
                            <button className="btn btn-lg btn-warning btnUp">Sign Up</button>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}