import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signUser = () => {
    axios
      .post("http://localhost:8080/user/signup", {
        username: username,
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data) {
          //   log.setLogged(true);
          //   dispatch(addUser(res.data));
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
        // console.log(res)

        //const status = res.data == 'Success' ? log.setLogged(true) : log.setLogged(false);
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
      <h3>Sign up</h3>

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
      </button>
    </div>
  );
};

export default Signup;
