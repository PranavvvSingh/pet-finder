import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../features/filters";
import favoritesReducer from "../features/favorites";
import authReducer from "../features/auth";

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    favorites: favoritesReducer,
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
