import { createSlice, PayloadAction } from "@reduxjs/toolkit"; 
import { Course } from "../../../common/types";
import { RootState } from "../../store";

interface OwnState {
    courses: Course[];
    hasError: boolean;
    isLoading: boolean;
}

const initialState: OwnState = {
    courses: [],
    hasError: false,
    isLoading: false,
};

export const catalogueSlice = createSlice({
    name: 'catalogue',
    initialState,
    reducers: {
        catalogueFetched: (state, action: PayloadAction<Course[]>) => {
            state.isLoading = false;
            state.hasError = false;
            state.courses = action.payload;
        },
        errorFetchingCatalogue: (state) => {
            state.isLoading = false;
            state.hasError = true;
        },
        fetchCatalogue: (state) => {
            state.isLoading = true;
            state.hasError = false;
        },
    },
});

export const courses = (state: RootState) => state.catalogue.courses;
export const isLoading = (state: RootState) => state.catalogue.isLoading;
export const hasError = (state: RootState) => state.catalogue.hasError;

export const { catalogueFetched, errorFetchingCatalogue, fetchCatalogue } = catalogueSlice.actions;

export default catalogueSlice.reducer;
