import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import catalogueReducer from './features/catalogue/reducers';
import catalogueSaga from "./features/catalogue/sagas";
import curriculumReducer from "./features/curriculum/reducers";
import curriculumSaga from "./features/curriculum/sagas";

const sagaMiddleWare = createSagaMiddleware();

const store = configureStore({
    reducer: combineReducers({ catalogue: catalogueReducer, curriculum: curriculumReducer }),
    middleware: [sagaMiddleWare],
});

sagaMiddleWare.run(catalogueSaga);
sagaMiddleWare.run(curriculumSaga);

export type RootState = ReturnType<typeof store.getState>;

export default store;
