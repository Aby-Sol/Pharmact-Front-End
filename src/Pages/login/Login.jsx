import { Context } from "../../context/Context";
import { useRef, useContext } from "react";
import { Link } from "react-router-dom"
import axios from '../../http';
import "./Login.css"


export default function Login() {
//Creating the function to handle Submit 
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({type:"LOGIN_START"});
    try{
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      })
      dispatch({type:"LOGIN_SUCCESS", payload:res.data});
      window.location.replace("/"); // Redirect to home page

    }
    catch(error){
      dispatch({type:"LOGIN_FAILURE"});

    }
  }
  return (
    <div className="login">
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input 
              className="loginInput" 
              type="text" 
              placeholder="Enter your username" 
              autoFocus={true}
              ref={userRef}/> 
            <label>Password</label>
            <input 
              className="loginInput" 
              type="password" 
              placeholder="Enter your password"
              ref={passwordRef}/> 
            <button className="LoginButton" type="submit" disabled={isFetching}>Login</button>
            <label className="loginRegisterInput">Not registered yet ? Sign up here</label>
            <button className="loginRegisterButton" disabled={isFetching}><Link to="/register">Register</Link></button>
        </form>
    </div>
  )
}
