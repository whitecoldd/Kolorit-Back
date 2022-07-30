import { createSlice } from "@reduxjs/toolkit";

export const aboutSlice = createSlice({
  name: "about",
  initialState: {
    abouts: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getAboutStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getAboutSuccess: (state, action) => {
      state.isFetching = false;
      state.abouts = action.payload;
    },
    getAboutFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteAboutStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteAboutSuccess: (state, action) => {
      state.isFetching = false;
      state.abouts.splice(
        state.abouts.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteAboutFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateAboutStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateAboutSuccess: (state, action) => {
      state.isFetching = false;
      state.abouts[
        state.abouts.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.about;
    },
    updateAboutFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addAboutStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addAboutSuccess: (state, action) => {
      state.isFetching = false;
      state.abouts.push(action.payload);
    },
    addAboutFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getAboutStart,
  getAboutSuccess,
  getAboutFailure,
  deleteAboutStart,
  deleteAboutSuccess,
  deleteAboutFailure,
  updateAboutStart,
  updateAboutSuccess,
  updateAboutFailure,
  addAboutStart,
  addAboutSuccess,
  addAboutFailure,
} = aboutSlice.actions;

export default aboutSlice.reducer;
