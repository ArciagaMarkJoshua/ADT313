import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Login from './pages/Public/Login/Login';
import Register from './pages/Public/Login/Register'; // Ensure this path is correct
import Dashboard from './pages/Main/Dashboard/Dashboard';
import Main from './pages/Main/Main';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/register', // Correct route for registration
    element: <Register />,
  },
  {
    path: '/main',
    element: <Main />,
    children: [
      {
        path: '/main/dashboard',
        element: <Dashboard />,
      },
    ],
  },
]);

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
