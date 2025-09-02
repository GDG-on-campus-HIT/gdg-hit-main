import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { setAccessToken, userLoggedIn, userLoggedOut } from "../auth/authSlice";
import { RootState } from "@/redux/store";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query";

// Define the base query with token handling
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state?.auth.accessToken;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
  credentials: "include", // Include cookies in requests
});

// Extend the base query to handle reauthentication
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // Token expired, try to refresh it
    const refreshResult = await baseQuery(
      { url: "/refresh-token" },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      // Store the new token
      api.dispatch(
        setAccessToken({
          accessToken: (refreshResult.data as { accessToken: string })
            .accessToken,
        })
      );

      // Retry the original query with the new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // If refresh also fails, log out the user
      api.dispatch(userLoggedOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ['Quiz'],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    loadUser: builder.query({
      query: (data) => ({
        url: "me",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
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

    loadTestimonial: builder.query({
      query: () => ({
        url: "testimonial",
        method: "GET",
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    contactUs: builder.mutation({
      query: (data:any) => ({
        url: "contact",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (error: any) {
          console.log(error);
        }
      },
    }),


    recruitmentFormSubmission: builder.mutation({
      query: (data:any) => ({
        url: "recruitmentFormSubmission",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    studentRegistration: builder.mutation({
      query: (data:any) => ({
        url: "student-registration",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    // New endpoint for student form submissions using Form API
    submitStudentForm: builder.mutation({
      query: (data: any) => ({
        url: "forms/submit-student-form",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (error: any) {
          console.log(error);
        }
      },
    }),


    isAlreadyRegistered: builder.query({
      query: () => ({
        url: "isAlreadyRegistered",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
   

    
  }),
});

export const { useLoadUserQuery, useLoadTestimonialQuery, useContactUsMutation , useRecruitmentFormSubmissionMutation, useStudentRegistrationMutation, useSubmitStudentFormMutation, useIsAlreadyRegisteredQuery} = apiSlice;
