import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const LogContext = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [uid, setUid] = useState(null)

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(
          {
        username: localStorage.getItem("username"),
        uid: localStorage.getItem("id"),
        token: localStorage.getItem("token"),
      }
    // localStorage.getItem("user")
    );
    //   setUid({id:localStorage.getItem('id')})
      console.log(localStorage.getItem("user"));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default LogContext;

const UserContext = React.createContext({ name: "", auth: false });

export { UserContext };
