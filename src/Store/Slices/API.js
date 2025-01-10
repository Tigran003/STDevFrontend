import axios from "axios";
import { api_url } from "../../URL/URL";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const requestGetMovieData = createAsyncThunk(
  "MovieData/requestGetMovieData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api_url}/movie/`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const requestGetRoomsData = createAsyncThunk(
  "MovieData/requestGetRoomsData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api_url}/rooms/`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const requestGetCurrentRoom = createAsyncThunk(
  "MovieData/requestGetCurrentRoom",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api_url}/schedule/?room=${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const requestGetOnlyRoom = createAsyncThunk(
  "MovieData/requestGetOnlyRoom",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api_url}/rooms/${id}/`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const requestGetOnlyRoomMovie = createAsyncThunk(
  "MovieData/requestGetOnlyRoomMovie",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api_url}/movie/?id=${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const requestPostRoomMovieSeat = createAsyncThunk(
  "MovieData/requestPostRoomMovieSeat",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${api_url}/seat/`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const requestGetCurrentMovieSeats = createAsyncThunk(
  "MovieData/requestGetCurrentMovieSeats",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api_url}/seat/?schedule=${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
