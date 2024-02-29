import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

export const ApiKeyForm = () => {
    const [apiKey, setApiKey] = useState("");
    const [flashMessage, setFlashMessage] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(`https://mileu.onrender.com/api-key/${apiKey}`);
            if (response.status === 200) {
                localStorage.setItem("apiKey", apiKey);
                setFlashMessage({
                    type: "success",
                    message: "API Key validated successfully",
                });
                let requestedPath = localStorage.getItem("requestedPath");
                window.location.href = requestedPath;
            } else {
                console.error("Error validating API key:", response.data);
                setFlashMessage({
                    type: "error",
                    message: "An error occurred during API key validation",
                });
            }
        } catch (error) {
            console.error("Error validating API key:", error);
            setFlashMessage({
                type: "error",
                message: "Error validating API",
            });
        }

    };

    return (
        <div className="container d-flex justify-content-center align-items-center mt-5 up">
            <div className="card p-4 shadow">
                <h3 className="text-center text-dark text-uppercase mb-2">Authorization</h3>
                <form onSubmit={handleSubmit}>
                    {formSubmitted && (
                        <div className={`alert ${flashMessage?.type === "success" ? "alert-success" : "alert-danger"}`}>
                            {flashMessage?.message}
                        </div>
                    )}
                    <div className="mb-2">
                        <label htmlFor="apiKey" className="form-label">API key</label>
                        <input
                            type="password"
                            className="form-control"
                            id="apiKey"
                            name="api_key"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <button type="submit" className="btn btn-lg btn-warning w-100">Enter</button>
                    </div>
                </form>
                <p className="mt-3 text-center">
                    Don't have an API key?{" "}
                    <Link to="/signup" className="text-decoration-none">Sign Up</Link>{" "}<span>to get one now</span>
                </p>
            </div>
        </div>
    );
};
