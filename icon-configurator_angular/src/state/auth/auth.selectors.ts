import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AppState} from "../app.state";
import {AuthState} from "./auth.state";

export const selectAuth = (state: AppState) => state.authState;

export const getIsLoggedIn = createSelector(
  selectAuth,
  (state: AuthState) => state.status.loggedIn
);

export const getUser = createSelector(
  selectAuth,
  (state: AuthState) => state.user
);
