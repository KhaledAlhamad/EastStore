import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from './logContext';
import { useContext } from 'react';
import user from '../reducers/user/user';


const Profile = () => {
    const token = localStorage.getItem("username");
    // const [logged, setLogged] = useState(false)
    const navigate = useNavigate();
    const {setUser , user} = useContext(UserContext)



    const logout = () => {
        console.log('logout')
      localStorage.clear();
      setTimeout(() => {
          navigate("../", { replace: true });
        // window.location.reload()
        }, 1000);
      setUser(false)
    }

    return (
        <div>
            <h1>Profile {user.username}</h1>
            <button className="btn btn-danger" onClick={() => logout()}>Logout</button>
        </div>
    )
}

export default Profile
