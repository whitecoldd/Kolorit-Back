import { createSlice } from "@reduxjs/toolkit";

export const subSubCategorySlice = createSlice({
  name: "subSubCategory",
  initialState: {
    subSubCategories: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getSubSubCategoryStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getSubSubCategorySuccess: (state, action) => {
      state.isFetching = false;
      state.subSubCategories = action.payload;
    },
    getSubSubCategoryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteSubSubCategoryStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteSubSubCategorySuccess: (state, action) => {
      state.isFetching = false;
      state.subSubCategories.splice(
        state.subSubCategories.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteSubSubCategoryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateSubSubCategoryStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateSubSubCategorySuccess: (state, action) => {
      state.isFetching = false;
      state.subSubCategories[
        state.subSubCategories.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.subSubCategory;
    },
    updateSubSubCategoryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addSubSubCategoryStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addSubSubCategorySuccess: (state, action) => {
      state.isFetching = false;
      state.subSubCategories.push(action.payload);
    },
    addSubSubCategoryFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getSubSubCategoryStart,
  getSubSubCategorySuccess,
  getSubSubCategoryFailure,
  deleteSubSubCategoryStart,
  deleteSubSubCategorySuccess,
  deleteSubSubCategoryFailure,
  updateSubSubCategoryStart,
  updateSubSubCategorySuccess,
  updateSubSubCategoryFailure,
  addSubSubCategoryStart,
  addSubSubCategorySuccess,
  addSubSubCategoryFailure,
} = subSubCategorySlice.actions;

export default subSubCategorySlice.reducer;
