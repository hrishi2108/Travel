import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/DragDropItinerary/Header";
import Home from "./pages/Home";
import ItineraryBuilder from "./components/ItineraryBuilder";
import About from "./pages/About";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes (no Header) */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes with Header and layout */}
        <Route
          path="/*"
          element={
            <>
              <Header />
              <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/itinerary" element={<ItineraryBuilder />} />
                  <Route path="/about" element={<About />} />
                </Routes>
              </div>
            </>
          }
        />
      </Routes>
    </Router>
  );
}
