import { Outlet } from 'react-router-dom';

const Movie = () => {
  return (
    <div>
      <h1>Movies</h1>
      {/* This is where the child routes (Lists, Form) will be rendered */}
      <Outlet />
    </div>
  );
};

export default Movie;


