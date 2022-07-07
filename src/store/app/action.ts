// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IUser, switchlanguage, switchTheme } from "../../interfaces";
import { AppActionTypes } from "./types";

export const setToken = (payload: string | null) => {
  payload
    ? localStorage.setItem("course-project-token", payload)
    : localStorage.removeItem("course-project-token");
  return {
    type: AppActionTypes.APP_TOKEN,
    payload,
  };
};

export const setTheme = (payload: boolean, syncUpdate: any = null) => {
  return async (dispatch: any) => {
    if (payload !== Boolean(localStorage.getItem("darktheme"))) {
      payload
        ? localStorage.setItem("darktheme", String(payload))
        : localStorage.removeItem("darktheme");
    }
    if (syncUpdate)
      await syncUpdate({
        theme: payload ? switchTheme.dark : switchTheme.light,
      });

    dispatch({
      type: AppActionTypes.APP_THEME,
      payload,
    });
  };
};

export const setLanguage = (
  payload: switchlanguage.en | switchlanguage.ru,
  syncUpdate: any = null
) => {
  return async (dispatch: any) => {
    if (payload !== localStorage.getItem("language")) {
      payload
        ? localStorage.setItem("language", String(payload))
        : localStorage.removeItem("language");
    }
    if (syncUpdate)
      await syncUpdate({
        language: payload,
      });

    dispatch({
      type: AppActionTypes.APP_LANGUAGE,
      payload,
    });
  };
};

export const setUser = (payload: IUser | null) => {
  return (dispatch: any) => {
    if (payload) {
      dispatch({
        type: AppActionTypes.APP_LANGUAGE,
        payload: payload?.language,
      });
      dispatch({
        type: AppActionTypes.APP_THEME,
        payload: switchTheme.dark === payload.theme,
      });
    }
    dispatch({
      type: AppActionTypes.APP_USER,
      payload,
    });
  };
};

export const setSearch = (payload: string, navigate: any, location: any) => {
  if (payload !== "") {
    window.scrollTo({ top: 0 });
    navigate(`${location.pathname}?${payload}`);
  }

  return {
    type: AppActionTypes.APP_SEARCH,
    payload,
  };
};

export const setLoading = (payload: boolean) => {
  return {
    type: AppActionTypes.APP_LOADING,
    payload,
  };
};

export const setLikedItems = (payload: any) => {
  return {
    type: AppActionTypes.APP_LIKED_ITEMS,
    payload,
  };
};

export const setTab = (payload: number) => {
  localStorage.setItem("tab", payload.toString());
  return {
    type: AppActionTypes.APP_TAB,
    payload,
  };
};

export const setError = (payload: string | null) => {
  return {
    type: AppActionTypes.APP_ERROR,
    payload,
  };
};

export const setInfo = (payload: string | null) => {
  return {
    type: AppActionTypes.APP_INFO,
    payload,
  };
};

export const setWarning = (payload: string | null) => {
  return {
    type: AppActionTypes.APP_WARNING,
    payload,
  };
};

export const setSuccess = (payload: string | null) => {
  return {
    type: AppActionTypes.APP_SUCCESS,
    payload,
  };
};
