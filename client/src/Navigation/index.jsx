import { Route, Routes } from "react-router-dom";
import { Header } from "../components/Header";
import { UserProvider } from "../UserContext";
import Home from "../pages/Home";
import Region from "../pages/Region";
import State from "../pages/State";
import LGA from "../pages/LGA";
import Profile from "../pages/Profile";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import API from "../pages/API";




const Navigation = () => {
    return(
        <>
            <UserProvider>
                <Header />
                    <Routes>
                        <Route exact path="/signin" element={<SignIn />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/regions" element={<Region />} />
                        <Route path="/states" element={<State />} />
                        <Route path="/lgas" element={<LGA />} />
                        <Route path="/user-account" element={<Profile/>} />
                        <Route path="/api" element={<API />} />
                        <Route path="/signup" element={<SignUp />} />                   
                    </Routes>
            </UserProvider>
        </>
    )
}


export default Navigation;