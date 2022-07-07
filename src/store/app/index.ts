import { IUser, switchlanguage } from "../../interfaces";
import { AppAction, AppActionTypes } from "./types";

interface appState {
  server: string;
  token: string | null;
  user: null | IUser;
  loading: boolean;
  tab: number;
  search: string;
  likedItems: any;
  darkTheme: boolean | number;
  language: switchlanguage.ru | switchlanguage.en;
  info: string | null;
  warning: string | null;
  success: string | null;
  error: string | null;
}

const initialState: appState = {
  server: "http://localhost:4000",
  token: localStorage.getItem("course-project-token"),
  user: null,
  likedItems: {},
  darkTheme: Boolean(localStorage.getItem("darktheme")),
  loading: false,
  search: "",
  language:
    (localStorage.getItem("language") as
      | switchlanguage.en
      | switchlanguage.ru) || switchlanguage.en,
  tab: Number(localStorage.getItem("tab")) || 1,
  success: null,
  warning: null,
  info: null,
  error: null,
};

export const appReducer = (
  state = initialState,
  action: AppAction
): appState => {
  switch (action.type) {
    case AppActionTypes.APP_USER:
      return { ...state, user: action.payload };
    case AppActionTypes.APP_TOKEN:
      return { ...state, token: action.payload };
    case AppActionTypes.APP_LOADING:
      return { ...state, loading: action.payload };

    case AppActionTypes.APP_LIKED_ITEMS:
      return { ...state, likedItems: action.payload };

    case AppActionTypes.APP_THEME:
      return { ...state, darkTheme: action.payload };

    case AppActionTypes.APP_LANGUAGE:
      return { ...state, language: action.payload };

    case AppActionTypes.APP_TAB:
      return { ...state, tab: action.payload };

    case AppActionTypes.APP_INFO:
      return { ...state, info: action.payload };

    case AppActionTypes.APP_SEARCH:
      return { ...state, search: action.payload };

    case AppActionTypes.APP_WARNING:
      return { ...state, warning: action.payload };

    case AppActionTypes.APP_SUCCESS:
      return { ...state, success: action.payload };
    case AppActionTypes.APP_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
