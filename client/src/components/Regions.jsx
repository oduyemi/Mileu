import React, { useState, useEffect } from "react";
import axios from "axios";



export const Regions = () => {
    const [regions, setRegions] = useState([]);
    const [flashMessage, setFlashMessage] = useState(null);
    
    useEffect(() => {
        const fetchRegions = async () => {
            try {
                let requestedPath = "/regions";
                const storedApiKey = localStorage.getItem("apiKey");
                if (!storedApiKey) {
                    setFlashMessage({
                        type: "error",
                        message: "API key is required for access.",
                    });

                    localStorage.setItem("requestedPath", requestedPath)
                    window.location.href = "/api"
                } else {
                const response = await axios.get("https://mileu.onrender.com/regions", {
                    headers: { "Authorization": `Bearer ${storedApiKey}` }
                });
                    setRegions(response.data);
                }

                const clearStoredApiKey = () => {
                    localStorage.removeItem("apiKey");
                    localStorage.removeItem("requestedPath");
                };
    
                const clearApiKeyInterval = setInterval(clearStoredApiKey, 5 * 60 * 1000); 
             
                return () => clearInterval(clearApiKeyInterval);
                
            } catch (error) {
                console.error("Error fetching regions:", error);
                setFlashMessage({
                    type: "error",
                    message: "Failed to fetch regions. Please try again later.",
                });
            }
        };

        fetchRegions();
    }, []); 

    return (
        <>
            <div className="container mb-5">
                <div className="section-title row text-center">
                    <div className="text-center">
                        <h1 className="text-4l text-center fw-light mt-5 d-inline">
                            Geo-Political &nbsp;
                            <span>
                                <h1 className="animate__animated animate__flash animated__delay__2 text-warning d-inline">
                                    Regions
                                </h1>
                            </span> 
                            &nbsp; in Nigeria
                        </h1>
                    </div>
                </div>
                <hr /> 
                <div className="row mb-5 mx-auto">
                    {flashMessage && (
                        <div className={`alert ${flashMessage.type === "success" ? "alert-success" : "alert-danger"}`}>
                            {flashMessage.message}
                        </div>
                    )}
                    <div className="d-flex align-items-center justify-content-center" style={{ margin: "10px", padding: "10px" }}>
                        <div className="mx-auto">
                            <figure className="animate__animated animate__fadeIn animated__delay__2" >
                                <img src={require("../assets/images/map.jpg")} alt="first" className="img-responsive flex-grow-1" />
                            </figure>
                        </div>
                        <div className="mx-auto">
                            {regions.map(region => (
                                <h4 key={region.id}>{region.region_id} &emsp; {region.region_name}</h4>
                            ))}   
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// export default withApiKeyProtection(Regions);
