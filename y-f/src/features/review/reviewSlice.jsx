import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getReviewsInTour = createAsyncThunk("getReviews", async (info) => {
  console.log(info);
  const response = await axios.get(
    `/api/v1/review?tour=${info}&accepted=false`
  );
  console.log(response);
  return response.data.data;
});

export const getReviews = createAsyncThunk("getReviews", async () => {
  const response = await axios.get(`/api/v1/review?accepted=true`);
  console.log(response);
  return response.data.data;
});
export const getReviewsAll = createAsyncThunk("getReviews", async (info) => {
  const response = await axios.get(`/api/v1/review?limit=${info}`);
  console.log(response);
  return response.data.data;
});

export const acceptReview = createAsyncThunk("getReviews", async (info) => {
  const response = await axios.patch(`/api/v1/review/${info}`, {
    accepted: true,
  });
  console.log(response);
  return response.data.data;
});
export const notAcceptReview = createAsyncThunk("getReviews", async (info) => {
  const response = await axios.patch(`/api/v1/review/${info}`, {
    accepted: false,
  });
  console.log(response);
  return response.data.data;
});

export const rejectReview = createAsyncThunk("getReviews", async (info) => {
  const response = await axios.delete(`/api/v1/review/${info}`, {
    accepted: false,
  });

  return response;
});

export const reviewSlice = createSlice({
  name: "reviw",
  initialState: {
    loading: false,
    tour: null,
    error: null,
  },
});

export default reviewSlice.reducer;
