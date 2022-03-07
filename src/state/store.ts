import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import catalogueReducer from './features/catalogue/reducers';
import catalogueSaga from "./features/catalogue/sagas";

const sagaMiddleWare = createSagaMiddleware();

const store = configureStore({
    reducer: combineReducers({ catalogue: catalogueReducer }),
    middleware: [sagaMiddleWare],
});

sagaMiddleWare.run(catalogueSaga);

export type RootState = ReturnType<typeof store.getState>;

export default store;
