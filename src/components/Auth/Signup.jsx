import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      // Check if user with email already exists
      const res = await axios.get(
        `https://todo-c6b49-default-rtdb.firebaseio.com/users.json`
      );

      const users = res.data || {};
      // Check email duplication
      const emailExists = Object.values(users).some(
        (user) => user.email === email
      );

      if (emailExists) {
        setMessage("User with this email already exists.");
        return;
      }

      // Save new user with unique key (auto-generated)
      await axios.post(
        `https://todo-c6b49-default-rtdb.firebaseio.com/users.json`,
        {
          email,
          password,
          role: "user",
          createdAt: new Date().toISOString(),
        }
      );

      setMessage("Signup successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setMessage("Signup failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <button type="submit">Sign Up</button>
        {message && <p className="message">{message}</p>}
      </form>

      <p className="switch-link">
        Already have an account? <Link to="/">Login here</Link>
      </p>
    </div>
  );
};

export default Signup;
