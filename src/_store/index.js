import { createStore, combineReducers } from "redux";
import articles from "../_reducers";

const rootReducer = combineReducers({
    articles,
});

const store = createStore(rootReducer);

export default store;