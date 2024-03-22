import React from "react";
import axios from 'axios';
import {useNavigate, Link} from "react-router-dom";
import { useState } from "react";

function Login() {

    const history = useNavigate();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    async function submit(e) {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8000/signup", {
                email, password
            })
            .then(res=> {
                console.log(res.data)
                if(res.data==="exists") {
                    //trying to sign in again
                    alert("User already exists")
                }
                else if (res.data==="notexist") {
                    history("/home", {state:{id:email}})
                }
            })
            .catch(e=>{
                alert("Wrong detials");
                console.log(e);
            })
        }
        catch(e) {
            console.log(e);
        }
    }

    return (
        <div className="loginbody">
            <div className="login">
                <h1>Signup</h1>
                <form action="POST">
                    <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email" className="email"></input>
                    <br></br>
                    <br></br>
                    <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" className="password"></input>
                    <br></br>
                    <br></br>
                    <input type="submit" onClick={submit} className="submit"/>
                </form>
                <br/>
                <p>OR</p>
                <br/>
                <Link to="/">Login Page</Link>
            </div>
    </div>  
    );
}

export default Login;
