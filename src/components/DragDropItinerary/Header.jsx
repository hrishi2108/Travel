import React from "react";
import { NavLink } from "react-router-dom";

const headerStyle = {
  backgroundColor: "#2980b9",
  padding: "15px 30px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const navStyle = {
  display: "flex",
  gap: "25px",
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "1.1rem",
  padding: "6px 10px",
  borderRadius: "8px",
};

const activeStyle = {
  backgroundColor: "#1c5980",
};

export default function Header() {
  return (
    <header style={headerStyle}>
      <div style={{ color: "white", fontWeight: "700", fontSize: "1.5rem" }}>
        Travel Planner
      </div>
      <nav style={navStyle}>
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}
          end
        >
          Home
        </NavLink>
        <NavLink
          to="/itinerary"
          style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}
        >
          Itinerary
        </NavLink>
        <NavLink
          to="/about"
          style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}
        >
          About
        </NavLink>
      </nav>
    </header>
  );
}
