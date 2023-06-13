import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';

interface RestaurantState {
  restaurants: any[];
  loading: string;
  error: string;
  restaurant: any[];
}

const initialState: RestaurantState = {
  restaurants: [],
  loading: 'pending' || 'fulfilled' || 'rejected',
  error: '',
  restaurant: [],
};

export const getAllRestaurant:any = createAsyncThunk('restaurant/getAllRestaurant', async () => {
  const response = await axios.get(
    'https://64874eebbeba629727906e9b.mockapi.io/restaurants/restaurants/',
  );
  return response.data;
});

export const getRestaurantById = createAsyncThunk(
  'restaurant/getRestaurantById',
  async (id: string) => {
    const response = await axios.get(
      `https://64874eebbeba629727906e9b.mockapi.io/restaurants/restaurants/${id}`,
    );
    return response.data;
  },
);

export const addRestaurant = createAsyncThunk('restaurant/addRestaurant', async (item: any) => {
  const response = await axios.post(
    'https://64874eebbeba629727906e9b.mockapi.io/restaurants/restaurants/',
    item,
  );
  return response.data;
});

export const updateRestaurant = createAsyncThunk(
  'restaurant/updateRestaurant',
  async (item: any) => {
    const response = await axios.put(
      `https://64874eebbeba629727906e9b.mockapi.io/restaurants/restaurants/${item.id}`,
      {title: item.title, description: item.description},
    );
    return response.data;
  },
);

export const deleteRestaurant = createAsyncThunk(
  'restaurant/deleteRestaurant',
  async (id: string) => {
    const response = await axios.delete(
      `https://64874eebbeba629727906e9b.mockapi.io/restaurants/restaurants/${id}`,
    );
    return response.data;
  },
);

export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllRestaurant.pending, (state, action) => {
      state.loading = 'pending';
    });
    builder.addCase(getAllRestaurant.fulfilled, (state, action) => {
      state.restaurants = action.payload;
      state.loading = 'fulfilled';
    });
    builder.addCase(getAllRestaurant.rejected, (state, action) => {
      state.error = action.error.message || '';
      state.loading = 'rejected';
    });
    builder.addCase(getRestaurantById.pending, (state, action) => {
      state.loading = 'pending';
    });
    builder.addCase(getRestaurantById.fulfilled, (state, action) => {
      state.restaurant = action.payload;
      state.loading = 'fulfilled';
    });
    builder.addCase(getRestaurantById.rejected, (state, action) => {
      state.error = action.error.message || '';
      state.loading = 'rejected';
    });
    builder.addCase(addRestaurant.pending, (state, action) => {
      state.loading = 'pending';
    });
    builder.addCase(addRestaurant.fulfilled, (state, action) => {
      state.restaurants.push(action.payload);
      state.loading = 'fulfilled';
    });
    builder.addCase(addRestaurant.rejected, (state, action) => {
      state.error = action.error.message || '';
      state.loading = 'rejected';
    });
    builder.addCase(updateRestaurant.pending, (state, action) => {
      state.loading = 'pending';
    });
    builder.addCase(updateRestaurant.fulfilled, (state, action) => {
      state.restaurant = action.payload;
      state.restaurants = state.restaurants.map((item: any) =>
        item.id === action.payload.id ? action.payload : item,
      );
      state.loading = 'fulfilled';
    });
    builder.addCase(updateRestaurant.rejected, (state, action) => {
      state.error = action.error.message || '';
      state.loading = 'rejected';
    });
    builder.addCase(deleteRestaurant.pending, (state, action) => {});
    builder.addCase(deleteRestaurant.fulfilled, (state, action) => {
      state.restaurants = state.restaurants.filter(
        (item: any) => item.id !== action.payload.id,
      );
      state.loading = 'fulfilled';
    });
    builder.addCase(deleteRestaurant.rejected, (state, action) => {
      state.error = action.error.message || '';
      state.loading = 'rejected';
    });
  },
});

export const restaurantReducer = restaurantSlice.reducer;