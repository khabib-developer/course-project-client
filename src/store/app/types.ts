import { IUser, switchlanguage } from "../../interfaces";

export enum AppActionTypes {
  APP_TOKEN = "APP_TOKEN",
  APP_USER = "APP_USER",
  APP_LOADING = "APP_LOADING",
  APP_THEME = "APP_THEMe",
  APP_ERROR = "APP_ERROR",
  APP_WARNING = "APP_WARNING",
  APP_INFO = "APP_INFO",
  APP_SUCCESS = "APP_SUCCESS",
  APP_TAB = "AOO_TAB",
  APP_LIKED_ITEMS = "APP_LIKED_ITEMS",
  APP_SEARCH = "APP_SEARCH",
  APP_Refresh_COMMENT = "APP_Refresh_COMMENT",
  APP_LANGUAGE = "APP_LANGUAGE",
}

export interface AppRefreshCommentAction {
  type: AppActionTypes.APP_Refresh_COMMENT;
  payload: any;
}

export interface AppSearchAction {
  type: AppActionTypes.APP_SEARCH;
  payload: string;
}

export interface AppLikedItemsAction {
  type: AppActionTypes.APP_LIKED_ITEMS;
  payload: any;
}

export interface AppThemeAction {
  type: AppActionTypes.APP_THEME;
  payload: boolean;
}

export interface AppLanguageAction {
  type: AppActionTypes.APP_LANGUAGE;
  payload: switchlanguage.ru | switchlanguage.en;
}

export interface AppTokenAction {
  type: AppActionTypes.APP_TOKEN;
  payload: string;
}

export interface AppUserAction {
  type: AppActionTypes.APP_USER;
  payload: IUser;
}

export interface AppLoadingAction {
  type: AppActionTypes.APP_LOADING;
  payload: boolean;
}

export interface AppErrorAction {
  type: AppActionTypes.APP_ERROR;
  payload: string | null;
}

export interface AppInfoAction {
  type: AppActionTypes.APP_INFO;
  payload: string | null;
}

export interface AppSuccessAction {
  type: AppActionTypes.APP_SUCCESS;
  payload: string | null;
}

export interface AppWarningAction {
  type: AppActionTypes.APP_WARNING;
  payload: string | null;
}

export interface AppTabAction {
  type: AppActionTypes.APP_TAB;
  payload: number;
}

export type AppAction =
  | AppLikedItemsAction
  | AppThemeAction
  | AppLanguageAction
  | AppTabAction
  | AppTokenAction
  | AppWarningAction
  | AppRefreshCommentAction
  | AppLoadingAction
  | AppErrorAction
  | AppInfoAction
  | AppUserAction
  | AppSearchAction
  | AppSuccessAction;
