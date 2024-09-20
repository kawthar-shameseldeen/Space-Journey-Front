import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./redux/userSlice/index.js";
import logger from "redux-logger";

const store = configureStore({
    reducer: {
      users: usersReducer,
      
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  });
  export default store;
