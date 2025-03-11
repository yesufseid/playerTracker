import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import playerReducer from "./playerSilce";
import playerSaga from "./playerSaga";



const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    player:playerReducer,
    },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(playerSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
