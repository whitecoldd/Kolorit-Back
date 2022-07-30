import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import usersReducer from "./usersRedux";
import productReducer from "./productRedux";
import categoryReducer from "./categoryRedux";
import brandReducer from "./brandRedux";
import sliderReducer from "./sliderRedux";
import contactReducer from "./contactsRedux";
import aboutReducer from "./aboutRedux";
import orderReducer from "./orderRedux";
import articleReducer from "./articleRedux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import {
  getFirebase,
  actionTypes as rrfActionTypes,
} from 'react-redux-firebase'
import { constants as rfConstants } from 'redux-firestore'
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  product: productReducer,
  category: categoryReducer,
  slider: sliderReducer,
  contact: contactReducer,
  about: aboutReducer,
  article: articleReducer,
  order: orderReducer,
  brand: brandReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,...Object.keys(rfConstants.actionTypes).map(
          (type) => `${rfConstants.actionsPrefix}/${type}`
        ),
        ...Object.keys(rrfActionTypes).map(
          (type) => `@@reactReduxFirebase/${type}`
        )],
        ignoredPaths: ['firebase', 'firestore'],
      },
      thunk: {
        extraArgument: {
          getFirebase,
        },
      },
    }),
});

export let persistor = persistStore(store);
