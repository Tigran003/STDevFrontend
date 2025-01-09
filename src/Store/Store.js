import { configureStore } from "@reduxjs/toolkit";
import { MovieDataReducer } from "./Slices/MovieSlice";

const Store = configureStore({
  reducer: {
    MovieData: MovieDataReducer,
  },
});

export default Store;
