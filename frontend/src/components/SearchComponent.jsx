import React, { useState, useEffect } from "react";
import api from "../api";
import MovieCard from "./MovieCard";
import '../styles/card.css'
import Navbar from "./Navbar";

function SearchComponent() {
  const [searchDate, setSearchDate] = useState("");
  const [searchName, setSearchName] = useState("");
  const [name, setName] = useState([]);
  const [date, setDate] = useState([]);

  const handleSearchByDate = async () => {
    try {
      const res = await api.get(`/movie/movies_list/?movie=&date=${searchDate}`);
      setDate(res.data);
    } catch (error) {
      console.error("Error fetching movies by date:", error);
    }
  };

  const handleSearchByName = async () => {
    try {
      const res = await api.get(`/movie/movies_list/?movie=${searchName}&date=`);
      setName(res.data);
    } catch (error) {
      console.error("Error fetching movies by name:", error);
    }
  };

  return (
    <>
    <Navbar/>
      <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
        <h2>Search Movies</h2>

        {/* Search by Date */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="search-date" style={{ display: "block", marginBottom: "8px" }}>
            Search by Date
          </label>
          <input
            id="search-date"
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            style={{
              padding: "10px",
              fontSize: "16px",
              width: "100%",
              boxSizing: "border-box",
              marginBottom: "8px",
            }}
          />
          <button
            onClick={handleSearchByDate}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Search by Date
          </button>
        </div>

        {/* Search by Name */}
        <div>
          <label htmlFor="search-name" style={{ display: "block", marginBottom: "8px" }}>
            Search by Name
          </label>
          <input
            id="search-name"
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Enter movie name"
            style={{
              padding: "10px",
              fontSize: "16px",
              width: "100%",
              boxSizing: "border-box",
              marginBottom: "8px",
            }}
          />
          <button
            onClick={handleSearchByName}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Search by Name
          </button>
        </div>
      </div>

      {/* Render Results */}
      <div className="movie-container">
        <h3>Search result by Name</h3>
        {name.length>0 ?(
            name.map((movie)=><MovieCard key={movie.id} movie={movie}/>)
        ): (
            <p>No results found for the given name.</p>
        )}
    </div>
      
      <div className="movie-container">
        <h3>Search Results by Date</h3>
        {date.length > 0 ? (
          date.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p>No results found for the given date.</p>
        )}
      </div>
    </>
  );
}

export default SearchComponent;
