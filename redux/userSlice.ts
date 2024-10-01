import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authUser {
  id: string;
  username: string;
  email: string;
  // Add other user properties as needed
}

// Define the initial state type
interface UserState {
  authUser: authUser | null; // authUser can be an AuthUser object or null
}

const initialState: UserState = {
  authUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<authUser | null>) => {
      state.authUser = action.payload; // Update authUser with the payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase("RESET_STATE", () => initialState);
  },
});

export const { setAuthUser } = userSlice.actions;
export default userSlice.reducer;
