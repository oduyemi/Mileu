import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { ApiKeyForm } from "./ApiKeyForm";


export const LGAs = () => {
    const [lgas, setLgas] = useState([]);
    const [flashMessage, setFlashMessage] = useState(null);

    useEffect(() => {
        const fetchLgas = async () => {
            try {
                let requestedPath = "/lgas";
                const storedApiKey = localStorage.getItem("apiKey");
                if (!storedApiKey) {
                    setFlashMessage({
                        type: "error",
                        message: "API key is required for access.",
                    });

                    localStorage.setItem("requestedPath", requestedPath)
                    window.location.href = "/api"
                } else {
                const response = await axios.get("https://mileu.onrender.com/lgas", {
                    headers: { "Authorization": `Bearer ${storedApiKey}` }
                });
                    setLgas(response.data);
                }

                const clearStoredApiKey = () => {
                    localStorage.removeItem("apiKey");
                    localStorage.removeItem("requestedPath");
                };
    
                const clearApiKeyInterval = setInterval(clearStoredApiKey, 5 * 60 * 1000); 
             
                return () => clearInterval(clearApiKeyInterval);
                
            } catch (error) {
                console.error("Error fetching LGAs:", error);
                setFlashMessage({
                    type: "error",
                    message: "Failed to fetch LGAs. Please try again later.",
                });
            }
        };

        fetchLgas();
    }, []);

    return(
        <div>
            <div className="container">
                <div className="section-title row text-center">
                    <div className="text-center">
                    <h1 className="text-4l text-center fw-light mt-5 d-inline">
                        All &nbsp;
                        <span>
                            <h1 className="animate__animated animate__flash animated__delay__2 text-warning d-inline">
                                LGAs
                            </h1>
                        </span> 
                        &nbsp; in Nigeria
                    </h1>
                    </div>
                </div>

                <hr /> 
            </div>

            <div className="row d-flex align-items-center justify-content-center mb-5">
                {flashMessage && (
                    <div className={`alert ${flashMessage.type === "success" ? "alert-success" : "alert-danger"}`}>
                        {flashMessage.message}
                    </div>
                )}
                <div className="col mx-auto ms-5">
                    <h2 className="fw-bold mx-auto my-3">LGA</h2>
                    {lgas.map(lga => (
                        <div key={lga.lga_id}>
                            <h4>{lga.lga_id}. &emsp; {lga.lga_name}</h4>
                        </div>
                    ))}
                </div>
            
            </div>
        </div>
    )
}

