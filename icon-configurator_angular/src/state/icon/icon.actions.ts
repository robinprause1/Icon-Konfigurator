import {createActionGroup, emptyProps, props} from "@ngrx/store";

export const IconActions = createActionGroup({
  source: 'iconState',
  events: {
    'reset': emptyProps(),
    'next': emptyProps(),
    'previous': emptyProps(),
    'setStep': props<{ step: number }>(),
    'setEditMode': props<{ editMode: boolean }>(),
    'setEditIdx': props<{ editIdx: string }>(),
    'setIcon': props<{ icon: string }>(),
    'setFill': props<{ fill: number }>(),
    'setWeight': props<{ weight: number }>(),
    'setColor': props<{ color: string }>(),
  },
});
