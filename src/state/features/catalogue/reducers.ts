import { createSlice } from "@reduxjs/toolkit"; 
import { Course } from "../../../common/types";

interface OwnState {
    courses: Course[];
}

const initialState: OwnState = {
    courses: [],
};

export const catalogueSlice = createSlice({
    name: 'catalogue',
    initialState,
    reducers: {

    },
});

export default catalogueSlice.reducer;
