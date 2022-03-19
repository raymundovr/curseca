import { PayloadAction } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { addToMyCourses, getMyCourses } from "../../../api";
import { Course } from "../../../common/types";
import { addCourseToCurriculum, curriculumError, curriculumUpdated, fetchCurriculum } from "./reducers";


export function* addToCurriculum(action: PayloadAction<string>) {
    try {
        const result: Course[] = yield call(addToMyCourses, action.payload);
        yield put(curriculumUpdated(result));
    } catch (err) {
        yield put(curriculumError());
    }
}

export function* loadCurriculum() {
    try {
        const myCourses: Course[] = yield call(getMyCourses);
        yield put(curriculumUpdated(myCourses));
    } catch (err) {
        yield put(curriculumError());
    }
}

export default function* curriculumSaga() {
    yield takeEvery(addCourseToCurriculum.type, addToCurriculum);
    yield takeLatest(fetchCurriculum.type, loadCurriculum);
}