import { GET_USER, GET_USERS } from "../constants/action-types";

const initialState = {
  data: [],
  multiData: [],
  loading: true,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_USER}_PENDING`:
    case `${GET_USERS}_PENDING`:
      return {
        ...state,
        loading: true,
      };
    case `${GET_USER}_FULFILLED`:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    case `${GET_USERS}_FULFILLED`:
      return {
        ...state,
        multiData: action.payload.data,
        loading: false,
      };
    case `${GET_USER}_REJECTED`:
    case `${GET_USERS}_REJECTED`:
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