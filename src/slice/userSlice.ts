import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface User {
	username: string;
}

const initialState: User = {
	username: "",
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<string>) => {
			state.username = action.payload;
		},
	},
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
