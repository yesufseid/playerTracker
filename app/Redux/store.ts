import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import playerReducer from "./playerSilce";
import playerSaga from "./playerSaga";
import playerStatuSlice from "./status/statsSlice";
import statusSaga from "./status/statusSaga";



const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    player:playerReducer,
    Allplayer:playerStatuSlice
    },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(playerSaga);
sagaMiddleware.run(statusSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
