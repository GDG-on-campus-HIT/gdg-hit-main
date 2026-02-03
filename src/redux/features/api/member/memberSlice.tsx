import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface memberState {
  members: any;
}

const initialState: memberState = {
  members: null,
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
