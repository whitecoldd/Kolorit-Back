import { createSlice } from "@reduxjs/toolkit";

export const contactSlice = createSlice({
  name: "Contact",
  initialState: {
    contacts: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getContactStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getContactSuccess: (state, action) => {
      state.isFetching = false;
      state.contacts = action.payload;
    },
    getContactFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteContactStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteContactSuccess: (state, action) => {
      state.isFetching = false;
      state.contacts.splice(
        state.contacts.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteContactFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateContactStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateContactSuccess: (state, action) => {
      state.isFetching = false;
      state.contacts[
        state.contacts.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.contact;
    },
    updateContactFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addContactStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addContactSuccess: (state, action) => {
      state.isFetching = false;
      state.contacts.push(action.payload);
    },
    addContactFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getContactStart,
  getContactSuccess,
  getContactFailure,
  deleteContactStart,
  deleteContactSuccess,
  deleteContactFailure,
  updateContactStart,
  updateContactSuccess,
  updateContactFailure,
  addContactStart,
  addContactSuccess,
  addContactFailure,
} = contactSlice.actions;

export default contactSlice.reducer;
