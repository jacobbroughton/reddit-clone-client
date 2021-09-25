import { loadState } from "../utilities/localStorage";

const initialState = loadState("authState") || {};


export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_REQUEST": {
      return {
        ...state,
      };
    }

    case "REGISTER_SUCCESS": {
      return {
        ...state,
      };
    }

    case "LOGIN_REQUEST": {
      return {
        ...state,
      };
    }

    case "LOGIN_SUCCESS": {
      return {
        ...state,
        user: action.payload,
      };
    }

    case "LOGOUT": {
      return {
        ...state,
        user: null,
      };
    }

    default:
      return state;
  }
};
