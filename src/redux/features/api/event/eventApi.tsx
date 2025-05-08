import { apiSlice } from "../../api/apiSlice";
import { eventList, registrationList } from "./eventSlice";


interface ProficiencyInput {
  [skill: string]: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuizResult {
  score: number;
  totalQuestions: number;
  feedback: string;
  prerequisites: string[];
}

interface QuizStatusResponse {
  eventId: string;
  userId: string;
  quizGenerated: boolean;
  quizId?: string;
  quizAnswered?: boolean;
  result?: QuizResult;
  message: string;
}

interface QuizDataResponse {
  eventId: string;
  userId: string;
  quizGenerated: boolean;
  quizId?: string;
  questions?: QuizQuestion[];
  priorKnowledge?: { skill: string; proficiency: string[] }[];
  quizAnswered?: boolean;
  result?: QuizResult;
  message: string;
}

interface SubmitQuizRequest {
  quizId: string;
  answers: string[];
}

interface SubmitQuizResponse {
  score: number;
  totalQuestions: number;
  feedback: string;
  prerequisites: string[];
}


export const eventApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    event: builder.query({
        query: () => ({
          url: "events",
          method: "GET",
        }),
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          try {
            const result = await queryFulfilled;
            dispatch(
              eventList({
                event: result.data.events,
              })
            );
          } catch (error: any) {
            console.log(error);
          }
        },
      }),
      eventByID: builder.query({
        query: (id:string) => ({
          url: `events/${id}`,
          method: "GET",
        }),
        async onQueryStarted(arg, { queryFulfilled }) {
          try {
            const result = await queryFulfilled;
            return result.data.event
          } catch (error: any) {
            console.log(error);
          }
        },
      }),

      eventAdd: builder.mutation({
        query: (data:any) => ({
          url: "events",
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

      eventDelete: builder.mutation({
        query: (id: string) => ({
          url: `events/${id}`,
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

      eventUpdate: builder.mutation({
        query: ({ id, ...data }: { id: string; [key: string]: any }) => ({
          url: `events/${id}`,
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

      eventRegister: builder.mutation({
        query: (data:any) => ({
          url: "register-event",
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

      eventGalleryAdd: builder.mutation({
        query: ({ id, galleryImages }: { id: string; [key: string]: any }) => ({
          url: `event-gallery/${id}`,
          method: "POST",
          body: {galleryImages},
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

      eventGalleryUpdate: builder.mutation({
        query: ({
          id,
          galleryImages, // Base64 image data to be added
          imagesToRemove, // IDs of images to be removed
        }: {
          id: string;
          galleryImages?: string[];
          imagesToRemove?: string[];
        }) => ({
          url: `event-gallery/${id}`,
          method: "PUT",
          body: { galleryImages, imagesToRemove },
          credentials: "include" as const,
        }),
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          try {
            const result = await queryFulfilled;
            // Optionally, handle any actions or state updates upon success
          } catch (error: any) {
            console.log(error);
            // Optionally, handle errors or state updates upon failure
          }
        },
      }),

      // admin only
      registrationAllEvent: builder.query({
        query: () => ({
          url: `all-event-registrations`,
          method: "GET",
        }),
        async onQueryStarted(arg, { queryFulfilled,dispatch }) {
          try {
            const result = await queryFulfilled;
            dispatch(
              registrationList({
                registration: result.data.registrations,
              })
            );
          } catch (error: any) {
            console.log(error);
          }
        },
      }),

      registrationByEventId: builder.query({
        query: (id:string) => ({
          url: `events/${id}/registrations`,
          method: "GET",
        }),
        async onQueryStarted(arg, { queryFulfilled }) {
          try {
            const result = await queryFulfilled;
            return result.data.registrations
          } catch (error: any) {
            console.log(error);
          }
        },
      }),

      registrationUpdate: builder.mutation({
        query: ({ id, ...data }: { id: string; [key: string]: any }) => ({
          url: `event-registrations/${id}`,
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

      checkIfEventRegistered: builder.query({
        query: (event:any) => ({
          url: `event-id-register/${event}`,
          method: "GET",
        }),
        async onQueryStarted(arg, { queryFulfilled }) {
          try {
            const result = await queryFulfilled;
            return result.data.registrations
          } catch (error: any) {
            console.log(error);
          }
        },
      }),



      // new apis
      getPriorKnowledge: builder.query({
        query: (id:string) => ({
          url: `events/${id}/prior-knowledge`,
          method: "GET",
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

      checkUserQuizStatus: builder.query({
        query: ({ eventId, userId }) => ({
          url: `events/${eventId}/users/${userId}/quiz-status`,
          method: 'GET',
          credentials: 'include' as const,
        }),
      }),

      
      generateQuiz: builder.mutation<{ quizId: string; questions: QuizQuestion[] }, { eventId: string; proficiencies: ProficiencyInput }>({
        query: ({ eventId, proficiencies }) => ({
          url: `/quiz/${eventId}`,
          method: 'POST',
          credentials: 'include' as const,
          body: proficiencies, // Send proficiencies directly
        }),
        async onQueryStarted(arg, { queryFulfilled }) {
          try {
            await queryFulfilled;
          } catch (error: any) {
            console.error('Error generating quiz:', error);
          }
        },
      }),


      getUserQuiz: builder.query<QuizDataResponse, { eventId: string; userId: string }>({
        query: ({ eventId, userId }) => ({
          url: `events/${eventId}/users/${userId}/quiz`,
          method: 'GET',
          credentials: 'include' as const,
        }),
        async onQueryStarted(arg, { queryFulfilled }) {
          try {
            await queryFulfilled;
          } catch (error: any) {
            console.error('Error retrieving quiz data:', error);
          }
        },
      }),
      submitQuiz: builder.mutation<SubmitQuizResponse, SubmitQuizRequest>({
        query: ({ quizId, answers }) => ({
          url: `/quiz/${quizId}/submit`,
          method: 'POST',
          body: { answers },
        credentials: 'include' as const,
        }),
        async onQueryStarted(arg, { queryFulfilled }) {
          try {
            await queryFulfilled;
          } catch (error: any) {
            console.error('Error submitting quiz:', error);
          }
        },
      }),
  }),
});

export const {
  useEventQuery,
  useEventByIDQuery,
  useEventAddMutation,
  useEventDeleteMutation,
  useEventUpdateMutation,
  useEventRegisterMutation,
  useEventGalleryAddMutation,
  useEventGalleryUpdateMutation,

  useRegistrationAllEventQuery,
  useRegistrationByEventIdQuery,
  useRegistrationUpdateMutation,
  useCheckIfEventRegisteredQuery,


  useGetPriorKnowledgeQuery,
  useGenerateQuizMutation,
  useCheckUserQuizStatusQuery,
  useGetUserQuizQuery,
  useSubmitQuizMutation,
} = eventApi;
