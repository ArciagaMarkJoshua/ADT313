import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Form.css";

const Form = () => {
  const [query, setQuery] = useState("");
  const [searchedMovieList, setSearchedMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(undefined);
  const [movie, setMovie] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    overview: "",
    popularity: "",
    releaseDate: "",
    voteAverage: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [castAndCrew, setCastAndCrew] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);

  let { movieId } = useParams();
  const navigate = useNavigate();

  const handleSearch = useCallback(() => {
    setError("");
    if (!query) {
      setError("Please enter a search term");
      return;
    }

    setIsLoading(true);
    setSearchedMovieList([]);

    axios({
      method: "get",
      url: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${currentPage}`,
      headers: {
        Accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTdiNmUyNGJkNWRkNjhiNmE1ZWFjZjgyNWY3NGY5ZCIsIm5iZiI6MTcyOTI5NzI5Ny4wNzMzNTEsInN1YiI6IjY2MzhlZGM0MmZhZjRkMDEzMGM2NzM3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZIX4EF2yAKl6NwhcmhZucxSQi1rJDZiGG80tDd6_9XI", // Replace with your actual API key
      },
    })
      .then((response) => {
        if (response.data.results.length === 0) {
          setError("No movies found matching your search");
        } else {
          setSearchedMovieList(response.data.results);
          setTotalPages(response.data.total_pages);
        }
      })
      .catch(() => {
        setError("Unable to search movies at this time. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, currentPage]);

  useEffect(() => {
    if (currentPage > 1) {
      handleSearch();
    }
  }, [currentPage, handleSearch]);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setFormData({
      title: movie.original_title,
      overview: movie.overview,
      popularity: movie.popularity,
      releaseDate: movie.release_date,
      voteAverage: movie.vote_average,
    });
    setError("");

    
    fetchMovieDetails(movie.id);
  };

  const fetchMovieDetails = (movieId) => {
    setIsLoading(true);

   
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
        headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTdiNmUyNGJkNWRkNjhiNmE1ZWFjZjgyNWY3NGY5ZCIsIm5iZiI6MTcyOTI5NzI5Ny4wNzMzNTEsInN1YiI6IjY2MzhlZGM0MmZhZjRkMDEzMGM2NzM3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZIX4EF2yAKl6NwhcmhZucxSQi1rJDZiGG80tDd6_9XI" }, // Ensure this API key is correct
      })
      .then((response) => setCastAndCrew(response.data.cast))
      .catch((error) => console.error("Error fetching cast and crew", error));

    
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/images`, {
        headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTdiNmUyNGJkNWRkNjhiNmE1ZWFjZjgyNWY3NGY5ZCIsIm5iZiI6MTcyOTI5NzI5Ny4wNzMzNTEsInN1YiI6IjY2MzhlZGM0MmZhZjRkMDEzMGM2NzM3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZIX4EF2yAKl6NwhcmhZucxSQi1rJDZiGG80tDd6_9XI" }, 
      })
      .then((response) => setPhotos(response.data.backdrops))
      .catch((error) => console.error("Error fetching photos", error));

    
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
        headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTdiNmUyNGJkNWRkNjhiNmE1ZWFjZjgyNWY3NGY5ZCIsIm5iZiI6MTcyOTI5NzI5Ny4wNzMzNTEsInN1YiI6IjY2MzhlZGM0MmZhZjRkMDEzMGM2NzM3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZIX4EF2yAKl6NwhcmhZucxSQi1rJDZiGG80tDd6_9XI" }, 
      })
      .then((response) => setVideos(response.data.results))
      .catch((error) => console.error("Error fetching videos", error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (movieId) {
      setIsLoading(true);
      setError("");

      axios
        .get(`/movies/${movieId}`)
        .then((response) => {
          setMovie(response.data);
          const tempData = {
            id: response.data.tmdbId,
            original_title: response.data.title,
            overview: response.data.overview,
            popularity: response.data.popularity,
            poster_path: response.data.posterPath.replace(
              "https://image.tmdb.org/t/p/original/",
              ""
            ),
            release_date: response.data.releaseDate,
            vote_average: response.data.voteAverage,
          };
          setSelectedMovie(tempData);
          setFormData({
            title: response.data.title,
            overview: response.data.overview,
            popularity: response.data.popularity,
            releaseDate: response.data.releaseDate,
            voteAverage: response.data.voteAverage,
          });
          fetchMovieDetails(response.data.tmdbId); 
        })
        .catch(() => {
          setError("Unable to load movie details. Please try again later.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [movieId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCastChange = (index, field, value) => {
    const updatedCast = [...castAndCrew];
    updatedCast[index][field] = value;
    setCastAndCrew(updatedCast);
  };

  const handleSave = () => {
    if (!formData.title) {
      setError("Movie title is required!");
      return;
    }
  
    setError(""); // Clear any error messages
  
    // If editing an existing movie
    if (selectedMovie) {
      const index = searchedMovieList.findIndex(
        (movie) => movie.id === selectedMovie.id
      );
  
      if (index !== -1) {
        const updatedList = [...searchedMovieList];
        updatedList[index] = {
          ...selectedMovie,
          original_title: formData.title,
          overview: formData.overview,
          popularity: formData.popularity,
          release_date: formData.releaseDate,
          vote_average: formData.voteAverage,
        };
        setSearchedMovieList(updatedList);
        setSelectedMovie(updatedList[index]); // Update selectedMovie with the new data
      }
    } else {
      // If adding a new movie
      const newMovie = {
        id: Date.now(), // Unique ID for the new movie
        original_title: formData.title,
        overview: formData.overview,
        popularity: formData.popularity,
        release_date: formData.releaseDate,
        vote_average: formData.voteAverage,
      };
      setSearchedMovieList((prevList) => [...prevList, newMovie]);
      setSelectedMovie(newMovie); // Set the new movie as the selected one
    }
  
    console.log("Movie saved successfully:", formData);
  };
  
  
  return (
    <>
      <h1>{movieId !== undefined ? "Edit" : "Create"} Movie</h1>
   
      {error && <div className="error-message">{error}</div>}
      {isLoading && <div className="loading-message">Loading...</div>}

      {movieId === undefined && (
        <>
          <div className="search-container">
            Search Movie:{" "}
            <input
              type="text"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setError("");
              }}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Enter movie title..."
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => {
                setCurrentPage(1);
                handleSearch();
              }}
              disabled={isLoading || !query.trim()}
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
            <div className="searched-movie">
              {searchedMovieList.map((movie) => (
                <p
                  key={movie.id}
                  onClick={() => handleSelectMovie(movie)}
                  className={selectedMovie?.id === movie.id ? "selected" : ""}
                >
                  {movie.original_title}
                </p>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1 || isLoading}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages || isLoading}
                >
                  Next
                </button>
              </div>
            )}
          </div>
          <hr />
        </>
      )}

      <div className="container">
        <form onSubmit={(e) => e.preventDefault()}>
          {selectedMovie && (
            <img
              className="poster-image"
              src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}
              alt={formData.title}
            />
          )}
          <div className="field">
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              disabled={isLoading}
              required
            />
          </div>
          <div className="field">
            Overview:
            <textarea
              name="overview"
              value={formData.overview}
              onChange={handleInputChange}
              disabled={isLoading}
              required
            />
          </div>
          <div className="field">
            Popularity:
            <input
              type="text"
              name="popularity"
              value={formData.popularity}
              onChange={handleInputChange}
              disabled={isLoading}
              required
            />
          </div>
          <div className="field">
            Release Date:
            <input
              type="text"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleInputChange}
              disabled={isLoading}
              required
            />
          </div>
          <div className="field">
            Vote Average:
            <input
              type="text"
              name="voteAverage"
              value={formData.voteAverage}
              onChange={handleInputChange}
              disabled={isLoading}
              required
            />
          </div>

        
          {castAndCrew.length > 0 && (
            <ul>
              {castAndCrew.slice(0, 3).map((castMember, index) => (
                <li key={castMember.cast_id}>
                  {castMember.profile_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/original${castMember.profile_path}`}
                      alt={castMember.name}
                      className="cast-photo"
                    />
                  )}
                  <input
                    type="text"
                    value={castMember.name}
                    onChange={(e) =>
                      handleCastChange(index, "name", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    value={castMember.character}
                    onChange={(e) =>
                      handleCastChange(index, "character", e.target.value)
                    }
                  />
                </li>
              ))}
            </ul>
          )}

      
          {photos.length > 0 && (
            <div className="photo-gallery">
              {photos.slice(0, 5).map((photo) => (
                <img
                  key={photo.file_path}
                  src={`https://image.tmdb.org/t/p/original${photo.file_path}`}
                  alt="Movie Photo"
                  className="photo-item"
                />
              ))}
            </div>
          )}

        
          {videos.length > 0 && (
            <div className="video-gallery">
              {videos.slice(0, 5).map((video) => (
                <iframe
                  key={video.id}
                  width="300"
                  height="315"
                  src={`https://www.youtube.com/embed/${video.key}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ))}
            </div>
          )}

          <div className="field">
            <button
              type="submit"
              onClick={handleSave}
              disabled={isLoading || !formData.title}
            >
              {isLoading ? "Saving..." : "Update Movie"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
