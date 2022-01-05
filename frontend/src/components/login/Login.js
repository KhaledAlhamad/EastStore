import React from "react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "../logContext";
import "font-awesome/css/font-awesome.min.css";
import styled from "styled-components";
import { mobile } from "../../responsive";
import './login.css'



const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;


const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Linked = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const token = localStorage.getItem("token");
  const loggedUser = localStorage.getItem("user");
  const uName = localStorage.getItem("username");
  const uid = localStorage.getItem("uid");
  const token = localStorage.getItem("token");
  const [logged, setLogged] = useState(false);
  const { user, setUser } = useContext(UserContext);


  const logUser = (e) => {
    e.preventDefault();

    axios
      .post("/auth/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.data) {
          console.log("res", res.data);
          localStorage.setItem("user", res.data);
          localStorage.setItem("username", res.data.username);
          localStorage.setItem("uid", res.data._id);
          localStorage.setItem("token", res.data.token);
          setUser(res.data);
          Swal.fire({
            icon: "success",
            title: `Welcome ${res.data.username}`,
            text: "You are logged in!",
          });
          setTimeout(() => {
            navigate("../", { replace: true });
            // window.location.reload()
          }, 1000);
        }
      })
      .catch((err) => {
        console.log("Error");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please check Username or Password!",
        });
      });
  };

  const logout = () => {
    console.log("logout");
    localStorage.clear();
    setTimeout(() => {
      // navigate("../", { replace: true });
      window.location.reload();
    }, 1000);
    setLogged(false);
  };

  return (
    <div>
      {loggedUser ? (
        <div>
          <h1>Welcome {username}</h1>
          <button className="btn btn-danger" onClick={() => logout()}>
            Logout
          </button>
        </div>
      ) : (
       
        <div className="Container">
          <Wrapper>
            <h1 className="Title">SIGN IN</h1>
            <div style={{ display: 'flex', flexDirection: 'column'}}>
              <input className="Input"
              
              type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input className="Input"
              type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br></br>
              <button className="Button" onClick={(e) => logUser(e)}>LOGIN</button >
              <Link to='/signup' >CREATE A NEW ACCOUNT</Link>
            </div>
          </Wrapper>
        </div>
      )}
    </div>
  );
};

export default Login;
