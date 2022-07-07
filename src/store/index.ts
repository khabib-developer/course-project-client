import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk'
import { appReducer } from "./app";
import { formReducer } from "./form";

const rootreducer = combineReducers({
    app: appReducer,
    form: formReducer
})

export const store = createStore((rootreducer), applyMiddleware(thunk))

export type RootState = ReturnType<typeof rootreducer>  