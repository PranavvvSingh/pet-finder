import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Session } from "@supabase/gotrue-js/src/lib/types";

type propsType={
  user: Session|null
}
const initialState:propsType ={
  user: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Session>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export default authSlice.reducer;
export const { login, logout} = authSlice.actions;
