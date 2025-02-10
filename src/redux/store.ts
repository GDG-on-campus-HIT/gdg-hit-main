"use client";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authSlice from "./features/auth/authSlice";
import eventSlice from "./features/api/event/eventSlice";
import memberSlice from "./features/api/member/memberSlice";


// Create the Redux store
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    event: eventSlice,
    member: memberSlice,
  },
  devTools: process.env.NODE_ENV !== "production", // Enable dev tools in non-production environments
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Properly typed middleware
});

// Export RootState for use in hooks and components
export type RootState = ReturnType<typeof store.getState>;

// Export AppDispatch for use in components, especially with Thunk actions
export type AppDispatch = typeof store.dispatch;
