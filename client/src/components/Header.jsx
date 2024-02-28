import React, { useState, useContext } from "react";
import logo from "../assets/images/logo/logo.png";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { SignOut } from "./SignOut";
import { GridOutline } from "react-ionicons";

export const Header = () => {
    const { user } = useContext(UserContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
      setIsMobileMenuOpen(false);
    };

    const renderMobileMenu = () => {
        return (
          isMobileMenuOpen && (
            <div className="mobile-menu-popup">
              <div className="mobile-menu-content sm:block md:hidden">           
                  <button className="close-button" onClick={closeMobileMenu}>
                  X
                  </button>
                    <Link to="/" className="mobile-menu-link text-2xl text-light" onClick={closeMobileMenu}>Home</Link>
                    <Link to="/regions" className="mobile-menu-link text-2xl text-light" onClick={closeMobileMenu}>Regions</Link>
                    <Link to="/states" className="mobile-menu-link text-2xl text-light" onClick={closeMobileMenu}>States</Link>
                    <Link to="/lgas" className="mobile-menu-link text-2xl text-light" onClick={closeMobileMenu}>LGAs</Link>
                    <Link to="/user-account" className="mobile-menu-link text-2xl text-light" onClick={closeMobileMenu}>My Account</Link>
                    <Link to="/signin" className="mobile-menu-link" onClick={closeMobileMenu}>
                        <button className="btn btn-lg btn-outline-warning btnUp">
                            Sign In
                        </button>
                    </Link>
                    <Link to="/signup" className="mobile-menu-link" onClick={closeMobileMenu}>
                        <button className="btn btn-lg btn-warning btnUp mt-1">
                            Sign Up
                        </button>
                    </Link>
              </div>
            </div>
          )
        );
      };

    return(
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark" id="probootstrap-navbar">
                <div className="container">
                    <Link to="/" className="toggleColor no-underline hover-no-underline font-bold text-2xl lg:text-4xl">
                        <img src={logo} alt="logo" className="w-40 h-40 object-cover logo" />
                    </Link>
                    <button className="navbar-toggler bg-warning" type="button" data-toggle="collapse" data-target="#probootstrap-menu" aria-controls="probootstrap-menu" aria-expanded="false" aria-label="Toggle navigation">
                        <span>
                            <GridOutline
                                color={"#ffffff"}
                                height="32px"
                                width="32px"
                                onClick={toggleMobileMenu}
                            />
                        </span>
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
                        {user ? (
                            <div className="cta">
                                <SignOut /> 
                            </div>
                        ) : (
                            <>
                                <Link className="nav-link" to="/signin">
                                    <button className="btn btn-lg btn-outline-warning btnUp">Sign In</button>
                                </Link> &emsp;
                                <Link className="nav-link" to="/signup">
                                    <button className="btn btn-lg btn-warning btnUp">Sign Up</button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
            {renderMobileMenu()}
        </header>
    );
};
