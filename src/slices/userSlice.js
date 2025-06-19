import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        id: "",
        bio: "",
        birthDay: "",
        profilePicture: "",
        firstName: "",
        lastName: "",
        username: "",
        email: "",
    },
    reducers: {
        setUser: (state, action) => {
            console.log(action.payload);

            state.id = action.payload.id;
            state.bio = action.payload.bio;
            state.birthDay = action.payload.birthDay;
            state.profilePicture = action.payload.profilePicture;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.username = action.payload.username;
            state.email = action.payload.email;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
