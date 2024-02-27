import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

const initialState = {
  isApiKeyValidated: false,
  user: null
}

function reducer (state, action) {
  switch(action.type){
    case "signin":
    return {
      ...state, user:action.payload.user
    }
    case "isValidated":
      return {
        ...state, isApiKeyValidated:action.payload.isValidated
      }
      default:
        console.log("Default state")
  }
}


export const UserProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState(null);
  const [flashMessage, setFlashMessage] = useState(null);
  const [user, setUser] = useState(null);


  // API VALIDATION
  const validateApiKey = async (apiKey) => {
    try {
      const response = await axios.get(`http://localhost:8000/api-key/${apiKey}`, {});
      console.log(response.data);
  
      setApiKey(response.data.api_key); 
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setFlashMessage("Incorrect API key. Sign up to generate API key");
        setTimeout(() => {
          setFlashMessage(null);
          window.location.href = "/signup";
        }, 2000);
      } else {
        console.error("Error validating API key:", error);
      }
    }
  };

  useEffect(() => {
    if (apiKey) {
      validateApiKey(apiKey);
    }
  }, [apiKey]); 

    // LOGIN VALIDATION
    const handleLogin = async (email, password) => {
      try {
        const response = await axios.post("http://localhost:8000/sign-in", { email, password });

        if (response.status === 200) {
          console.log("Success:", response.data);
          setUser(response.data.user);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          setFlashMessage({
            type: "success",
            message: "Login Successful. Welcome Back!",
          });

          setTimeout(() => {
            window.location.href = "/user-account";
          }, 2000);
        } else if (response.status === 400) {
          console.log("Error:", response.data);
          setFlashMessage({ type: "error", message: "All fields are required!" });
          setUser({});
        } else {
          console.error("Error:", response.data);
          setFlashMessage({ type: "error", message: "An unexpected error occurred. Please try again later." });
          setUser({});
        }
      } catch (error) {
        console.error("Axios Error:", error);

        if (error.response) {
          console.log("Response Data:", error.response.data);
          setFlashMessage({ type: "error", message: error.response.data.detail || error.response.data.message });
        } else if (error.request) {
          console.error("Request Error:", error.request);
          setFlashMessage({ type: "error", message: "No response received from the server. Please try again later." });
        } else {
          console.error("Other Error:", error.message);
          setFlashMessage({ type: "error", message: "An unexpected error occurred. Please try again later." });
        }
      }

  }; 

  return (
    <UserContext.Provider value={{ apiKey, setApiKey, flashMessage, handleLogin }}>
      {children}
    </UserContext.Provider>
  );
}; 
