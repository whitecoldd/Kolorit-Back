import { createSlice } from "@reduxjs/toolkit";

export const articleSlice = createSlice({
  name: "article",
  initialState: {
    articles: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getArticleStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getArticleSuccess: (state, action) => {
      state.isFetching = false;
      state.articles = action.payload;
    },
    getArticleFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteArticleStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteArticleSuccess: (state, action) => {
      state.isFetching = false;
      state.articles.splice(
        state.articles.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteArticleFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateArticleStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateArticleSuccess: (state, action) => {
      state.isFetching = false;
      state.articles[
        state.articles.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.article;
    },
    updateArticleFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addArticleStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addArticleSuccess: (state, action) => {
      state.isFetching = false;
      state.articles.push(action.payload);
    },
    addArticleFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getArticleStart,
  getArticleSuccess,
  getArticleFailure,
  deleteArticleStart,
  deleteArticleSuccess,
  deleteArticleFailure,
  updateArticleStart,
  updateArticleSuccess,
  updateArticleFailure,
  addArticleStart,
  addArticleSuccess,
  addArticleFailure,
} = articleSlice.actions;

export default articleSlice.reducer;
