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
      fetchingUsers: (state) => {
        state.loading = true;
      },
      loadUsers: (state, action) => {
        const { payload } = action;
        state.loading = false;
        state.list = payload;
      },
    
    },
  });
  