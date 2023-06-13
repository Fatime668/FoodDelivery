import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slice/AuthSlice";
import { restaurantSlice } from "./slice/RestaurantSlice";

const store = configureStore({
    reducer: {
        authSlice:AuthSlice,
        restaurantSlice:restaurantSlice.reducer
    }
})

export default store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>