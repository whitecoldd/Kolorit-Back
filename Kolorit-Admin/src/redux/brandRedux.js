import { createSlice } from "@reduxjs/toolkit";

export const brandSlice = createSlice({
  name: "brand",
  initialState: {
    brands: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getBrandStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getBrandSuccess: (state, action) => {
      state.isFetching = false;
      state.brands = action.payload;
    },
    getBrandFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteBrandStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteBrandSuccess: (state, action) => {
      state.isFetching = false;
      state.brands.splice(
        state.brands.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteBrandFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateBrandStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateBrandSuccess: (state, action) => {
      state.isFetching = false;
      state.brands[
        state.brands.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.brand;
    },
    updateBrandFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addBrandStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addBrandSuccess: (state, action) => {
      state.isFetching = false;
      state.brands.push(action.payload);
    },
    addBrandFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getBrandStart,
  getBrandSuccess,
  getBrandFailure,
  deleteBrandStart,
  deleteBrandSuccess,
  deleteBrandFailure,
  updateBrandStart,
  updateBrandSuccess,
  updateBrandFailure,
  addBrandStart,
  addBrandSuccess,
  addBrandFailure,
} = brandSlice.actions;

export default brandSlice.reducer;
