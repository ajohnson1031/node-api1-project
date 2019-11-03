import { initialState } from "../data";
import {
  HANDLE_SELECT,
  HANDLE_FORM_SUBMISSION,
  FORM_SUBMISSION_FAIL
} from "../actions";

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HANDLE_SELECT:
      return {
        ...state,
        buttonText: action.payload,
        users: null,
        message: { success: null, output: null }
      };

    case HANDLE_FORM_SUBMISSION:
      switch (action.payload.text) {
        case "GET":
        case "DELETE":
        case "GET BY ID":
          return {
            ...state,
            users: action.payload.users,
            buttonText: action.payload.text,
            message: action.payload.message
          };
        default:
          return {
            ...state,
            users: state.users,
            buttonText: action.payload.text,
            message: action.payload.message
          };
      }

    case FORM_SUBMISSION_FAIL:
      return {
        ...state,
        users: null,
        message: { success: false, output: action.payload }
      };
    default:
      return state;
  }
};
