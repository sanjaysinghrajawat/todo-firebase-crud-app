"use client"
import { onAuthStateChanged, signOut } from "firebase/auth";
const { createContext, useContext, useState, useEffect } = require("react");
import { auth } from "./config";

const AuthUserContext = createContext({
    authUser:null,
})

export default function useFirebaseAuth()
{
    const [authUser, setAuthUser] = useState(null);

    const authStateChanged = async (user) =>{
    
        if(!user){
            setAuthUser(null);
            return;
        }
        setAuthUser({
            uid:user.uid,
            email:user.email,
            username:user.displayName,
        })
    };

    const authSignOut = () =>{
        signOut(auth).then(()=> {
            setAuthUser(null)
        })
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, authStateChanged);
        return ()=> unsubscribe();
    }, [])

    return {
        authUser, setAuthUser, authSignOut
    }
}

export const AuthUserProvider = ({children}) => {
    const auth = useFirebaseAuth();

    return (
        <AuthUserContext.Provider value={auth}>
            {children}
        </AuthUserContext.Provider>
    )
}

export const useAuth = () => useContext(AuthUserContext);

// "use client"
// import { onAuthStateChanged, signOut } from "firebase/auth";
// const { createContext, useContext, useState, useEffect } = require("react");
// import { auth } from "./config";

// const AuthUserContext = createContext({
//     authUser:null,
//     isLoading:true,
// })

// export default function useFirebaseAuth()
// {
//     const [authUser, setAuthUser] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);

//     const authStateChanged = async (user) =>{
//         setIsLoading(true);
//         if(!user){
//             setAuthUser(null);
//             setIsLoading(false);
//             return;
//         }
//         setAuthUser({
//             uid:user.uid,
//             email:user.email,
//             username:user.displayName,
//         })
//         setIsLoading(false);
//     };

//     const authSignOut = () =>{
//         signOut(auth).then(()=> {
//             setAuthUser(null)
//             setIsLoading(false);
//         })
//     }

//     useEffect(()=>{
//         const unsubscribe = onAuthStateChanged(auth, authStateChanged);
//         return ()=> unsubscribe();
//     }, [])

//     return {
//         authUser, isLoading, setAuthUser, authSignOut
//     }
// }

// export const AuthUserProvider = ({children}) => {
//     const auth = useFirebaseAuth();

//     return (
//         <AuthUserContext.Provider value={auth}>
//             {children}
//         </AuthUserContext.Provider>
//     )
// }

// export const useAuth = () => useContext(AuthUserContext);