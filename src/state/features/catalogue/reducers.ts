import { createSlice, PayloadAction } from "@reduxjs/toolkit"; 
import { Course } from "../../../common/types";
import { RootState } from "../../store";

interface OwnState {
    courses: Course[];
    isLoading: boolean;
}

const initialState: OwnState = {
    courses: [],
    isLoading: false,
};

export const catalogueSlice = createSlice({
    name: 'catalogue',
    initialState,
    reducers: {
        catalogueFetched: (state, action: PayloadAction<Course[]>) => {
            state.isLoading = false;
            state.courses = action.payload;
        },
        fetchCatalogue: (state) => {
            state.isLoading = true;
        },
    },
});

export const courses = (state: RootState) => state.catalogue.courses;

export const { catalogueFetched, fetchCatalogue } = catalogueSlice.actions;

export default catalogueSlice.reducer;
