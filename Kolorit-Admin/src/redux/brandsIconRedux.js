import { createSlice } from "@reduxjs/toolkit";

export const brandsIconSlice = createSlice({
  name: "brandsIcon",
  initialState: {
    brandsIcons: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getBrandsIconStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getBrandsIconSuccess: (state, action) => {
      state.isFetching = false;
      state.brandsIcons = action.payload;
    },
    getBrandsIconFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteBrandsIconStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteBrandsIconSuccess: (state, action) => {
      state.isFetching = false;
      state.brandsIcons.splice(
        state.brandsIcons.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteBrandsIconFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateBrandsIconStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateBrandsIconSuccess: (state, action) => {
      state.isFetching = false;
      state.brandsIcons[
        state.brandsIcons.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.brandsIcon;
    },
    updateBrandsIconFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addBrandsIconStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addBrandsIconSuccess: (state, action) => {
      state.isFetching = false;
      state.brandsIcons.push(action.payload);
    },
    addBrandsIconFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getBrandsIconStart,
  getBrandsIconSuccess,
  getBrandsIconFailure,
  deleteBrandsIconStart,
  deleteBrandsIconSuccess,
  deleteBrandsIconFailure,
  updateBrandsIconStart,
  updateBrandsIconSuccess,
  updateBrandsIconFailure,
  addBrandsIconStart,
  addBrandsIconSuccess,
  addBrandsIconFailure,
} = brandsIconSlice.actions;

export default brandsIconSlice.reducer;
