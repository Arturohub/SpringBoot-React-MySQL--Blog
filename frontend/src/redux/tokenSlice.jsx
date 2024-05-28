
import { createSlice } from "@reduxjs/toolkit";

function checkTokenCookie() {
  return document.cookie.includes("Arturo-token");
}

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    hasToken: checkTokenCookie(),
  },
  reducers: {
    setHasToken: (state, action) => {
      state.hasToken = action.payload;
    },
  },
});

export const { setHasToken } = tokenSlice.actions;
export default tokenSlice.reducer;
