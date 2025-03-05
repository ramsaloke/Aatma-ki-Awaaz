import { createContext, useEffect, useState } from "react";


// create context

export const AuthContext = createContext();

// create a global state which is the state we can manage globally 

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children}) => { // here AuthProvider is a global state this state we should wrap in main.jsx 

    // now manage the state with your logics 

    const [user , setUser ] = useState(null);

    const fetchUser = async () => {
        try {
          const response = await fetch("https://aatma-ki-awaaz.onrender.com/api/auth/profile", {
            method: "GET",
            credentials: "include",
          });
      
          const data = await response.json();
          console.log("Fetched user data:", data);
      
          if (data.success && data.user) {
            setUser(data.user); 
          } else {
            setUser(null);  // ✅ Ensure the user state resets
          }
        } catch (error) {
          setUser(null);  
          console.error("Error fetching user:", error);
        }
      };
      
      
      
    
 
    useEffect(()=>{
        fetchUser();
    },[])

    return(
        <AuthContext.Provider value={{user ,setUser, fetchUser}}>{children}</AuthContext.Provider>
    );
};
