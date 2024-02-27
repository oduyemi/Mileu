import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import withApiKeyProtection from "../WithApiKeyProtection";



export const LGAs = () => {
    const [lgas, setLgas] = useState([]);
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
        const fetchLgas = async () => {
            try {
                const response = await axios.get("http://localhost:8000/lgas");
                setLgas(response.data);
            } catch (error) {
                console.error("Error fetching states:", error);
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

export default withApiKeyProtection(LGAs);