import {createReducer, on} from "@ngrx/store";
import {AuthActions} from "./auth.actions";
import User from "../../models/user";

let user: Object = JSON.parse(localStorage.getItem('user')!);

export const initialState = user
    ? {status: {loggedIn: true}, user: user}
    : {status: {loggedIn: false}, user: null};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.setloggedin, (_state, { loggedIn }) => {
    return {..._state, status: { loggedIn: loggedIn }};
  }),

  on(AuthActions.setuser, (_state, { user }) => {
    return {..._state, user: user};
  },),

);
