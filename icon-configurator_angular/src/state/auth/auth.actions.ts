import {createActionGroup, emptyProps, props} from "@ngrx/store";
import User from "../../models/user";

export const AuthActions = createActionGroup({
  source: 'authState',
  events: {
    'setLoggedIn': props<{ loggedIn: boolean }>(),
    'setUser': props<{ user: User }>(),
  },
});
