import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk("loginUser", async (infos) => {
  const request = await axios.post("/api/v1/user/login", infos);
  const response = await request.data.data;
  console.log(request);
  if (request.status === 200) return response;
});
export const signupUser = createAsyncThunk("signUser", async (infos) => {
  const request = await axios.post("/api/v1/user/signup", infos);
  const response = await request.data.data;
  console.log(response);
  console.log("from axios");

  return response;
});
export const logoutUser = createAsyncThunk("logoutUser", async () => {
  const respone = await axios.get("/api/v1/user/logout");
  return respone;
});

export const updateUser = createAsyncThunk("updateUser", async (infos) => {
  const request = await axios.patch("/api/v1/user", {
    email: infos.email,
    username: infos.username,
    profileImage: infos.profileImage,
  });
  const response = await request.data.data;
  return response;
});
export const deleteUser = createAsyncThunk("deleteUser", async (id) => {
  const request = await axios.delete(`/api/v1/user/${id}`);
  const respone = await request.data;
  return respone;
});

export const getUsers = createAsyncThunk("getUsers", async (info) => {
  console.log(info);
  const response = await axios.get(`/api/v1/user?limit=${info}&role=User`);
  console.log(info);
  return response.data.data;
});
export const getUser = createAsyncThunk("getUser", async (info) => {
  console.log(info);
  const response = await axios.get(`/api/v1/user/${info}`);
  console.log(info);
  return response.data.data;
});

export const userAuthSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        (state.loading = true), (state.user = null), (state.error = null);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        (state.loading = false),
          (state.user = action.payload),
          (state.error = null);
      })
      .addCase(loginUser.rejected, (state, action) => {
        (state.loading = false),
          (state.user = null),
          console.log(action.error.message);
        state.error =
          action.error.message === "Request failed with status code 401"
            ? "signup failed, please check your informations and try again"
            : action.error.message;
      })
      .addCase(signupUser.pending, (state) => {
        (state.loading = true), (state.user = null), (state.error = null);
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        (state.loading = false),
          (state.user = action.payload),
          (state.error = null);
      })
      .addCase(signupUser.rejected, (state, action) => {
        (state.loading = false),
          (state.user = null),
          console.log(action.error.message);
        state.error =
          action.error.message === "Request failed with status code 401"
            ? "signup failed, please check your informations and try again"
            : action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        (state.loading = true), (state.user = null), (state.error = null);
      })
      .addCase(logoutUser.fulfilled, (state) => {
        (state.loading = false), (state.user = null), (state.error = null);
      })
      .addCase(logoutUser.rejected, (state) => {
        (state.loading = false), (state.user = null), (state.error = null);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        (state.loading = false),
          (state.user = action.payload),
          (state.error = null);
      });
  },
});

export default userAuthSlice.reducer;
