import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../types";

export const userStore = createSlice({
  name: "biolins",
  initialState: {} as UserType,
  reducers: {
    set: (_state, action: PayloadAction<UserType>) => action.payload
  }
})

export const { set } = userStore.actions;
export default userStore.reducer;
