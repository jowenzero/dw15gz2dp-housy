import { GET_HOUSES, GET_CITY } from "../constants/action-types";

const initialState = {
  data: [],
  loading: true,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_HOUSES}_PENDING`:
    case `${GET_CITY}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_HOUSES}_FULFILLED`:
    case `${GET_CITY}_FULFILLED`:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case `${GET_HOUSES}_REJECTED`:
    case `${GET_CITY}_REJECTED`:
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