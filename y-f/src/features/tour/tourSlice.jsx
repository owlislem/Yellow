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
