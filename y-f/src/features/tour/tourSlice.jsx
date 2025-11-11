import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const countTour = createAsyncThunk("tourStateCount", async () => {
  const response = await axios.get("/api/v1/tour/countTour");
  console.log(response);
  return response.data.data;
});
export const countUser = createAsyncThunk("userStateCount", async () => {
  const response = await axios.get("/api/v1/tour/countUser");
  console.log(response);
  return response.data.data;
});
export const countBooking = createAsyncThunk("userStateCount", async () => {
  const response = await axios.get("/api/v1/tour/countBooking");
  console.log(response);
  return response.data.data;
});
export const countSumPrice = createAsyncThunk("userStateCount", async () => {
  const response = await axios.get("/api/v1/tour/sunPriceTours");
  console.log(response);
  return response.data.data;
});

export const getTours = createAsyncThunk("getTours", async () => {
  const response = await axios.get("/api/v1/tour");
  console.log(response);
  return response.data.data;
});
export const getTour = createAsyncThunk("getTour", async (info) => {
  const response = await axios.get(`/api/v1/tour/${info}`);
  console.log(response);
  console.log(response.data.data);
  return response.data.data;
});
export const addTour = createAsyncThunk("addTour", async (tripDetails) => {
  const request = await axios.post("api/v1/tour", tripDetails);
  const response = request.data.data;
  return response;
});

export const tourSlice = createSlice({
  name: "tour",
  initialState: {
    loading: false,
    tour: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(countTour.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(countTour.fulfilled, (state, action) => {
        state.loading = false;
        state.tour = action.payload;
      })
      .addCase(countTour.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default tourSlice.reducer;
