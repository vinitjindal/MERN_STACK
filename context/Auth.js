import {createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext(null);


// export const useBrowser = () =>{
//     const [isBrowser, setBrowser] = useState(false);
//     useEffect(()=>{
//         setBrowser(true)
//     },[])

//     return isBrowser
// }

// it should be useAuthContext instead of authContext. still it is not showing any error.
export const useAuthContext = () => useContext(AuthContext); 

const updateToken = (token) =>{

    if(!(typeof window !== 'undefined'))
        return () => undefined;


    if(!token)
        localStorage.removeItem('authToken');
    else
        localStorage.setItem('authToken', token)    
}

const updateRole = (role) =>{

    if(!(typeof window !== 'undefined'))
        return () => undefined;


    if(!role)
        localStorage.removeItem('role');
    else
        localStorage.setItem('role', role)    
}

const Auth = ({children}) =>{

    const [token, setToken] = useState(null)//(typeof window !== 'undefined' && localStorage.getItem('authToken')) ?? null)
    const [role, setRole] = useState(null)//(typeof window !== 'undefined' && localStorage.getItem('role')) ?? null)

    useEffect(()=>{
        setToken(localStorage.getItem('authToken'))
        setRole(localStorage.getItem('role'));
    },[])

    const handleUpdateToken = (token) =>{
        setToken(token)
        updateToken(token)
    }
    
    const handleUpdateRole = (role) =>{
        setRole(role)
        updateRole(role)
    }
    
    return(
        <>
            <AuthContext.Provider value={{
                isAuthenticated: !!token,
                role: role,
                handleToken: handleUpdateToken,
                handleRole: handleUpdateRole
            }}>
                {children}
            </AuthContext.Provider>   
        </>
    )
}

export default Auth;