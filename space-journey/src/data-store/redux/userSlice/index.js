import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    list: [],
    error: null,
    user: null,
  };

  const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
      
    },
  });
  