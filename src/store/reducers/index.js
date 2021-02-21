import { combineReducers } from "redux";
import { GENERATE_GRID } from "../action-types";

const INITIAL_STATE = {
  grid: { numberOfRows: 0, numberOfColumns: 0 },
};

const gridReducer = (state = INITIAL_STATE.grid, action) => {
  const { type, payload } = action;

  switch (type) {
    case GENERATE_GRID:
      return {
        ...state,
        numberOfRows: payload.numberOfRows,
        numberOfColumns: payload.numberOfColumns,
      };
    default:
      return state;
  }
};

export const reducers = combineReducers({
  userGrid: gridReducer,
});
