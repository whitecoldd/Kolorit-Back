import { createSlice } from "@reduxjs/toolkit";

export const subcategorySlice = createSlice({
  name: "subcategory",
  initialState: {
    subcategories: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getSubcategoryStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getSubcategorySuccess: (state, action) => {
      state.isFetching = false;
      state.subcategories = action.payload;
    },
    getSubcategoryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteSubcategoryStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteSubcategorySuccess: (state, action) => {
      state.isFetching = false;
      state.subcategories.splice(
        state.subcategories.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteSubcategoryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateSubcategoryStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateSubcategorySuccess: (state, action) => {
      state.isFetching = false;
      state.subcategories[
        state.subcategories.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.subcategory;
    },
    updateSubcategoryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addSubcategoryStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addSubcategorySuccess: (state, action) => {
      state.isFetching = false;
      state.subcategories.push(action.payload);
    },
    addSubcategoryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getSubcategoryStart,
  getSubcategorySuccess,
  getSubcategoryFailure,
  deleteSubcategoryStart,
  deleteSubcategorySuccess,
  deleteSubcategoryFailure,
  updateSubcategoryStart,
  updateSubcategorySuccess,
  updateSubcategoryFailure,
  addSubcategoryStart,
  addSubcategorySuccess,
  addSubcategoryFailure,
} = subcategorySlice.actions;

export default subcategorySlice.reducer;
