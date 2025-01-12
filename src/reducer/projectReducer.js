import {
  CREATE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
  SET_LOADING,
  SET_ERROR,
  SET_PROJECTS,
} from "../actions/projectActions";

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_PROJECTS:
      return { ...state, projects: action.payload };
    case CREATE_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload.project],
      };
    case UPDATE_PROJECT:
      return {
        ...state,
        projects: state.projects.map(project =>
        project.id === action.payload.id ? { ...project, ...action.payload } : project
        ),
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.id !== action.payload
        ),
      };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
