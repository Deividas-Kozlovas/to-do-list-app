export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_PROJECTS":
      return { ...state, projects: action.payload };
    case "CREATE_PROJECT":
      return { ...state, projects: [...state.projects, action.payload] };
    case "DELETE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.id !== action.payload
        ),
      };
    case "UPDATE_STATUS":
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === action.payload.projectId
            ? { ...project, status: action.payload.status }
            : project
        ),
      };
    default:
      return state;
  }
};
