import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authAdmin {
  id: string;
  username: string;
  email: string;
  // Add other user properties as needed
}

// Define the initial state type
interface AdminState {
    authAdmin: authAdmin | null; // authUser can be an AuthUser object or null
}

const initialState: AdminState = {
    authAdmin: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAuthAdmin: (state, action: PayloadAction<authAdmin | null>) => {
      state.authAdmin = action.payload; // Update authUser with the payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase("RESET_STATE", () => initialState);
  },
});

export const { setAuthAdmin } = adminSlice.actions;
export default adminSlice.reducer;
