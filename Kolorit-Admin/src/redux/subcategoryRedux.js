import { createSlice } from "@reduxjs/toolkit";

export const subCategorySlice = createSlice({
  name: "subCategory",
  initialState: {
    subCategories: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getSubCategoryStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getSubCategorySuccess: (state, action) => {
      state.isFetching = false;
      state.subCategories = action.payload;
    },
    getSubCategoryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteSubCategoryStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteSubCategorySuccess: (state, action) => {
      state.isFetching = false;
      state.subCategories.splice(
        state.subCategories.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteSubCategoryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateSubCategoryStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateSubCategorySuccess: (state, action) => {
      state.isFetching = false;
      state.subCategories[
        state.subCategories.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.subCategory;
    },
    updateSubCategoryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addSubCategoryStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addSubCategorySuccess: (state, action) => {
      state.isFetching = false;
      state.subCategories.push(action.payload);
    },
    addSubCategoryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getSubCategoryStart,
  getSubCategorySuccess,
  getSubCategoryFailure,
  deleteSubCategoryStart,
  deleteSubCategorySuccess,
  deleteSubCategoryFailure,
  updateSubCategoryStart,
  updateSubCategorySuccess,
  updateSubCategoryFailure,
  addSubCategoryStart,
  addSubCategorySuccess,
  addSubCategoryFailure,
} = subCategorySlice.actions;

export default subCategorySlice.reducer;
