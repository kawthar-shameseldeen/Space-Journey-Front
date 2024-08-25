import logo from './logo.svg';
import './App.css';
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import HomePage from "./pages/home/home.jsx";
import { Provider } from "react-redux";
import store from "./data_store/redux/store.js";
import { ToastContainer } from "react-toastify";

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
