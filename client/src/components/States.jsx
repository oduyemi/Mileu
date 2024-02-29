import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";



export const States = () => {
    const [states, setStates] = useState([]);
    const { apiKey } = useContext(UserContext);

    useEffect(() => {
        const fetchStates = async () => {
            try {
                const storedApiKey = localStorage.getItem("apiKey");
                if (!storedApiKey) {
                    window.location.href = "/api";
                    return;
                }

                const response = await axios.get("https://mileu.onrender.com/states", {
                    headers: { "Authorization": `Bearer ${storedApiKey}` }
                });
                setStates(response.data);
            } catch (error) {
                console.error("Error fetching regions:", error);
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


// export default withApiKeyProtection(States)