import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Form.css";

const MovieForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [moviesFound, setMoviesFound] = useState([]);
  const [chosenMovie, setChosenMovie] = useState(null);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [inputData, setInputData] = useState({
    title: "",
    overview: "",
    popularity: "",
    releaseDate: "",
    voteAverage: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingState, setLoadingState] = useState(false);

  let { movieId } = useParams();
  const navigate = useNavigate();

  const searchMovies = useCallback(() => {
    setErrorMessage("");
    if (!searchTerm) {
      setErrorMessage("Please enter a search term");
      return;
    }

    setLoadingState(true);
    setMoviesFound([]);

    axios({
      method: "get",
      url: `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=${currentPageNum}`,
      headers: {
        Accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTdiNmUyNGJkNWRkNjhiNmE1ZWFjZjgyNWY3NGY5ZCIsIm5iZiI6MTcyOTI5NzI5Ny4wNzMzNTEsInN1YiI6IjY2MzhlZGM0MmZhZjRkMDEzMGM2NzM3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZIX4EF2yAKl6NwhcmhZucxSQi1rJDZiGG80tDd6_9XI",
      },
    })
      .then((response) => {
        if (response.data.results.length === 0) {
          setErrorMessage("No movies found matching your search");
        } else {
          setMoviesFound(response.data.results);
          setPageCount(response.data.total_pages);
        }
      })
      .catch(() => {
        setErrorMessage("Unable to search movies at this time. Please try again later.");
      })
      .finally(() => {
        setLoadingState(false);
      });
  }, [searchTerm, currentPageNum]);

  useEffect(() => {
    if (currentPageNum > 1) {
      searchMovies();
    }
  }, [currentPageNum, searchMovies]);

  const selectMovie = (movie) => {
    setChosenMovie(movie);
    setInputData({
      title: movie.original_title,
      overview: movie.overview,
      popularity: movie.popularity,
      releaseDate: movie.release_date,
      voteAverage: movie.vote_average,
    });
    setErrorMessage("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrorMessage("");
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setCurrentPageNum(1);
      searchMovies();
    }
  };

  const validateInput = () => {
    const validationErrors = [];
    if (!inputData.title) validationErrors.push("Title is required");
    if (!inputData.overview) validationErrors.push("Overview is required");
    if (!inputData.releaseDate) validationErrors.push("Release date is required");
    if (!inputData.popularity) validationErrors.push("Popularity is required");
    if (!inputData.voteAverage) validationErrors.push("Vote average is required");
    if (!chosenMovie) validationErrors.push("Please select a movie from search results");
    return validationErrors;
  };

  const saveMovie = async () => {
    const errors = validateInput();
    if (errors.length > 0) {
      setErrorMessage(errors.join(", "));
      return;
    }

    setLoadingState(true);
    setErrorMessage("");

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setErrorMessage("You must be logged in to perform this action");
      setLoadingState(false);
      return;
    }

    const movieData = {
      tmdbId: chosenMovie.id,
      title: inputData.title,
      overview: inputData.overview,
      popularity: parseFloat(inputData.popularity),
      releaseDate: inputData.releaseDate,
      voteAverage: parseFloat(inputData.voteAverage),
      backdropPath: `https://image.tmdb.org/t/p/original/${chosenMovie.backdrop_path}`,
      posterPath: `https://image.tmdb.org/t/p/original/${chosenMovie.poster_path}`,
      isFeatured: 0,
    };

    try {
      await axios({
        method: movieId ? "patch" : "post",
        url: movieId ? `/movies/${movieId}` : "/movies",
        data: movieData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      navigate("/main/movies");
    } catch (error) {
      const errorMsg = error.response?.data?.message || 
        "Unable to save the movie. Please try again later.";
      setErrorMessage(errorMsg);
    } finally {
      setLoadingState(false);
    }
  };

  const updateMovie = saveMovie;

  useEffect(() => {
    if (movieId) {
      setLoadingState(true);
      setErrorMessage("");

      axios
        .get(`/movies/${movieId}`)
        .then((response) => {
          setCurrentMovie(response.data);
          const tempInputData = {
            id: response.data.tmdbId,
            original_title: response.data.title,
            overview: response.data.overview,
            popularity: response.data.popularity,
            poster_path: response.data.posterPath.replace("https://image.tmdb.org/t/p/original/", ""),
            release_date: response.data.releaseDate,
            vote_average: response.data.voteAverage,
          };
          setChosenMovie(tempInputData);
          setInputData({
            title: response.data.title,
            overview: response.data.overview,
            popularity: response.data.popularity,
            releaseDate: response.data.releaseDate,
            voteAverage: response.data.voteAverage,
          });
        })
        .catch(() => {
          setErrorMessage("Unable to load movie details. Please try again later.");
        })
        .finally(() => {
          setLoadingState(false);
        });
    }
  }, [movieId]);

  return (
    <>
      <h1>{movieId !== undefined ? "Edit" : "Create"} Movie</h1>
   
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {loadingState && <div className="loading-message">Loading...</div>}

      {movieId === undefined && (
        <>
          <div className="search-container">
            Search Movie:{" "}
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setErrorMessage("");
              }}
              onKeyPress={handleEnterPress}
              placeholder="Enter movie title..."
              disabled={loadingState}
            />
            <button
              type="button"
              onClick={() => {
                setCurrentPageNum(1);
                searchMovies();
              }}
              disabled={loadingState || !searchTerm.trim()}
            >
              {loadingState ? "Searching..." : "Search"}
            </button>
            <div className="searched-movie">
              {moviesFound.map((movie) => (
                <p 
                  key={movie.id} 
                  onClick={() => selectMovie(movie)}
                  className={chosenMovie?.id === movie.id ? "selected" : ""}
                >
                  {movie.original_title}
                </p>
              ))}
            </div>
            {pageCount > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setCurrentPageNum((prev) => Math.max(1, prev - 1))}
                  disabled={currentPageNum === 1 || loadingState}
                >
                  Previous
                </button>
                <span>
                  Page {currentPageNum} of {pageCount}
                </span>
                <button
                  onClick={() => setCurrentPageNum((prev) => Math.min(pageCount, prev + 1))}
                  disabled={currentPageNum === pageCount || loadingState}
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
          {chosenMovie && (
            <img
              className="poster-image"
              src={`https://image.tmdb.org/t/p/original/${chosenMovie.poster_path}`}
              alt={inputData.title}
            />
          )}
          <div className="field">
            Title:
            <input
              type="text"
              name="title"
              value={inputData.title}
              onChange={handleChange}
              disabled={loadingState}
              required
            />
          </div>
          <div className="field">
            Overview:
            <textarea
              rows={10}
              name="overview"
              value={inputData.overview}
              onChange={handleChange}
              disabled={loadingState}
              required
            />
          </div>
          <div className="field">
            Popularity:
            <input
              type="number"
              name="popularity"
              value={inputData.popularity}
              onChange={handleChange}
              disabled={loadingState}
              step="0.1"
            />
          </div>
          <div className="field">
            Release Date:
            <input
              type="date"
              name="releaseDate"
              value={inputData.releaseDate}
              onChange={handleChange}
              disabled={loadingState}
              required
            />
          </div>
          <div className="field">
            Vote Average:
            <input
              type="number"
              name="voteAverage"
              value={inputData.voteAverage}
              onChange={handleChange}
              disabled={loadingState}
              step="0.1"
              required
            />
          </div>
          <button onClick={updateMovie} disabled={loadingState}>
            {movieId ? "Update Movie" : "Create Movie"}
          </button>
        </form>
      </div>
    </>
  );
};

export default MovieForm;
