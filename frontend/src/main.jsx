import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import axios from 'axios';
import Profile from './pages/Profile.jsx';
import Channel from './pages/Channel.jsx';
import CreateVideo from './components/CreateVideo.jsx';
import VideoDetails from './pages/VideoDetails.jsx';
import Search from './pages/Search.jsx';

axios.defaults.baseURL = 'https://youtube-replica-internshala.vercel.app';
axios.defaults.withCredentials = true;

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/channel',
        element: <Channel />,
      },
      {
        path: '/create-video',
        element: <CreateVideo />,
      },
      {
        path: '/watch/:id',
        element: <VideoDetails />,
      },
      {
        path: '/search',
        element: <Search />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  </StrictMode>
);
