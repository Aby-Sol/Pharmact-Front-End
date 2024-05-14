import { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import axios from '../../http';

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Regular expressions for email and password validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Validate email and password using regex
        if (!emailRegex.test(email)) {
            setError("Invalid email format!");
            return;
        }

        if (!passwordRegex.test(password)) {
            setError("Password must contain at least 8 characters, including uppercase, lowercase, and numbers.");
            return;
        }

       
        try {
          const res = await axios.post("/auth/register", { username, email, password });
          // Check if registration was successful
          if (res.data) {
              window.location.replace("/login"); // Redirect to home page
              console.log(res.data)
          } else {
              if (res.data.error === "email_taken") {
                  setError("This email is already taken. Please use a different email address.");
              } else {
                  setError(res.data.message); // Display error message from server
              }
          }
      } catch (error) {
          setError("Something went wrong. Please try again later."); // Display generic error message
      }
  };

    return (
        <div className="register">
            <span className="registerTitle">Sign up</span>
            <form className="registerForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input className="registerInput" type="text" placeholder="Enter your Username" autoFocus={true}
                    onChange={(e) => setUsername(e.target.value)} />
                <label>E-mail</label>
                <input className="registerInput" type="text" placeholder="Enter your e-mail" autoFocus={true}
                    onChange={(e) => setEmail(e.target.value)} />
                <label>Password</label>
                <input className="registerInput" type="password" placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)} />
                <button className="registerButton" type="Submit">Sign up</button>
                <label className="loginRegisterInput">Already registered? Login here</label>
                <button className="loginButton"><Link to="/login">Login</Link></button>
            </form>               
             {error && <span className="ErrorMessage">{error}</span>}

        </div>
    )
}


