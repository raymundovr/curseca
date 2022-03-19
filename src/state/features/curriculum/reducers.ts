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

export const curriculumSlice = createSlice({
    name: 'curriculum',
    initialState,
    reducers: {
        addCourseToCurriculum: (state, action: PayloadAction<string>) => {
            state.isLoading = true;
        },
        curriculumUpdated: (state, action: PayloadAction<Course[]>) => {
            state.isLoading = false;
            state.hasError = false;
            state.courses = action.payload;
        },
        curriculumError: (state) => {
            state.isLoading = false;
            state.hasError = true;
        },
        fetchCurriculum: (state) => {
            state.isLoading = true;
        },
    }
});

export const { addCourseToCurriculum, curriculumUpdated, curriculumError, fetchCurriculum } = curriculumSlice.actions;

export const curriculumCourses = (state: RootState) => state.curriculum.courses;
export const curriculumIsLoading = (state: RootState) => state.curriculum.isLoading;
export const curriculumHasError = (state: RootState) => state.curriculum.hasError;
export const curriculumCoursesCount = (state: RootState) => state.curriculum.courses.length;

export default curriculumSlice.reducer;
