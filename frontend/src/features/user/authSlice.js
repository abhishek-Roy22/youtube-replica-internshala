import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// login user
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/users/login', {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

// create user
export const createUser = createAsyncThunk(
  'auth/signup',
  async ({ userName, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/users/signup', {
        userName,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
