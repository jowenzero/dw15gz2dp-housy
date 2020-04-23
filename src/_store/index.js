import { createStore, combineReducers, applyMiddleware  } from "redux";
import user from "../_reducers/user";
import house from "../_reducers/house";
import { logger, promise } from "../middleware";

const middleware = [logger, promise];

const rootReducer = combineReducers({
    user,
    house,
});

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;