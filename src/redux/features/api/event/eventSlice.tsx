import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface eventState {
  event: Array<object>;
  registration: Array<object>;
}

const initialState: eventState = {
  event: [],
  registration: [],
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    eventList: (state, action: PayloadAction<{ event: Array<object> }>) => {
      state.event = action.payload.event;
    },
    registrationList: (
      state,
      action: PayloadAction<{ registration: Array<object> }>
    ) => {
      state.registration = action.payload.registration;
    },
  },
});

export const { eventList, registrationList } = eventSlice.actions;

export default eventSlice.reducer;
