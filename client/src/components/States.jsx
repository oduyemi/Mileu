import React, { useState, useEffect } from "react";
import axios from "axios";



export const States = () => {
    const [states, setStates] = useState([]);
    const [flashMessage, setFlashMessage] = useState(null)

    useEffect(() => {
        const fetchStates = async () => {
            try {
                let requestedPath = "/states";
                const storedApiKey = localStorage.getItem("apiKey");
                if (!storedApiKey) {
                    setFlashMessage({
                        type: "error",
                        message: "API key is required for access.",
                    });

                    localStorage.setItem("requestedPath", requestedPath)
                    window.location.href = "/api"
                } else {
                const response = await axios.get("https://mileu.onrender.com/states", {
                    headers: { "Authorization": `Bearer ${storedApiKey}` }
                });
                    setStates(response.data);
                }

                const clearStoredApiKey = () => {
                    localStorage.removeItem("apiKey");
                    localStorage.removeItem("requestedPath");
                };
    
                const clearApiKeyInterval = setInterval(clearStoredApiKey, 2 * 60 * 1000); 
             
                return () => clearInterval(clearApiKeyInterval);

            } catch (error) {
                console.error("Error fetching states:", error);
                setFlashMessage({
                    type: "error",
                    message: "Failed to fetch states. Please try again later.",
                });
            }
        };

        fetchStates();
    }, []); 

    return (
        <div className="container">
            <div className="section-title row text-center">
                <div className="text-center">
                    <h1 className="text-4l text-center fw-light mt-5 d-inline">
                        All&nbsp;
                        <span>
                            <h1 className="animate__animated animate__flash animated__delay__2 text-warning d-inline">
                                States
                            </h1>
                        </span>&nbsp;in Nigeria
                    </h1>
                </div>
            </div>

            <hr />
            
            <div className="row d-flex mx-auto">
                {flashMessage && (
                    <div className={`alert ${flashMessage.type === "success" ? "alert-success" : "alert-danger"}`}>
                        {flashMessage.message}
                    </div>
                )}
                <div className="col ms-5">
                    <h2 className="fw-bold mx-auto mt-3 mb-5 text-center">States &amp; Capitals</h2>
                    {states.map((state) => (
                        <div className="row" key={state.id}>
                            <div className="col">
                                <h4>{state.state_id}. &emsp; {state.state_name}</h4>
                            </div>
                            <div className="col">
                                <h4>{state.state_capital}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

