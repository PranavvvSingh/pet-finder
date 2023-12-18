import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { partialPetsType } from "../types/types";

type initialStateType = {
  collection: partialPetsType[];
};
const initialState: initialStateType ={
    collection: []
}

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<partialPetsType>) => {
      state.collection.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.collection = state.collection.filter(
        (item: partialPetsType) => item.id !== action.payload
      );
    },
    set: (state, action) => {
      state.collection = action.payload;
    },
  },
});

export default favoritesSlice.reducer;
export const { add, remove, set } = favoritesSlice.actions;
