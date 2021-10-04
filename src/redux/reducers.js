// Types
import {
  UPDATE_DATA,
} from "./types";
import { FLUSH } from "redux-persist";

const INITIAL_STATE = {
  data: { },
};

export const dataReducer = (state = INITIAL_STATE.data, action) => {
  switch (action.type) {
    case UPDATE_DATA:
      return Object.assign({}, state, action.payload);
    case FLUSH:
      return INITIAL_STATE.data;
    default:
      return state;
  }
};



