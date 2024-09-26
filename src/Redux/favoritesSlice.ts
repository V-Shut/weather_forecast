import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, Place } from "../types";

interface FavoritesState {
  favorites: Place[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Place>) => {
      if (
        state.favorites.some(
          (item) => JSON.stringify(item) === JSON.stringify(action.payload)
        )
      ) {
        return;
      }

      state.favorites.push(action.payload);
    },
  },
});

export const { addToFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
