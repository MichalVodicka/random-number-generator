import { GET_ERROR, CLEAR_ERROR } from "../action/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERROR:
      return action.payload;
    default:
      return state;

    case CLEAR_ERROR:
      return {};
  }
}
