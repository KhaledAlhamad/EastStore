import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const LogContext = ({children}) => {
    const [user, setUser] = useState(null)
    
        useEffect(() => {
            if(localStorage.getItem("token")){
            setUser({username:localStorage.getItem('username')})
            }
        },[])
    
    return (
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default LogContext

const UserContext = React.createContext({ name: '', auth: false });

export { UserContext };
