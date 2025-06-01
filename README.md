# 🌍 Travel Itinerary Planning Tool

This project is a dynamic travel planning platform that enables users to map out their travel itinerary day-by-day. It offers essential features like drag-and-drop scheduling, maps, trip detail views, and a simple login/signup experience. The application solves the problem of organizing travel plans in a user-friendly, interactive, and visually clean way.

---

## 📁 Project Type

**Frontend (React + Firebase + Leaflet)**

---

## 🔗 Deployed App

🌐 [Live Site](https://friendly-empanada-b470eb.netlify.app)


---

## ✨ Features

### ✅ Home Page
- Displays an overview of all itineraries
- "Add Itinerary" button
- Simple and responsive layout

### 🗺️ Itinerary Page
- Drag-and-drop activity planner
- Organized by day and location
- Easy to customize your travel plan

### 📍 Map Integration
- Built using Leaflet.js
- Allows user to visualize and select travel destinations

### ℹ️ About Page
- Brief description of the application
- Highlights features and benefits

### 🔐 Login/Signup
- Simple authentication flow (email + password)
- Clean and minimal UI

### 🔁 Add/Edit/Delete Trips
- Add new travel plans with details like destination and dates
- Edit or remove existing plans

---

## 💡 Design Decisions / Assumptions

- **User-Friendly Design**: Aimed to make the user experience simple and intuitive.
- **Responsiveness**: Works well on desktops, tablets, and mobile devices.
- **Single User Focus**: This version is designed for individual trip planning (multi-user collaboration could be added later).
- **Realtime Updates**: Firebase ensures changes reflect immediately.
- **Role Separation (Optional)**: Admin vs normal user logic can be added for extended functionality.

---

## 🧰 Technology Stack

| Technology        | Purpose                                      |
|-------------------|----------------------------------------------|
| **React**         | Component-based frontend                     |
| **Vite**          | Fast bundling and build tool                 |
| **CSS**           | Custom styling for UI                        |
| **Firebase**      | Auth and Realtime Database                   |
| **Axios**         | Firebase CRUD operations (no SDK used)       |
| **Leaflet.js**    | Interactive map for travel planning          |
| **Netlify**       | Hosting and continuous deployment            |

---

## 🚀 Installation & Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/hrishi2108/Travel.git
cd Travel
npm install
npm run dev
