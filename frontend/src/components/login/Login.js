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

  //   useEffect(() => {
  //     console.log(token);
  //   }, [logged]);

  const logUser = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/auth/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.data) {
          //   log.setLogged(true);
          //   dispatch(addUser(res.data));
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
        // console.log(res)

        //const status = res.data == 'Success' ? log.setLogged(true) : log.setLogged(false);
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
        //   <div className="container">
        //   <div className="forms-container">
        //     <div className="signin-signup">
        //       <form action className="sign-in-form">
        //         <h2 className="title">Login</h2>
        //         <div className="input-field">
        //           <i className="fas fa-user" />
        //           <input type="text"  placeholder="Username" required="yes" value={username}
        //         onChange={(e) => setUsername(e.target.value)} />
        //         </div>
        //         <div className="input-field">
        //           <i className="fas fa-lock" />
        //           <input type="password"  placeholder="Password" id="id_password" required="yes" value={password}
        //         onChange={(e) => setPassword(e.target.value)}/>
        //           <i className="far fa-eye" id="togglePassword" style={{cursor: 'pointer'}} />
        //         </div>
        //         <button  defaultValue="Sign in" className="btn solid" onClick={(e) => logUser(e)}/>
        //         <p className="social-text">You can login with:</p>
        //         <div className="social-media">
        //           <a href="#" className="social-icon" aria-label="Register with Google">
        //             <i className="fab fa-google" />
        //           </a>
        //           <a href="#" className="social-icon" aria-label="Register with Discord">
        //             <i className="fab fa-discord" />
        //           </a>
        //           <a href="#" className="social-icon" aria-label="Register with Twitter">
        //             <i className="fab fa-twitter" />
        //           </a>
        //           <a href="#" className="social-icon">
        //             <i className="fab fa-facebook-f" aria-label="Register with Facebook" />
        //           </a>
        //         </div>
        //         <div className="social-media">
        //           <a className="icon-mode" onclick="toggleTheme('dark');"><i className="fas fa-moon" /></a>
        //           <a className="icon-mode" onclick="toggleTheme('light');"><i className="fas fa-sun" /></a>
        //         </div>
        //         <p className="text-mode">Change theme</p>
        //       </form>
        //       <form action className="sign-up-form">
        //         <h2 className="title">Register</h2>
        //         <div className="input-field">
        //           <i className="fas fa-user" />
        //           <input type="text" name="usuario" autoComplete="username" placeholder="Username" required="yes" />
        //         </div>
        //         <div className="input-field">
        //           <i className="fas fa-envelope" />
        //           <input type="username" name="correo" autoComplete="username" placeholder="username" required="yes" />
        //         </div>
        //         <div className="input-field">
        //           <i className="fas fa-lock" />
        //           <input type="password" name="contraseña" autoComplete="current-password" placeholder="Password" id="id_reg" required="yes" />
        //           <i className="far fa-eye" id="toggleReg" style={{cursor: 'pointer'}} />
        //         </div>
        //         <a href="#" className="key use-keyboard-input">Virtual keyboard</a>
        //         <a href="https://priva.reversecode.repl.co/tools/pass.html" className="pass" target="_blank">Generate a strong password</a>
        //         <label className="check">
        //           <input type="checkbox" defaultChecked="checked" />
        //           <span className="checkmark">I accept the <a href="terms.html">terms and services</a></span>
        //         </label>
        //         <input type="submit" defaultValue="Create account" className="btn solid" />
        //         <p className="social-text">You can register with:</p>
        //         <div className="social-media">
        //           <a href="#" className="social-icon" aria-label="Register with Google">
        //             <i className="fab fa-google" />
        //           </a>
        //           <a href="#" className="social-icon" aria-label="Register with Discord">
        //             <i className="fab fa-discord" />
        //           </a>
        //           <a href="#" className="social-icon" aria-label="Register with Twitter">
        //             <i className="fab fa-twitter" />
        //           </a>
        //           <a href="#" className="social-icon">
        //             <i className="fab fa-facebook-f" aria-label="Register with Facebook" />
        //           </a>
        //         </div>
        //       </form>
        //     </div>
        //   </div>
        //   <div className="panels-container">
        //     <div className="panel left-panel">
        //       <div className="content">
        //         <h3>You don't have an account?</h3>
        //         <p>Create your account right now to follow people and like publications</p>
        //         <button className="btn transparent" id="sign-up-btn" ><Link to='/signup' style={{color: 'white'}}>Signup</Link></button>
        //       </div>
        //       <img src="img/log.svg" className="image" alt="" />
        //     </div>
        //     <div className="panel right-panel">
        //       <div className="content">
        //         <h3>Already have an account?</h3>
        //         <p>Login to see your notifications and post your favorite photos</p>
        //         <button className="btn transparent" id="sign-in-btn">Sign in</button>
        //       </div>
        //       <img src="img/register.svg" className="image" alt="" />
        //     </div>
        //   </div>
        // </div>

        // ---------------------------------
       
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
