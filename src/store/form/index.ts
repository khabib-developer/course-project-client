import { FormAction, FormActionTypes } from "./types";

interface formState {
  name?: string;
  phone: string;
  password: string;
  error: any;
}

const initialState: formState = {
  name: "",
  phone: "",
  password: "",
  error: {},
};

export const formReducer = (
  state = initialState,
  action: FormAction
): formState => {
  switch (action.type) {
    case FormActionTypes.FORM_NAME:
      return { ...state, name: action.payload };
    case FormActionTypes.FORM_PHONE:
      return { ...state, phone: action.payload };
    case FormActionTypes.FORM_PASSWORD:
      return { ...state, password: action.payload };
    case FormActionTypes.FORM_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
