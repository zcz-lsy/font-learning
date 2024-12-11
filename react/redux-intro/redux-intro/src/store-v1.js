import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import customerReducer from "./features/customer/customerSlice";
import accountReducer from "./features/account/accountSlice";

const rootReducer = combineReducers({
  customer: customerReducer,
  account: accountReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
