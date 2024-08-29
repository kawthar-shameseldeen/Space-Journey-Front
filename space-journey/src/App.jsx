import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import store from './data_store/redux/store.js';
import ProtectedRoute from './components/protectedRoutes/protect.jsx';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import Admin from './pages/admin/admin.jsx';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/home/home.jsx';
import IoTPage from './pages/iot/iot.jsx'
import SpaceJourney from './pages/spaceJourney/spaceJourney.jsx';
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
           <Route
          path="/iot"
          element={
            <ProtectedRoute>
              <IoTPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />
        <Route path="/home" element={<HomePage />} />


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
