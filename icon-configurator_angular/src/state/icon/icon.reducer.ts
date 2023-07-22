import {createReducer, on} from "@ngrx/store";
import {IconActions} from "./icon.actions";

export const initialState = {
  editMode: false,
  editIdx: "",
  currentStep: 0,
  icon: "",
  icons: ["home", "mood", "cancel", "settings", "favorite", "savings", "star", "bolt", "map", "terminal",
    "person", "public", "eco", "sunny", "rocket", "rainy", "cloudy", "bedtime", "cookie","psychiatry", "ent", "lunch_dining", "emoji_nature"],
  color: "rgb(0,0,0)",
  fill: 0,
  weight: 400,
};

export const iconReducer = createReducer(
  initialState,
  on(IconActions.reset, (_state) => (initialState)),
  on(IconActions.next, (_state) => {
    let currentStep: number = _state.currentStep;
    if(currentStep<3){
      currentStep++;
    }
    return {..._state, currentStep: currentStep};
  },),
  on(IconActions.previous, (_state) => {
    let currentStep: number = _state.currentStep;
    if(currentStep> 0){
      currentStep--;
    }
    return {..._state, currentStep: currentStep};
  },),
  on(IconActions.setstep, (_state, { step }) => {
    let currentStep: number = _state.currentStep;
    if(step <= 3 && step >= 0){
      currentStep = step;
    }
    return {..._state, currentStep: currentStep};
  },),
  on(IconActions.seteditmode, (_state, { editMode }) => {
    return {..._state, editMode: editMode};
  },),
  on(IconActions.seteditidx, (_state, { editIdx }) => {
    return {..._state, editIdx: editIdx};
  },),
  on(IconActions.seticon, (_state, { icon }) => {
    return {..._state, icon: icon};
  },),
  on(IconActions.setfill, (_state, { fill }) => {
    return {..._state, fill: fill};
  },),
  on(IconActions.setweight, (_state, { weight }) => {
    return {..._state, weight: weight};
  },),
  on(IconActions.setcolor, (_state, { color }) => {
    return {..._state, color: color};
  },),
);

/*
* reset(state) {
            state.currentStep = 0;
            state.icon = "";
            state.color = "rgb(0,0,0)";
            state.fill = 0;
            state.weight = 400;
        },
        next(state) {
            if (state.currentStep < 3) {
                state.currentStep++;
            }
        },
        previous(state) {
            if (state.currentStep > 0) {
                state.currentStep--;
            }
        },
        setStep(state, step){
            if(step <= 3 && step >= 0){
                state.currentStep = step;
            }
        },
        setEditMode(state, editMode) {
            state.editMode = editMode;
        },
        setEditIdx(state, editIdx) {
            state.editIdx = editIdx;
        },
        setIcon(state, icon) {
            state.icon = icon;
        },
        setFill(state, fill) {
            state.fill = fill;
        },
        setWeight(state, weight) {
            state.weight = weight;
        },
        setColor(state, color) {
            state.color = color;
        },*/
