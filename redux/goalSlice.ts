import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Goal {
  _id: string;
  title: string;
  description: string;
  category: string;
  subGoals: string[];
}

interface GoalsState {
  goals: Goal[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: GoalsState = {
  goals: [],
  loading: false,
  error: null,
};

const goalSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    // You can add normal reducers here if needed
    setGoals: (state, action) => {
      state.goals = action.payload;
    },
  },
});

export const { setGoals } = goalSlice.actions;
export default goalSlice.reducer;
