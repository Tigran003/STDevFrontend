import { createSlice } from "@reduxjs/toolkit";
import {
  requestGetCurrentRoom,
  requestGetMovieData,
  requestGetOnlyRoom,
  requestGetOnlyRoomMovie,
  requestGetRoomsData,
} from "./API";

const MovieSlice = createSlice({
  name: "MovieData",
  initialState: {
    MoviesDataIsLoading: false,
    MoviesData: [],
    MoviesDataIsError: false,
    MoviesRooms: [],
    MoviesCurrentRoom: [],
    MoviesOnlyRoom: [],
    MoviesOnlyMovie: []
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestGetMovieData.pending, (state) => {
        state.MoviesDataIsLoading = true;
        state.MoviesDataIsError = false;
      })
      .addCase(requestGetMovieData.fulfilled, (state, { payload }) => {
        state.MoviesDataIsLoading = false;
        state.MoviesData = payload;
        state.MoviesDataIsError = false;
      })
      .addCase(requestGetMovieData.rejected, (state) => {
        state.MoviesDataIsLoading = false;
        state.MoviesDataIsError = true;
      })

      .addCase(requestGetRoomsData.fulfilled, (state, { payload }) => {
        state.MoviesRooms = payload;
      })
      .addCase(requestGetCurrentRoom.fulfilled, (state, { payload }) => {
        state.MoviesCurrentRoom = payload;
      })
      .addCase(requestGetOnlyRoom.fulfilled, (state, { payload }) => {
        state.MoviesOnlyRoom = payload;
      })
      .addCase(requestGetOnlyRoomMovie.fulfilled, (state, { payload }) => {
        state.MoviesOnlyMovie = payload;
      });
  },
});

export const selectMovieData = (state) => state.MovieData;
export const MovieDataReducer = MovieSlice.reducer;
