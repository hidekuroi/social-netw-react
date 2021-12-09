import { combineReducers, createStore } from "redux";
import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";

let reducers = combineReducers({
    profile: profileReducer,
    messenger: dialogsReducer
});

let store = createStore(reducers);

export default store;