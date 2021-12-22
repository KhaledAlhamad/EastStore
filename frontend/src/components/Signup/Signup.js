import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import styled from "styled-components";
import { mobile } from "../../responsive";
import './Signup.css'


const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;


const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loggedUser = localStorage.getItem("user");

  const signUser = () => {
    console.log(password);
    // e.preventDefault()
    axios
      .post("http://localhost:8080/auth/signup", {
        username: username,
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data) {
          console.log("res", res.data);
        //   localStorage.setItem("token", res.data.token);
        //   localStorage.setItem("username", res.data.username);
        //   setLogged(true);
          Swal.fire({
            icon: "success",
            title: `Welcome ${res.data.username}`
          });
          setTimeout(() => {
            navigate("../login", { replace: true });
          }, 1000);
        }
      })
      .catch((err) => {
        console.log("Error");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please Enter valid data!",
        });
      });
  };
  return (
    <div>
      {/* <h3>Sign up</h3>

      <div className="form-group">
        <label>Username</label>
        <input
          type="username"
          className="form-control"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-block"
        onClick={() => signUser()}
      >
        Submit
      </button> */}
      {loggedUser ? navigate("../", { replace: true }) : <div className="Container">
        <Wrapper>
          <h1 className="Title">CREATE AN ACCOUNT</h1>
            
            <input 
            className="Input form-control form-group"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input 
            className="Input form-control " 
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
            className="Input form-control"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br></br>
            <button className="Button" onClick={() => signUser()}>
              CREATE
            </button>
        </Wrapper>
      </div>}
    </div>
  );
};

export default Signup;
