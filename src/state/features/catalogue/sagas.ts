import { call, put, takeEvery } from 'redux-saga/effects';
import { getCatalogue } from '../../../api';
import { Course } from '../../../common/types';
import { catalogueFetched, errorFetchingCatalogue, fetchCatalogue } from './reducers';

export function* loadCatalogue() {
    try {
        const courses: Course[] = yield call(getCatalogue);
        yield put(catalogueFetched(courses));
    } catch (err: any) {
        yield put(errorFetchingCatalogue());
    }
}

export default function* catalogueSaga() {
    yield takeEvery(fetchCatalogue.type, loadCatalogue);
}