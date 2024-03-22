import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './login.css'

function Login() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault(); //prevents website to do a default behavior for button

    try {
      const res = await axios.post("http://localhost:8000/", {
        email,
        password,
      });
      //it is used to make a POST request to a server when the user submits the login form. Here's how axios is used in the code:
      const { status, message } = res.data;
      console.log(status);
      if (status === "exists") {
        // Redirect to Home page
        history("/home", { state: { id: email } });
      } else if (status === "notexist") {
        alert(message); // Display the message
      }
    } catch (error) {
      alert("Error occurred. Please try again."); // Generic error message
      console.error(error);
    }
  }

  return (
    <div className="loginbody">
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={submit}>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="email"
        />
        <br/>
        <br/>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="password"
        />
        <br/>
        <br/>
        <input type="submit" value="Submit" className="submit"/>
      </form>
      <br />
      <p>OR</p>
      <br />
      <Link to="/signup">Signup</Link>
    </div>
    </div>
  );
}

export default Login;
