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
          
          // Save tokens in localStorage for client-side persistence
          localStorage.setItem('access_token', result.data.accessToken);
          localStorage.setItem('refresh_token', result.data.refreshToken);
          localStorage.setItem('access_token_expiry', Date.now() + (result.data.expiresIn?.accessToken || 1200000));
          localStorage.setItem('refresh_token_expiry', Date.now() + (result.data.expiresIn?.refreshToken || 7200000));
          
          // Set tokens in cookies for middleware recognition
          // For localhost development, set cookies without domain (exact host match)
          if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
            const accessTokenExpiry = new Date(Date.now() + (result.data.expiresIn?.accessToken || 1200000));
            const refreshTokenExpiry = new Date(Date.now() + (result.data.expiresIn?.refreshToken || 7200000));
            
            // Development cookies - no domain, just path
            document.cookie = `access_token=${result.data.accessToken}; path=/; expires=${accessTokenExpiry.toUTCString()}; SameSite=Lax`;
            document.cookie = `refresh_token=${result.data.refreshToken}; path=/; expires=${refreshTokenExpiry.toUTCString()}; SameSite=Lax`;
          }
          
          // API response already sets cookies via Set-Cookie headers with credentials: include
          dispatch(userRegistrationDone());
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
    
          // Save tokens in localStorage for client-side persistence
          localStorage.setItem('access_token', result.data.accessToken);
          localStorage.setItem('refresh_token', result.data.refreshToken);
          localStorage.setItem('access_token_expiry', Date.now() + (result.data.expiresIn?.accessToken || 1200000));
          localStorage.setItem('refresh_token_expiry', Date.now() + (result.data.expiresIn?.refreshToken || 7200000));
    
          // Set tokens in cookies for middleware recognition
          // For localhost development, set cookies without domain (exact host match)
          // For production, API response should set cookies via Set-Cookie headers
          if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
            const accessTokenExpiry = new Date(Date.now() + (result.data.expiresIn?.accessToken || 1200000));
            const refreshTokenExpiry = new Date(Date.now() + (result.data.expiresIn?.refreshToken || 7200000));
            
            // Development cookies - no domain, just path
            document.cookie = `access_token=${result.data.accessToken}; path=/; expires=${accessTokenExpiry.toUTCString()}; SameSite=Lax`;
            document.cookie = `refresh_token=${result.data.refreshToken}; path=/; expires=${refreshTokenExpiry.toUTCString()}; SameSite=Lax`;
          }
    
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
          
          // Save tokens in localStorage for client-side persistence
          localStorage.setItem('access_token', result.data.accessToken);
          localStorage.setItem('refresh_token', result.data.refreshToken);
          localStorage.setItem('access_token_expiry', Date.now() + (result.data.expiresIn?.accessToken || 1200000));
          localStorage.setItem('refresh_token_expiry', Date.now() + (result.data.expiresIn?.refreshToken || 7200000));

          // Set tokens in cookies for middleware recognition
          // For localhost development, set cookies without domain (exact host match)
          if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
            const accessTokenExpiry = new Date(Date.now() + (result.data.expiresIn?.accessToken || 1200000));
            const refreshTokenExpiry = new Date(Date.now() + (result.data.expiresIn?.refreshToken || 7200000));
            
            // Development cookies - no domain, just path
            document.cookie = `access_token=${result.data.accessToken}; path=/; expires=${accessTokenExpiry.toUTCString()}; SameSite=Lax`;
            document.cookie = `refresh_token=${result.data.refreshToken}; path=/; expires=${refreshTokenExpiry.toUTCString()}; SameSite=Lax`;
          }
    
          // API response already sets cookies via Set-Cookie headers with credentials: include
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
          // API request with credentials: include will trigger server-side cookie clearing
          await queryFulfilled;
          
          // Clear tokens from localStorage
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('access_token_expiry');
          localStorage.removeItem('refresh_token_expiry');
          
          // Clear cookies from JavaScript for development environments
          if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
            document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax';
            document.cookie = 'refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax';
          }
          
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
