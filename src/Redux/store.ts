import { combineReducers, configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";

const reducers = combineReducers({ favorites: favoritesReducer });

const store = configureStore({
  reducer: reducers,
});

export default store;
