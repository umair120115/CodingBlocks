import React, { useState, useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import "../styles/SeatSelection.css";
import Navbar from "./Navbar";
import api from "../api";

function SeatSelector({ rows = 5, columns = 10, onSeatsSelected }) {
  const location = useLocation();
  const { movie } = location.state || {}; // Retrieve movie data

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  // Generate seat numbers dynamically
  const seatNumbers = Array.from({ length: rows * columns }, (_, index) => index + 1);

  // Fetch booked seats from backend
  useEffect(() => {
    if (movie?.id) {
      api
        .get(`/api/booked-seats/${movie.id}/`)
        .then((response) => {
          setBookedSeats(response.data.booked_seats); // Store booked seats in state
        })
        .catch((error) => console.error("Error fetching booked seats:", error));
    }
  }, [movie?.id]);

  // Handle seat selection
  const toggleSeatSelection = (seatNumber) => {
    // Avoid selecting already booked seats
    if (bookedSeats.includes(seatNumber)) {
      alert("This seat is already booked!");
      return;
    }

    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatNumber)
        ? prevSelectedSeats.filter((seat) => seat !== seatNumber) // Deselect if already selected
        : [...prevSelectedSeats, seatNumber] // Add to selected
    );
  };

  // Submit selected seats to backend
  const handleSubmit = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    if (onSeatsSelected) {
      onSeatsSelected(selectedSeats); // Pass selected seats to parent component
    }

    // Optionally, send selected seats to the backend (optional step before confirmation)
    api
      .post("/api/save-booking/", {
        movie_id: movie.id,
        seats: selectedSeats,
        email: "user@example.com", // Replace with actual user email
        amount: selectedSeats.length * movie.prices, // Calculate total amount based on the number of seats
      })
      .then((response) => {
        alert("Booking confirmed!");
        console.log(response.data);
      })
      .catch((error) => {
        alert("Error booking seats: " + error.message);
        console.error("Error booking seats:", error);
      });
  };

  return (
    <>
      <Navbar />
      <div>
        <h2>Select Your Seats for {movie?.movie || "Unknown Movie"}</h2>
        <div className="seat-grid">
          {seatNumbers.map((seatNumber) => (
            <div
              key={seatNumber}
              className={`seat ${selectedSeats.includes(seatNumber) ? "selected" : ""} 
                          ${bookedSeats.includes(seatNumber) ? "booked" : ""}`}
              onClick={() => toggleSeatSelection(seatNumber)}
            >
              {seatNumber}
            </div>
          ))}
        </div>
        <button onClick={handleSubmit} className="submit-button">
          Confirm Selection
        </button>
      </div>
    </>
  );
}

export default SeatSelector;
