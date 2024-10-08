import React from 'react';
import { Provider } from 'react-redux';

// import {
//   createBrowserRouter,
//   RouterProvider,
//   Route,
//   createRoutesFromElements,
// } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';
import store from './data_store/store.js';
import Login from './pages/login/login.jsx';
import Admin from './pages/users/users.jsx'
import DeviceStatus from './pages/devices/devices.jsx';
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
       
       
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<Admin />} />
        <Route path="/devices" element={<DeviceStatus />} />
        
       


      </>
    )
  );

  return (
    <Provider store={store}>
      <ToastContainer />
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
