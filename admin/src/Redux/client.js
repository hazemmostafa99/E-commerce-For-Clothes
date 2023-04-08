import { createSlice } from "@reduxjs/toolkit";

const clientSlice = createSlice({
  name: "client",
  initialState: {
    isFetching: false,
    clients: [],
    isError: false,
  },
  reducers: {
    getClientStart: (state) => {
      state.isFetching = true;
    },
    getClientSuccess: (state, action) => {
      state.isFetching = false;
      state.clients = action.payload;
    },
    getClientFailure: (state) => {
      state.isError = true;
    },

    //Delete
    deleteClientStart: (state) => {
      state.isFetching = true;
    },
    deleteClientSuccess: (state, action) => {
      state.isFetching = false;
      state.clients = state.clients.filter(
        (item) => item._id !== action.payload
      );
    },
    deleteClientFailure: (state) => {
      state.isError = true;
    },

    //Update
    updateClientStart: (state) => {
      state.isFetching = true;
    },
    updateClientSuccess: (state, action) => {
      state.isFetching = false;
      state.clients[
        state.clients.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.user;
    },
    updateClientFailure: (state) => {
      state.isError = true;
    },

    //Add
    addClientStart: (state) => {
      state.isFetching = true;
    },
    addClientSuccess: (state, action) => {
      state.isFetching = false;
      state.clients.push(action.payload);
    },
    addClientFailure: (state) => {
      state.isError = true;
    },
  },
});

export const {
  getClientStart,
  getClientSuccess,
  getClientFailure,
  deleteClientStart,
  deleteClientSuccess,
  deleteClientFailure,
  updateClientStart,
  updateClientSuccess,
  updateClientFailure,
  addClientStart,
  addClientSuccess,
  addClientFailure,
} = clientSlice.actions;

export default clientSlice.reducer;
