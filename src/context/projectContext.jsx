import React, { useReducer, useContext } from "react";
import { reducer } from "../reducer/projectReducer";
import { CREATE_PROJECT } from "../actions/projectActions";

const initialState = {
  projects: [],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const createProject = (project) => {
    dispatch({ type: CREATE_PROJECT, payload: { project } });
  };

  return (
    <AppContext.Provider value={{ ...state, createProject }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
