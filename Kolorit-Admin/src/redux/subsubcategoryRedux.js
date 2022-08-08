import { createSlice } from "@reduxjs/toolkit";

export const subsubcategorySlice = createSlice({
  name: "subsubcategory",
  initialState: {
    subsubcategories: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getSubsubcategoryStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getSubsubcategorySuccess: (state, action) => {
      state.isFetching = false;
      state.subsubcategories = action.payload;
    },
    getSubsubcategoryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteSubsubcategoryStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteSubsubcategorySuccess: (state, action) => {
      state.isFetching = false;
      state.subsubcategories.splice(
        state.subsubcategories.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteSubsubcategoryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateSubsubcategoryStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateSubsubcategorySuccess: (state, action) => {
      state.isFetching = false;
      state.subsubcategories[
        state.subsubcategories.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.subsubcategory;
    },
    updateSubsubcategoryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addSubsubcategoryStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addSubsubcategorySuccess: (state, action) => {
      state.isFetching = false;
      state.subsubcategories.push(action.payload);
    },
    addSubsubcategoryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getSubsubcategoryStart,
  getSubsubcategorySuccess,
  getSubsubcategoryFailure,
  deleteSubsubcategoryStart,
  deleteSubsubcategorySuccess,
  deleteSubsubcategoryFailure,
  updateSubsubcategoryStart,
  updateSubsubcategorySuccess,
  updateSubsubcategoryFailure,
  addSubsubcategoryStart,
  addSubsubcategorySuccess,
  addSubsubcategoryFailure,
} = subsubcategorySlice.actions;

export default subsubcategorySlice.reducer;
