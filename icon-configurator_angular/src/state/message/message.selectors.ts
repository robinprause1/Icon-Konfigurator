import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";
import {AuthState} from "../auth/auth.state";
import {MessageState} from "./message.state";

export const selectMessage = (state: AppState) => state.messageState;

export const getMessage = createSelector(
  selectMessage,
  (state: MessageState) => state.message
);

export const getError = createSelector(
  selectMessage,
  (state: MessageState) => state.error
);
