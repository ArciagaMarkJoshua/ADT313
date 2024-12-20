import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Form.css";


const API_KEY = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5M2Q4YTQwMGVlMzFkMzQ4MGYzNjdlMjk2OGMzODhhZSIsIm5iZiI6MTczMzE1MTAyNS4yNTQwMDAyLCJzdWIiOiI2NzRkYzkzMTc0NzM3NzhiYmQ5YWY3YzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4wKA26LOjYKY3fGsk-zmp0YOvGr7YPfi_IWUf6W7MSE";

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
    isFeatured: false,
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
        Authorization: API_KEY, 
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
        setError(
          "unavaible movies, kindly retry again!."
        );
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
      isFeatured: false,
    });
    setError("");

    fetchMovieDetails(movie.id);
  };

  const fetchMovieDetails = (movieId) => {
    setIsLoading(true);

    const requests = [
      axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
        headers: { Authorization: API_KEY },
      }),
      axios.get(`https://api.themoviedb.org/3/movie/${movieId}/images`, {
        headers: { Authorization: API_KEY },
      }),
      axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
        headers: { Authorization: API_KEY },
      }),
    ];

    Promise.all(requests)
      .then(([creditsResponse, imagesResponse, videosResponse]) => {
        setCastAndCrew(creditsResponse.data.cast);
        setPhotos(imagesResponse.data.backdrops);
        setVideos(videosResponse.data.results);
      })
      .catch((error) => console.error("Error fetching any movie detailess!", error))
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
            isFeatured: response.data.isFeatured || false,
          });
          fetchMovieDetails(response.data.tmdbId);
        })
        .catch(() => {
          setError("unavaible movies, kindly retry again!");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [movieId]);

  const handleInputChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCastChange = (index, field, value) => {
    const updatedCast = [...castAndCrew];
    updatedCast[index][field] = value;
    setCastAndCrew(updatedCast);
  };
  const handlePhotoChange = (index, field, value) => {
    const updatedPhotos = [...photos];
    updatedPhotos[index][field] = value;
    setPhotos(updatedPhotos);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setCurrentPage(1);
      handleSearch();
    }
  };

  const validateForm = () => {
    const errors = [];
    if (!formData.title) errors.push("Title is neeeded");
    if (!formData.overview) errors.push("Overview is needed");
    if (!formData.releaseDate) errors.push("Release date is needed");
    if (!formData.popularity) errors.push("Popularity is needed");
    if (!formData.voteAverage) errors.push("Vote average is needed");
    if (!selectedMovie)
      errors.push("Please select a movie any from search bar results");
    return errors;
  };

  const handleSave = async () => {
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(", "));
      return;
    }

    setIsLoading(true);
    setError("");

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setError("you must log in to acccess this feature!");
      setIsLoading(false);
      return;
    }

    const userId = 1;

    const data = {
      userId: userId,
      tmdbId: selectedMovie.id,
      title: formData.title,
      overview: formData.overview,
      popularity: parseFloat(formData.popularity),
      releaseDate: formData.releaseDate,
      voteAverage: parseFloat(formData.voteAverage),
      backdropPath: `https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`,
      posterPath: `https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`,
      isFeatured: formData.isFeatured,
    };

    try {
      const response = await axios.post("/admin/movies", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const savedMovieId = response.data.id;
      console.log(`Movie with ID ${savedMovieId} has been successfully saved.`); 

      await saveVideos(savedMovieId, videos);
      await saveCast(savedMovieId, castAndCrew);
      await savePhotos(savedMovieId, photos);

      navigate("/main/movies");
    } catch (error) {
      console.error(
        "Error saving movie:",
        error.response?.data || error.message
      );
      setError("Failed to save a movie. Please Retry again.");
    } finally {
      setIsLoading(false);
    }
  };

  const saveVideos = async (movieId, videos) => {
    if (!videos || videos.length === 0) {
      console.log("No videos available to save!.");
      return;
    }
  
    const limitedVideos = videos.slice(0, 2);
  
    const accessToken = localStorage.getItem("accessToken");
    const userId = 1;
  
    try {
      const videoPromises = limitedVideos.map((video) => {
        const videoData = {
          userId: userId,
          movieId: movieId,
          url: `https://www.youtube.com/embed/${video.key}`,
          name: video.name || "Video Title",
          site: "YouTube",
          videoKey: video.key,
          videoType: video.type || "Clip",
          official: 0,
        };
  
        return axios.post("/admin/videos", videoData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      });
  
      await Promise.all(videoPromises);
      console.log("Videos saved successfully");
    } catch (error) {
      console.error(
        "Error saving videos:",
        error.response?.data || error.message
      );
      setError("Failed to save any videos. Please Retry again!");
    }
  };
  

  const saveCast = async (movieId, cast) => {
    if (!cast || cast.length === 0) {
      console.log("No cast available to save!");
      return;
    }
  
 
    const limitedCast = cast.slice(0, 2);
  
    const accessToken = localStorage.getItem("accessToken");
    const userId = 1;
  
    try {
      const castPromises = limitedCast.map((castMember) => {
        if (!castMember.profile_path) {
          throw new Error(`Photo LINK is needed for ${castMember.name}`);
        }
  
        const castData = {
          userId: userId,
          movieId: movieId,
          name: castMember.name,
          characterName: castMember.character,
          url: `https://image.tmdb.org/t/p/original${castMember.profile_path}`,
        };
  
        console.log("Saving cast data:", castData);
  
        return axios.post("/admin/casts", castData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      });
  
      await Promise.all(castPromises);
      console.log("Cast saved successfully");
    } catch (error) {
      console.error(
        "Error saving cast:",
        error.response?.data || error.message
      );
      setError(error.message || "Failed to save any cast. Please Retry again!");
    }
  };
  

  const savePhotos = async (movieId, photos) => {
    if (!photos || photos.length === 0) {
      console.log("No photos available to save.");
      return;
    }
  

    const limitedPhotos = photos.slice(0, 2);
  
    const accessToken = localStorage.getItem("accessToken");
    const userId = 1;
  
    
  try {
    const photoPromises = limitedPhotos.map((photo) => {
      const photoData = {
        userId: userId,
        movieId: movieId,
        url: photo.url, 
        description: photo.description || "",
      };

      return axios.post("/admin/photos", photoData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    });

    await Promise.all(photoPromises);
    console.log("Photos saved successfully");
  } catch (error) {
    console.error(
      "Error saving photos:",
      error.response?.data || error.message
    );
    setError("Failed to save any photos. Please Retry again!");
  }
};

  


  const handleUpdate = handleSave;

  useEffect(() => {
    if (movieId) {
      setIsLoading(true);
      setError("");

      axios
        .get(`/movies/${movieId}`)
        .then((response) => {
          const movieData = response.data;
          setSelectedMovie({
            id: movieData.tmdbId,
            original_title: movieData.title,
            overview: movieData.overview,
            popularity: movieData.popularity,
            poster_path: movieData.posterPath.replace("https://image.tmdb.org/t/p/original/", ""),
            release_date: movieData.releaseDate,
            vote_average: movieData.voteAverage,
          });
          setFormData({
            title: movieData.title,
            overview: movieData.overview,
            popularity: movieData.popularity,
            releaseDate: movieData.releaseDate,
            voteAverage: movieData.voteAverage,
            videos: movieData.videos || [],
            cast: movieData.cast || [],
          });
        })
        .catch(() => {
          setError("Unable to save any movie detailes. Please Retry again later!");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [movieId]);

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
          onChange={(e) => {
            setQuery(e.target.value);
            setError("");<div className="search-container">
  <label htmlFor="movie-search" className="search-label">Search Movie:</label>
  <div className="search-input-container">
    <input
      id="movie-search"
      type="text"
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        setError("");
      }}
      onKeyPress={handleKeyPress}
      placeholder="Enter movie title..."
      disabled={isLoading}
      className="search-input"
    />
    <button
      className="search-button"
      type="button"
      onClick={() => {
        setCurrentPage(1);
        handleSearch();
      }}
      disabled={isLoading || !query.trim()}
    >
      {isLoading ? "Searching..." : "Search"}
    </button>
  </div>
</div>
              }}
              onKeyPress={handleKeyPress}
              placeholder="Enter movie title..."
              disabled={isLoading}
            />
            <button className="search"
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
                  className="pagination-button"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1 || isLoading}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="pagination-button"
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
              {castAndCrew.slice(0, 2).map((castMember, index) => (
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

      <div className="field">
  Photo URL:
  <input
    type="text"
    name="photoUrl"
    value={formData.photoUrl}
    onChange={(e) => handleInputChange(e)}
    disabled={isLoading}
    required
  />
</div>

<div className="field">
  Photo Description:
  <textarea
    name="photoDescription"
    value={formData.photoDescription}
    onChange={(e) => handleInputChange(e)}
    disabled={isLoading}
  />
</div>
{photos.length > 0 && (
  <div className="photo-gallery">
    {photos.slice(0, 2).map((photo, index) => (
      <div key={index} className="photo-item">
        <img
          src={`https://image.tmdb.org/t/p/original${photo.file_path}`}
          alt="Movie Photo"
          className="photo-item"
        />
        <input
          type="text"
          value={photo.description}
          onChange={(e) =>
            handlePhotoChange(index, "description", e.target.value)
          }
          placeholder="Edit photo description"
        />
      </div>
    ))}
  </div>
)}
        <li></li>
        <li></li>
        <li></li>
        <li></li>
          {videos.length > 0 && (
            <div className="video-gallery">
              {videos.slice(0, 2).map((video) => (
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

<div className="button-container">
            <button className="btn-save btn-primary"
              type="button"
              onClick={movieId ? handleUpdate : handleSave}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
            <button className="cancel"
              type="button"
              onClick={() => navigate("/main/movies")}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </ form>
      </div>
    </>
  );
};


export default Form;
