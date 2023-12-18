import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { petType } from "../types/types";

type propsType = {
  searchText: string;
  selectedType: string;
  selectedPrice: string;
  selectedSort: string;
  pets: Array<petType>;
};

const initialState: propsType = {
  searchText: "",
  selectedType: "All",
  selectedPrice: "All",
  selectedSort: "Recommended",
  pets: [{} as petType],
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setSelectedType: (state, action: PayloadAction<string>) => {
      state.selectedType = action.payload;
    },
    setSelectedPrice: (state, action: PayloadAction<string>) => {
      state.selectedPrice = action.payload;
    },
    setSelectedSort: (state, action: PayloadAction<string>) => {
      state.selectedSort = action.payload;
    },
    setPets: (state, action: PayloadAction<petType[]>) => {
      state.pets = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const {
  setSearchText,
  setSelectedType,
  setSelectedPrice,
  setSelectedSort,
  setPets
} = filterSlice.actions;
