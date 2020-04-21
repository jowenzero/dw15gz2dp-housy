import { ADD_ARTICLE } from "../constants/action-types";

const initialState = {
  data: [{ title: "Mengapa aku dilahirkan" }],
};

const rootReducer = (state = initialState, action) => {
  if (action.type === ADD_ARTICLE) {
    return {
      ...state,
      data: state.data.concat(action.payload),
    };
  }
  return state;
};

export default rootReducer;