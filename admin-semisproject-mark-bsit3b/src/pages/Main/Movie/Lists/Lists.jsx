import { useNavigate } from 'react-router-dom';
import './Lists.css'; 
import { useEffect, useState } from 'react';
import axios from 'axios';

const Lists = () => {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const getMovies = async () => {
    try {
      const response = await axios.get('/movies');
      setLists(response.data);
    } catch (error) {
      setError("Error fetching movies");
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const handleDelete = async (id) => {
    const isConfirm = window.confirm('Are you sure that you want to delete this data?');
    if (isConfirm) {
      try {
        await axios.delete(`/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setLists((prevLists) => prevLists.filter((movie) => movie.id !== id));
      } catch (error) {
        console.error("Error deleting movie:", error);
      }
    }
  };

 
  const filteredMovies = lists.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='lists-container'>
      <div className='create-container'>
        <button
          type='button'
          onClick={() => navigate('/main/movies/form')}
        >
          Create new
        </button>
        <input
          type='text'
          placeholder='Search movies...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='search-input'
        />
      </div>
      <div className='table-container'>
        {loading ? (
          <p>Loading movies...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <table className='movie-lists'>
            <thead>
              <tr>
                <th>Poster</th>
                <th>ID</th>
                <th>Title</th>
                <th>Year</th>
                <th>Director</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMovies.length > 0 ? (
                filteredMovies.map((movie, index) => (
                  <tr key={movie.id}>
                    <td>
                      <img 
                        src={movie.posterPath ? movie.posterPath : 'https://via.placeholder.com/50x75'} 
                        alt={movie.title} 
                        className="poster-img" 
                      />
                    </td>
                    <td>{index + 1}</td>
                    <td>{movie.title}</td>
                    <td>{movie.year}</td>
                    <td>{movie.director}</td>
                    <td>
                      <button
                        type='button'
                        className='action-button edit-button'
                        onClick={() => navigate('/main/movies/form/' + movie.id)}
                      >
                        Edit
                      </button>
                      <button
                        type='button'
                        className='action-button delete-button'
                        onClick={() => handleDelete(movie.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No movies found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Lists;
