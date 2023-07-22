import {createActionGroup, props} from "@ngrx/store";

export const MessageActions = createActionGroup({
  source: 'messageState',
  events: {
    'setMessage': props<{ msg: string }>(),
    'setError': props<{ error: string }>(),
  },
});
