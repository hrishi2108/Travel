import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Create custom marker icons (ES module style)
const iconRetinaUrl = new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href;
const iconUrl = new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href;
const shadowUrl = new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href;

const icon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

const styles = {
  container: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "30px 25px",
    backgroundColor: "#fefefe",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.05)",
    borderRadius: "12px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  mapContainer: {
    height: "400px",
    width: "100%",
    marginTop: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  },
  input: {
    padding: "8px",
    marginRight: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "8px 15px",
    borderRadius: "6px",
    backgroundColor: "#2980b9",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  destinationItem: (active) => ({
    marginBottom: "15px",
    padding: "10px",
    borderRadius: "8px",
    backgroundColor: active ? "#d6eaf8" : "#ecf0f1",
    cursor: "pointer",
  }),
  activityItem: {
    backgroundColor: "#f0f3f5",
    marginTop: "6px",
    padding: "6px 10px",
    borderRadius: "6px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteBtn: {
    marginLeft: "10px",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    padding: "4px 8px",
  },
  addActivityForm: {
    marginTop: "8px",
    display: "flex",
    gap: "8px",
  },
};

const FIREBASE_URL =
  "https://todo-c6b49-default-rtdb.firebaseio.com/itineraries.json";

export default function ItineraryBuilder() {
  const [destinations, setDestinations] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [activeDestinationId, setActiveDestinationId] = useState(null);
  const [activityText, setActivityText] = useState("");
  const [markers, setMarkers] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([20, 0]);

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  // Fetch destinations from Firebase on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(FIREBASE_URL);
        const data = await response.json();
        if (data) {
          const loadedDestinations = [];
          for (let key in data) {
            loadedDestinations.push({ id: key, ...data[key] });
          }
          setDestinations(loadedDestinations);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Initialize Leaflet map
  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      const map = L.map(mapRef.current).setView(selectedLocation, 2);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Geocode destinations and add markers to the map
  useEffect(() => {
    if (!mapInstanceRef.current || destinations.length === 0) return;

    // Clear existing markers
    markersRef.current.forEach(marker => {
      marker.remove();
    });
    markersRef.current = [];

    const newMarkers = [];
    const geocodePromises = destinations.map(dest => {
      if (!dest.name) return Promise.resolve(null);

      return fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(dest.name)}`)
        .then(response => response.json())
        .then(data => {
          if (data && data.length > 0) {
            const location = {
              id: dest.id,
              position: [parseFloat(data[0].lat), parseFloat(data[0].lon)],
              name: dest.name
            };
            newMarkers.push(location);
            return location;
          }
          return null;
        })
        .catch(error => {
          console.warn(`Geocode failed for ${dest.name}:`, error);
          return null;
        });
    });

    Promise.all(geocodePromises).then(() => {
      setMarkers(newMarkers);
      
      // Add markers to the map
      newMarkers.forEach(markerData => {
        if (markerData) {
          const marker = L.marker(markerData.position, { icon })
            .addTo(mapInstanceRef.current)
            .bindPopup(markerData.name);
          
          marker.on('click', () => {
            setActiveDestinationId(markerData.id);
          });
          
          markersRef.current.push(marker);
        }
      });

      if (newMarkers.length > 0 && !selectedLocation) {
        setSelectedLocation(newMarkers[0].position);
      }
    });
  }, [destinations]);

  // Center map when selected location changes
  useEffect(() => {
    if (mapInstanceRef.current && selectedLocation) {
      mapInstanceRef.current.setView(selectedLocation, 10);
    }
  }, [selectedLocation]);

  // Add destination handler
  const handleAddDestination = async (e) => {
    e.preventDefault();
    if (!name.trim() || !date) {
      alert("Please enter destination name and date");
      return;
    }
    const newDestination = {
      name: name.trim(),
      date,
      notes: notes.trim(),
      activities: [],
    };
    try {
      const response = await fetch(FIREBASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDestination),
      });
      const data = await response.json();
      setDestinations((prev) => [...prev, { id: data.name, ...newDestination }]);
      setName("");
      setDate("");
      setNotes("");
    } catch (error) {
      console.error("Error saving destination:", error);
    }
  };

  // Delete destination handler
  const handleDeleteDestination = async (id) => {
    if (!window.confirm("Are you sure you want to delete this destination?")) return;
    try {
      await fetch(
        `https://todo-c6b49-default-rtdb.firebaseio.com/itineraries/${id}.json`,
        { method: "DELETE" }
      );
      setDestinations((prev) => prev.filter((dest) => dest.id !== id));
      if (activeDestinationId === id) setActiveDestinationId(null);
    } catch (error) {
      console.error("Error deleting destination:", error);
    }
  };

  // Add activity to active destination
  const handleAddActivity = async (e) => {
    e.preventDefault();
    if (!activityText.trim()) {
      alert("Please enter an activity");
      return;
    }
    if (!activeDestinationId) {
      alert("Please select a destination first");
      return;
    }
    const destination = destinations.find((d) => d.id === activeDestinationId);
    if (!destination) return;

    const updatedActivities = [...(destination.activities || []), activityText.trim()];

    const updatedDestination = { ...destination, activities: updatedActivities };

    try {
      await fetch(
        `https://todo-c6b49-default-rtdb.firebaseio.com/itineraries/${activeDestinationId}.json`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedDestination),
        }
      );
      setDestinations((prev) =>
        prev.map((d) => (d.id === activeDestinationId ? updatedDestination : d))
      );
      setActivityText("");
    } catch (error) {
      console.error("Error adding activity:", error);
    }
  };

  // Delete activity from active destination
  const handleDeleteActivity = async (activityIndex) => {
    if (!activeDestinationId) return;

    const destination = destinations.find((d) => d.id === activeDestinationId);
    if (!destination) return;

    const updatedActivities = destination.activities.filter(
      (_, index) => index !== activityIndex
    );
    const updatedDestination = { ...destination, activities: updatedActivities };

    try {
      await fetch(
        `https://todo-c6b49-default-rtdb.firebaseio.com/itineraries/${activeDestinationId}.json`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedDestination),
        }
      );
      setDestinations((prev) =>
        prev.map((d) => (d.id === activeDestinationId ? updatedDestination : d))
      );
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };

  // Clicking destination: set active & center map on it
  const onDestinationClick = (id) => {
    setActiveDestinationId(id);
    const marker = markers.find((m) => m.id === id);
    if (marker && mapInstanceRef.current) {
      setSelectedLocation(marker.position);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Travel Itinerary Builder with Leaflet Map</h2>

      {/* Add Destination Form */}
      <form onSubmit={handleAddDestination} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Destination Name (e.g., Paris)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Add Destination
        </button>
      </form>

      {/* Destinations list */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {destinations.map(({ id, name, date, notes, activities }) => (
          <li
            key={id}
            style={styles.destinationItem(id === activeDestinationId)}
          >
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
              <div
                onClick={() => onDestinationClick(id)}
                title="Click to locate on map"
                style={{ flexGrow: 1, cursor: "pointer" }}
              >
                <strong>{name}</strong> - {date}
                {notes && <p style={{ margin: "5px 0 0" }}>{notes}</p>}
              </div>
              <button
                onClick={() => handleDeleteDestination(id)}
                style={styles.deleteBtn}
                title="Delete destination"
              >
                Delete
              </button>
            </div>

            {/* Show activities if this destination is active */}
            {id === activeDestinationId && (
              <div>
                {activities && activities.length > 0 ? (
                  activities.map((activity, index) => (
                    <div key={index} style={styles.activityItem}>
                      <span>{activity}</span>
                      <button
                        onClick={() => handleDeleteActivity(index)}
                        style={styles.deleteBtn}
                        title="Delete activity"
                      >
                        Delete
                      </button>
                    </div>
                  ))
                ) : (
                  <p style={{ fontStyle: "italic" }}>No activities added.</p>
                )}

                {/* Add activity form */}
                <form onSubmit={handleAddActivity} style={styles.addActivityForm}>
                  <input
                    type="text"
                    placeholder="New activity"
                    value={activityText}
                    onChange={(e) => setActivityText(e.target.value)}
                    style={{ flexGrow: 1, ...styles.input }}
                  />
                  <button type="submit" style={styles.button}>
                    Add Activity
                  </button>
                </form>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Leaflet Map */}
      <div 
        ref={mapRef} 
        style={styles.mapContainer}
      />
    </div>
  );
}