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

import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/home/home.jsx';
import IoTPage from './pages/iot/iot.jsx'
import SpaceTour from './pages/space/space.jsx';
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
               {/* <Route
          path="/space"
          element={
            <ProtectedRoute>
              <SpaceTour />
            </ProtectedRoute>
          }
        /> */}
      
       
        <Route path="/" element={<HomePage />} />
        <Route path="/space" element={<SpaceTour />} />
       


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
