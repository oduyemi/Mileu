import React, { useState, useEffect } from "react";
import axios from "axios";

const withApiKeyProtection = (WrappedComponent) => {
  const WithApiKeyProtection = ({ apiKey }) => {
    const [apiKeyExists, setApiKeyExists] = useState(false);
    const [flashMessage, setFlashMessage] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkApiKey = async () => {
        try {
          const response = await axios.get(
            `https://mileu.onrender.com/api-key/${apiKey}`,
            {},
            {
              headers: { "Content-Type": "application/json" }
            }
          );

          if (response.status === 200) {
            setApiKeyExists(true);
            setFlashMessage({
              type: "success",
              message: "API key Authentication successful",
          });
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
          } else {
            console.error("Error checking API key:", error);
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
