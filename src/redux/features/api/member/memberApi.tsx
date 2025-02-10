import { apiSlice } from "../../api/apiSlice";
import { memberList } from "./memberSlice";


type RegistrationData = {};

export const memberApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    member: builder.query({
        query: () => ({
          url: "members",
          method: "GET",
        }),
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          try {
            const result = await queryFulfilled;
            dispatch(
              memberList({
                members: result.data.members,
              })
            );
          } catch (error: any) {
            console.log(error);
          }
        },
      }),

      memberAdd: builder.mutation({
        query: (data:any) => ({
          url: "members",
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

      memberDelete: builder.mutation({
        query: (id: string) => ({
          url: `members/${id}`,
          method: "DELETE",
          credentials: "include" as const,
        }),
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          try {
            await queryFulfilled;
          } catch (error: any) {
            console.log(error);
          }
        },
      }),

      memberUpdate: builder.mutation({
        query: ({ id, ...data }: { id: string; [key: string]: any }) => ({
          url: `members/${id}`,
          method: "PUT",
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

  }),
});

export const {
  useMemberQuery,
  useMemberAddMutation,
  useMemberDeleteMutation,
  useMemberUpdateMutation
  
} = memberApi;
