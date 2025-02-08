import { apiSlice } from "../api/apiSlice";
import {
  userLoggedIn,
  userLoggedOut,
  userRegistration,
  userRegistrationDone,
} from "./authSlice";

type RegistrationResponse = {
  message: string;
  activationToken: string;
  user: User;
};
type User = {
  name: string;
  email: string;
  password: string;
};

type RegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "registration",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegistration({
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    activation: builder.mutation({
      query: ({ name,email,password, activation_code }) => ({
        url: "activate-user",
        method: "POST",
        body: {
          activation_code,
          name,
          email,
          password
        },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userRegistrationDone());
          dispatch(
            userLoggedIn({
              accessToken: result.data.activationToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    login: builder.mutation({
      query: ({ email, password, role }) => ({
        url: "login",
        method: "POST",
        body: {
          email,
          password,
          role,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
    
          // Save tokens in localStorage
          localStorage.setItem('access_token', result.data.accessToken);
          localStorage.setItem('refresh_token', result.data.refreshToken);
    
          // Optionally store expiry times if provided
          localStorage.setItem('access_token_expiry', Date.now() + result.data.expiresIn.accessToken);
          localStorage.setItem('refresh_token_expiry', Date.now() + result.data.expiresIn.refreshToken);
    
          // Dispatch user login action with the user and access token
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    socialAuth: builder.mutation({
      query: ({ email, name, avatar }) => ({
        url: "social-auth",
        method: "POST",
        body: {
          email,
          name,
          avatar,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    logOut: builder.mutation({
      query: () => ({
        url: "logout",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          dispatch(userLoggedOut());
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    userUpdate: builder.mutation({
      query: (data) => ({
        url: `update-user-info`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg , { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useSocialAuthMutation,
  useUserUpdateMutation,
  useLogOutMutation
} = authApi;
