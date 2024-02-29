import React, { useEffect } from "react";
import axios from "axios";




const ApiKeyValidation = ({ apiKey }) => {
    useEffect(() => {
        const validateApiKey = async () => {
            try {
                if (!apiKey) {
                    const storedApiKey = localStorage.getItem("apiKey");
                    if (storedApiKey) {
                        const response = await axios.post(`https://mileu.onrender.com/api-key/${storedApiKey}`);
                        if (response.status === 200) {
                            // API key is valid, continue to the next step
                            return;
                        }
                    }
                    // API key is not present or invalid, redirect to API key entry page
                    window.location.href = "/api";
                }
            } catch (error) {
                console.error("Error validating API key:", error);
                // Redirect to API key entry page on error
                window.location.href = "/api";
            }
        };

        validateApiKey();
    }, [apiKey]);

    return null; // This component doesn't render anything visible
};

export default ApiKeyValidation;
