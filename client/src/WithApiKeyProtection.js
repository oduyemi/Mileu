import React, { useState, useEffect } from "react";
import axios from "axios";

const withApiKeyProtection = (WrappedComponent, apiKey) => {
  const WithApiKeyProtection = () => {
    const [apiKeyExists, setApiKeyExists] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkApiKey = async () => {
        try {
          const response = await axios.post(
            `http://localhost:8000/api-key/${apiKey}`,
            {},
            {
              headers: { "Content-Type": "application/json" }
            }
          );

          if (response.status === 200) {
            setApiKeyExists(true);
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
            window.location.href = "/api";
          } else {
            console.error("Error checking API key:", error);
            window.location.href = "/signup";
          }
        } finally {
          setLoading(false);
        }
      };

      checkApiKey();
    }, [apiKey]); 

    if (loading) {
      return <div>Loading...</div>;
    }

    return apiKeyExists ? <WrappedComponent /> : null;
  };

  return WithApiKeyProtection;
};

export default withApiKeyProtection;
