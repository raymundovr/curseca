import { combineReducers, configureStore } from "@reduxjs/toolkit";
import catalogueReducer from './features/catalogue/reducers';

const store = configureStore({
    reducer: combineReducers({ catalogue: catalogueReducer }),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
