import logo from './logo.svg';
import './App.css';
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import HomePage from "./pages/home/home.jsx";
import { Provider } from "react-redux";
import store from "./data_store/redux/store.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Features from "../src/compnents/features/features.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import Admin from "./pages/admin/admin.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/features" element={<Features />} />
      <Route path="/admin" element={<Admin />} />
     
    </>
  )
);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
