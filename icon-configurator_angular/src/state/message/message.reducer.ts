import {createReducer, on} from "@ngrx/store";
import {MessageActions} from "./message.actions";

export const initialState = {
  message: '',
  error: ''
};

export const messageReducer = createReducer(
  initialState,
  on(MessageActions.setmessage, (_state, { msg }) => ({..._state, message: msg})),
  on(MessageActions.seterror, (_state, { error }) => ({..._state, error: error})),
);
