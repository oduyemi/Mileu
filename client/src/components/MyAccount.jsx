import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { CopyOutline } from "react-ionicons";
import { Link } from "react-router-dom";

export const MyAccount = () => {
    const { user, setUser } = useContext(UserContext);
    const [flashMessage, setFlashMessage] = useState(null)
    const [copied, setCopied] = useState(false);
    const [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",
        email: ""
    });
   
    useEffect(() => {
        if (user) {
            setUserDetails({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                email: user.email || ""
            });
        }
    }, [user]);

    useEffect(() => {
        const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
        if (storedUserDetails) {
            setUserDetails(storedUserDetails);
        }
    }, []);

    const updateUserData = async () => {
        try {
            const response = await axios.put(`https://mileu.onrender.com/users/${user.id}`, {
                first_name: userDetails.firstName,
                last_name: userDetails.lastName,
                email: userDetails.email
            });

            if (response.status === 200) {
                console.log("Success:", response.data);
                setUser(response.data);
                localStorage.setItem('userDetails', JSON.stringify(userDetails));
                setFlashMessage({
                    type: "success",
                    message: "User details updated successfully!",
                  });
            } else {
                setFlashMessage({
                    type: "error",
                    message: "Failed to update user details",
                  });
            }
        } catch (error) {
            console.error("Error updating user details:", error);
            setFlashMessage({
                type: "error",
                message: "An error occurred while updating user details",
              });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prevState => ({
            ...prevState,
            [name]: value
        }));

        localStorage.setItem('userDetails', JSON.stringify({
            ...userDetails,
            [name]: value
        }));
    };

    if (!user) {
        return (
            <div className="container">
                <div className="section-title row text-center">
                    <div className="text-center">
                        <h1 className="text-4l text-center fw-light mt-5 d-inline">
                            User &nbsp;
                            <span>
                                <h1 className="animate__animated animate__flash animated__delay__2 text-warning d-inline">
                                    Account
                                </h1>
                            </span> 
                        </h1>
                    </div>
                </div>

                <hr />

                <div className="usercard my-5 shadow mx-auto text-center">
                    <p className="my-5">You don't have a Locale account yet. Sign up now to get an API key.</p>
                    <div className="mx-auto">
                        <Link to="/signup">
                            <button className="btn btn-lg btn-warning mx-auto mt-2 mb-5">
                                Sign Up
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const apiKey = user ? user.api_key || "" : "";

    const copyToClipboard = () => {
        navigator.clipboard.writeText(apiKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <div>
            <div className="container">
                <div className="section-title row text-center">
                    <div className="text-center">
                        <h1 className="text-4l text-center fw-light mt-5 d-inline">
                            User &nbsp;
                            <span>
                                <h1 className="animate__animated animate__flash animated__delay__2 text-warning d-inline">
                                    Account
                                </h1>
                            </span> 
                        </h1>
                    </div>
                </div>

                <hr />

                <div className="usercard my-5 d-md-flex flex-wrap justify-content-between shadow mx-auto">
                    <div className="mx-auto mb-5">
                        <h4 className="text-3xl fw-bold mb-3">
                            Personal Information
                        </h4>
                        {flashMessage && (
                        <div className={`alert ${flashMessage.type === "success" ? "alert-success" : "alert-danger"}`}>
                            {flashMessage.message}
                        </div>
                        )}
                        <p>
                            First Name: &emsp;
                            <input 
                                type="text" 
                                className="text-dark" 
                                name="firstName" 
                                value={userDetails.firstName || user.firstName} 
                                onChange={handleChange} 
                            />

                        </p>
                        <p>
                            Last Name: &emsp; 
                            <input 
                                type="text" 
                                className="text-dark" 
                                name="lastName" 
                                value={userDetails.lastName || user.lastName} 
                                onChange={handleChange} 
                            />
                        </p>
                        <p>
                            Email: &nbsp;
                            <input 
                                type="email" 
                                className="ms-5 text-dark" 
                                name="email" 
                                value={userDetails.email || user.email} 
                                onChange={handleChange} 
                            />
                        </p>

                        <div className="mx-auto">
                            <button className="btn btn-lg btn-warning mx-auto" onClick={updateUserData}>
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
