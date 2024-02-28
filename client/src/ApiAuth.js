import React, { createContext, useState, useEffect} from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [api, setApi] = useState(null);
  const [flashMessage, setFlashMessage] = useState(null);

  const handleApi = async (email, password) => {
    try {
      
   
      
    } catch (error) {
      

    }
  };

  return (
    <UserContext.Provider value={{ user, handleLogin }}>
      {children}
    </UserContext.Provider>
  );
};