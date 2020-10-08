import React from "react";
import { reducer } from "./routesReducer";

export const RoutesContext = React.createContext();

const initialState = {
  routesInfo: [],
  directionsInfo: [],
  stopsInfo: [],
  bussesToTrack: [],
};

export const RoutesProvider = (props) => {
  const [routesState, dispatch] = React.useReducer(reducer, initialState);

  return (
    <RoutesContext.Provider value={{ routesState, dispatch }}>
      {props.children}
    </RoutesContext.Provider>
  );
};
