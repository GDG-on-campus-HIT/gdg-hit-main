import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface memberState {
  members: object;
}

const initialState: memberState = {
  members: [],
};

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    memberList: (state, action: PayloadAction<{ members: object }>) => {
      state.members = action.payload.members;
    },
  },
});

export const { memberList } =
  memberSlice.actions;

export default memberSlice.reducer;
