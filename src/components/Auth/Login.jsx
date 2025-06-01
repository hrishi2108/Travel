import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      // Get all users
      const res = await axios.get(
        `https://todo-c6b49-default-rtdb.firebaseio.com/users.json`
      );

      const users = res.data || {};

      // Find user by email & password
      const userEntry = Object.entries(users).find(
        ([key, user]) => user.email === email && user.password === password
      );

      if (userEntry) {
        setMessage("Login successful!");
        // Save user info in localStorage (optional)
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userRole", userEntry[1].role);

        // Redirect to Home or dashboard
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        setMessage("Invalid email or password.");
      }
    } catch (err) {
      setMessage("Login failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {message && <p className="message">{message}</p>}
      </form>

      <p className="switch-link">
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
};

export default Login;
