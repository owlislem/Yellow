import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getBookings = createAsyncThunk("getBookings", async (info) => {
  const response = await axios.get(`/api/v1/booking?limit=${info}`);
  console.log(response);
  return response.data.data;
});

export const confirmBooking = createAsyncThunk(
  "confirmBooking",
  async (info) => {
    const request = await axios.patch(`/api/v1/booking/${info}`, {
      status: "Confirmed",
    });
    const response = await request.data.data;
    console.log(response);
    console.log("from axios");
  }
);

export const cancelBooking = createAsyncThunk("cancelBooking", async (info) => {
  const request = await axios.patch(`/api/v1/booking/${info}`, {
    status: "Canceled",
  });
  const response = await request.data.data;
  console.log(response);
  console.log("from axios");
});
export const statsBooking = createAsyncThunk("statsBooking", async () => {
  const response = await axios.get("/api/v1/booking/stats");
  return response.data.data;
});
export const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    loading: false,
    tour: null,
    error: null,
  },
});

export default bookingSlice.reducer;
