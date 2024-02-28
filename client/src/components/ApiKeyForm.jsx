import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

export const ApiKeyForm = ({ onApiKeyValidated }) => {
    const [apiKey, setApiKey] = useState("");
    const [flashMessage, setFlashMessage] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const ApiContext = useContext(UserContext);

    const handleApi = async () => {
        try {
            const response = await axios.post(`https://mileu.onrender.com/api-key/${apiKey}`);
            const responseData = response.data;
    
            if (response.status === 200) {
                console.log("Success:", responseData);
                ApiContext.setApiKey(responseData.api_key); 
                onApiKeyValidated(responseData.api_key);
                setFlashMessage({
                    type: "success",
                    message: "API Key validated successfully",
                });
                setFormSubmitted(true);
            } else {
                console.error("Error:", responseData);
                setFlashMessage({
                    type: "error",
                    message: responseData.detail || "An error occurred during API key validation",
                });
                setApiKey({}); 
                setFormSubmitted(true);
            }
        } catch (error) {
            if (error.response) {
                console.error("Axios Error Message:", error.message);
                console.log("Response Data:", error.response.data);
                setFlashMessage({
                    type: "error",
                    message: error.response.data.detail || "An error occurred during API key validation",
                });
            } else {
                console.error("Other Error:", error.message);
                setFlashMessage({
                    type: "error",
                    message: "An unexpected error occurred. Please try again later.",
                });
            }
            setFormSubmitted(true);
        }
    };
        
    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleApi();
        setFormSubmitted(true);
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
