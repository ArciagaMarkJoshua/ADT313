import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Dashboard.css';  

const Dashboard = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("/movies");  
        setMovies(response.data);
      } catch (error) {
        setError("Error fetching movies");
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Movies Dashboard</h1>
      {loading ? (
        <div className="loading-message">Loading movies...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <div className="movies-count">
            <h1>Total Movies: {movies.length}</h1> 
            <button
        type="button"
        onClick={() => navigate('/main/movies')}
        className="view-movies-button"
      >
        View All Movies
      </button>
          </div>
          <div className="movies-list">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <div className="movie-item" key={movie.id}>
                  <img 
                    src={movie.posterPath ? movie.posterPath : 'https://via.placeholder.com/150x200'} 
                    alt={movie.title} 
                    className="movie-poster"
                  />
                  <h4 className="movie-title">{movie.title}</h4>
                </div>
              ))
            ) : (
              <p>No movies available.</p>
            )}
          </div>
        </>
      )}
     
    </div>
  );
};

export default Dashboard;
