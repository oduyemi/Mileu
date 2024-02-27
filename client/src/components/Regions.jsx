import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import withApiKeyProtection from "../WithApiKeyProtection";

export const Regions = () => {
    const [regions, setRegions] = useState([]);
    const { apiKey } = useContext(UserContext);

    useEffect(() => {
        const validateApiKey = async () => {
            try {

                await axios.post(`http://localhost:8000/api-key/${apiKey}`, {});

            } catch (error) {

                if (error.response && error.response.status === 404) {
                   
                    window.location.href = "/api";

                } else {

                    console.error("Error validating API key:", error);

                }
            }
        };

        validateApiKey();
    }, [apiKey]);

    useEffect(() => {
        const fetchRegions = async () => {
            try {
                const response = await axios.get("http://localhost:8000/regions", {
                    headers: { "Authorization": `Bearer ${apiKey}` }
                });
                setRegions(response.data);
            } catch (error) {
                console.error("Error fetching regions:", error);
            }
        };
        if (apiKey) {
          fetchRegions();
        }
    }, [apiKey]);
    
    return(
        <div>
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
        </div>
    )
}


export default withApiKeyProtection(Regions);