import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
};
const accountSlice = createSlice({
  name: "account",
   initialState,
  reducers: {
    deposit: (state, action) => {
      return {balance:state.balance+ Number(action.payload)}
    },
    withdraw: (state, action) => {
      return {balance:state.balance - Number(action.payload)}
    },
  },
});

export const { deposit, withdraw } = accountSlice.actions;
export default accountSlice;
