import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AppState} from "../app.state";
import {IconState} from "./icon.state";

export const selectIcon = (state: AppState) => state.iconState;

export const getIcon = createSelector(
  selectIcon,
  (state: IconState) => state.icon
);

export const getIcons = createSelector(
  selectIcon,
  (state: IconState) => state.icons
);

export const getCurrentStep = createSelector(
  selectIcon,
  (state: IconState) => state.currentStep
);

export const getEditMode = createSelector(
  selectIcon,
  (state: IconState) => state.editMode
);

export const getEditIdX = createSelector(
  selectIcon,
  (state: IconState) => state.editIdx
);

export const getFillBool = createSelector(
  selectIcon,
  (state: IconState) => state.fill
);

export const getFill = createSelector(
  selectIcon,
  (state: IconState) => state.fill
);

export const getWeight = createSelector(
  selectIcon,
  (state: IconState) => state.weight
);

export const getColor = createSelector(
  selectIcon,
  (state: IconState) => state.color
);

export const getFinalIcon = createSelector(
  selectIcon,
  (state: IconState) => {
    return {
      "editIdx": state.editIdx,
      "icon": state.icon,
      "fill": state.fill,
      "color": state.color,
      "weight": state.weight,
    };
  }
);
