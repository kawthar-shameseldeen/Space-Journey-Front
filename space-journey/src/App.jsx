import logo from './logo.svg';
import './App.css';
import React from 'react';
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import HomePage from "./pages/home/home.jsx";
import { Provider } from "react-redux";
import store from "./data_store/redux/store.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Features from "../src/components/features/features.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/navbar/navbar.jsx";
import Admin from "./pages/admin/admin.jsx";
import AboutUs from './components/aboutus/aboutus.jsx';
import IoTPage from './pages/iot/iot.jsx';
import Navbar from './components/navbar/navbar.jsx';
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/features" element={<Features />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/iot" element={<IoTPage />} />
      
     
    </>
  )
);

function App() {
  return (
   <Provider store={store}>
     <div className="App">
     <ToastContainer position="top-right" />
     <RouterProvider router={router} />
     
    </div>
   </Provider>
  );
}


export default App;
