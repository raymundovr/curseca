import { AnyAction } from 'redux';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getCatalogue } from '../../../api';
import { Course } from '../../../common/types';
import { catalogueFetched, fetchCatalogue } from './reducers';

export function* loadCatalogue() {
    try {
        const courses: Course[] = yield call(getCatalogue);
        yield put(catalogueFetched(courses));
    } catch (err) {

    }
}

export default function* catalogueSaga() {
    yield takeEvery(fetchCatalogue.type, loadCatalogue);
}