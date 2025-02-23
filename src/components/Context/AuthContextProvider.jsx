import { createContext, useEffect, useState } from "react"

export let Authcontext= createContext();
function AuthContextProvider({children}) {
let [token,setToken]= useState(localStorage.getItem("token")||null)
useEffect(() => {
    if (token) {
        localStorage.setItem('token', token); 
    } else {
        localStorage.removeItem('token');
    }
}, [token]);
    return <Authcontext.Provider value={{token,setToken}}>
{children}
    </Authcontext.Provider>
}

export default AuthContextProvider
