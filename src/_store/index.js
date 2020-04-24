import { createStore, combineReducers, applyMiddleware  } from "redux";
import user from "../_reducers/user";
import house from "../_reducers/house";
import transaction from "../_reducers/transaction";
import { logger, promise } from "../middleware";

const middleware = [logger, promise];

const rootReducer = combineReducers({
    user,
    house,
    transaction,
});

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;