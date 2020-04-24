import { GET_TRANSACTIONS, GET_HISTORY, GET_BOOKING } from "../constants/action-types";

const initialState = {
  data: [],
  historyData: [],
  bookingData: [],
  loading: false,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_TRANSACTIONS}_PENDING`:
    case `${GET_HISTORY}_PENDING`:
    case `${GET_BOOKING}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_TRANSACTIONS}_FULFILLED`:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case `${GET_HISTORY}_FULFILLED`:
      return {
        ...state,
        historyData: action.payload.data,
        loading: false,
      };
    case `${GET_BOOKING}_FULFILLED`:
      return {
        ...state,
        bookingData: action.payload.data,
        loading: false,
      };
    case `${GET_TRANSACTIONS}_REJECTED`:
    case `${GET_HISTORY}_REJECTED`:
    case `${GET_BOOKING}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;