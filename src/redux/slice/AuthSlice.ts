// store/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Auth } from '../../../models/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface InitialStateType{
  loading: 'rejected' | 'fulfilled' | 'pending' | null;
  users: Auth[];
  error: any | null;
  user: Auth | null;
  token: string | null;
  loggedIn:boolean|null|string
}

const initialState: InitialStateType = {
  loading: null,
  users: [],
  error: null,
  user: null,
  token: null,
  loggedIn:false
};
//LoggedIn
export const setLoggedIn = createAsyncThunk(
  'login/setLoggedIn',
  async (loggedIn: boolean) => {
    try {
      await AsyncStorage.setItem('loggedIn', loggedIn.toString());
      return loggedIn;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
);

export const getLoggedIn = createAsyncThunk('login/getLoggedIn', async () => {
  try {
    const loggedIn = await AsyncStorage.getItem('loggedIn');
    if (loggedIn === null) {
      return false;
    }
    return loggedIn;
  } catch (error) {
    console.log(error);
    return false;
  }
});


// login user



export const signInUser = createAsyncThunk(
  'auth/login',
  async (
    {username, password}: Auth,
    {rejectWithValue},
  ) => {
    try {
      const response = await axios.post('http://localhost:3001/api/users/login', {
        username,
        password,
      });
      console.log(response.data.token);
      return response.data.token;
     
      
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  },
);
//register user
export const signupUser = createAsyncThunk(
  'auth/signup',
  async (
    {
      email,
      username,
      password,
     
    }: Auth,
    {rejectWithValue},
  ) => {
    try {
      console.log(email,password,'geldi');
      
      const response = await axios.post(
        'http://localhost:3001/api/users/register',
        {
          email,
          username,
          password,
        },
      );

      return response.data;
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue('Signup failed');
    }
  },
);
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleLogin: state => {
      state.loggedIn = !state.loggedIn;
    },
  },
  extraReducers: (builder: any) => {
    //loggedIn
    builder.addCase(getLoggedIn.fulfilled, (state:InitialStateType, action:any) => {
      state.loggedIn = action.payload;
    });
    builder.addCase(setLoggedIn.fulfilled, (state:InitialStateType, action:any) => {
      state.loggedIn = action.payload;
    });
    //Login
    builder
      .addCase(signInUser.pending, (state: InitialStateType) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(
        signInUser.fulfilled,
         (state: InitialStateType, action: any) => {
          state.loading = 'fulfilled';
          state.error = null;
          state.token = action.payload;
          console.log('oldu');
          
          // kind of added token here ?
          try {
             AsyncStorage.setItem('token', action.payload);
          } catch (error) {
            console.log('Error storing token in AsyncStorage:', error);
          }
        },
      )
      .addCase(signInUser.rejected, (state: InitialStateType, action: any) => {
        state.loading = 'rejected';
        state.error = action.error.message;
        state.token = null;
        console.log('errr');
        
      });
    //Register
    builder
      .addCase(signupUser.pending, (state: any) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state: InitialStateType, action: any) => {
        state.loading = 'fulfilled';
        state.error = null;

        state.token = action.payload;
      })
      .addCase(signupUser.rejected, (state: InitialStateType, action: any) => {
        state.loading = 'rejected';
        state.error = action.error;

        state.error = action.payload || 'Signup failed';
        state.token = null;
      });
  },
});



// export const { logoutUser } = authSlice.actions;
export const {toggleLogin} = authSlice.actions;
export default authSlice.reducer;
