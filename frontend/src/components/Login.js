import React from "react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "./logContext";
import 'font-awesome/css/font-awesome.min.css'




const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const [logged, setLogged] = useState(false)
  const {user, setUser }= useContext(UserContext)

//   useEffect(() => {
//     console.log(token);
//   }, [logged]);

  const logUser = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/user/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data) {
          //   log.setLogged(true);
          //   dispatch(addUser(res.data));
          console.log("res", res.data);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("username", res.data.username);
          setUser(res.data)
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
      console.log('logout')
    localStorage.clear();
    setTimeout(() => {
        // navigate("../", { replace: true });
        window.location.reload()
      }, 1000);
    setLogged(false)
  }


  return (
    <div>
      {token ? (
        <div>
          <h1>Welcome {username}</h1>
          <button className="btn btn-danger" onClick={() => logout()}>Logout</button>
        </div>
      ) : (
        // <div className="log">
        //   <h3>Sign In</h3>

        //   <div className="form-group">
        //     <label>Email address</label>
        //     <input
        //       type="email"
        //       className="form-control"
        //       placeholder="Enter email"
        //       value={email}
        //       onChange={(e) => setEmail(e.target.value)}
        //     />
        //   </div>

        //   <div className="form-group">
        //     <label>Password</label>
        //     <input
        //       type="password"
        //       className="form-control"
        //       placeholder="Enter password"
        //       value={password}
        //       onChange={(e) => setPassword(e.target.value)}
        //     />
        //   </div>

        //   <div className="form-group">
        //     <div className="custom-control custom-checkbox">
        //       <input
        //         type="checkbox"
        //         className="custom-control-input"
        //         id="customCheck1"
        //       />
        //       <label className="custom-control-label" htmlFor="customCheck1">
        //         Remember me
        //       </label>
        //     </div>
        //   </div>
        //   <Link to='/signup'>Doesn't have an account? Signup</Link>

        //   <button
        //     type="submit"
        //     className="btn btn-primary btn-block"
        //     onClick={() => logUser()}
        //   >
        //     Submit
        //   </button>
        //   <p className="forgot-password text-right">
        //     Forgot <a href="#">password?</a>
        //   </p>
        // </div>
        <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            <form action className="sign-in-form">
              <h2 className="title">Login</h2>
              <div className="input-field">
                <i className="fas fa-user" />
                <input type="text"  placeholder="Username" required="yes" value={email}
              onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="input-field">
                <i className="fas fa-lock" />
                <input type="password"  placeholder="Password" id="id_password" required="yes" value={password}
              onChange={(e) => setPassword(e.target.value)}/>
                <i className="far fa-eye" id="togglePassword" style={{cursor: 'pointer'}} />
              </div>
              <button  defaultValue="Sign in" className="btn solid" onClick={(e) => logUser(e)}/>
              <p className="social-text">You can login with:</p>
              <div className="social-media">
                <a href="#" className="social-icon" aria-label="Register with Google">
                  <i className="fab fa-google" />
                </a>
                <a href="#" className="social-icon" aria-label="Register with Discord">
                  <i className="fab fa-discord" />
                </a>
                <a href="#" className="social-icon" aria-label="Register with Twitter">
                  <i className="fab fa-twitter" />
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f" aria-label="Register with Facebook" />
                </a>
              </div>
              <div className="social-media">
                <a className="icon-mode" onclick="toggleTheme('dark');"><i className="fas fa-moon" /></a>
                <a className="icon-mode" onclick="toggleTheme('light');"><i className="fas fa-sun" /></a>
              </div>
              <p className="text-mode">Change theme</p>
            </form>
            <form action className="sign-up-form">
              <h2 className="title">Register</h2>
              <div className="input-field">
                <i className="fas fa-user" />
                <input type="text" name="usuario" autoComplete="username" placeholder="Username" required="yes" />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope" />
                <input type="email" name="correo" autoComplete="email" placeholder="Email" required="yes" />
              </div>
              <div className="input-field">
                <i className="fas fa-lock" />
                <input type="password" name="contraseña" autoComplete="current-password" placeholder="Password" id="id_reg" required="yes" />
                <i className="far fa-eye" id="toggleReg" style={{cursor: 'pointer'}} />
              </div>
              <a href="#" className="key use-keyboard-input">Virtual keyboard</a>
              <a href="https://priva.reversecode.repl.co/tools/pass.html" className="pass" target="_blank">Generate a strong password</a>
              <label className="check">
                <input type="checkbox" defaultChecked="checked" />
                <span className="checkmark">I accept the <a href="terms.html">terms and services</a></span>
              </label>
              <input type="submit" defaultValue="Create account" className="btn solid" />
              <p className="social-text">You can register with:</p>
              <div className="social-media">
                <a href="#" className="social-icon" aria-label="Register with Google">
                  <i className="fab fa-google" />
                </a>
                <a href="#" className="social-icon" aria-label="Register with Discord">
                  <i className="fab fa-discord" />
                </a>
                <a href="#" className="social-icon" aria-label="Register with Twitter">
                  <i className="fab fa-twitter" />
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f" aria-label="Register with Facebook" />
                </a>
              </div>
            </form>
          </div>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>You don't have an account?</h3>
              <p>Create your account right now to follow people and like publications</p>
              <button className="btn transparent" id="sign-up-btn" ><Link to='/signup' style={{color: 'white'}}>Signup</Link></button>
            </div>
            <img src="img/log.svg" className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>Already have an account?</h3>
              <p>Login to see your notifications and post your favorite photos</p>
              <button className="btn transparent" id="sign-in-btn">Sign in</button>
            </div>
            <img src="img/register.svg" className="image" alt="" />
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default Login;
