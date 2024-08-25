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
   <Provider store={store}>
     <div className="App">
     <ToastContainer position="top-right" />
     <RouterProvider router={router} />
     
    </div>
   </Provider>
  );
}


export default App;
