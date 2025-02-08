import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  activationToken: string;
  accessToken: string;
  user: object;
}

const initialState: AuthState = {
  activationToken: "",
  accessToken: "",
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (
      state,
      action: PayloadAction<{user:object }>
    ) => {
      state.user = action.payload.user;
    },
    userRegistrationDone: (state) => {
        state.user = {};
    },
    userLoggedIn: (
      state,
      action: PayloadAction<{ accessToken: string; user: object }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.accessToken = "";
      state.user = {};
    },
    setAccessToken: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const { userRegistration, userLoggedIn, userLoggedOut, setAccessToken,userRegistrationDone } =
  authSlice.actions;

export default authSlice.reducer;
