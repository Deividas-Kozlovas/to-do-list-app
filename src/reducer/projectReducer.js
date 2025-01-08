export const CREATE_PROJECT = "CREATE_PROJECT";

export const reducer = (state, action) => {
  switch (action.type) {
    case CREATE_PROJECT:
      return {
        ...state,
        projects: [...state.projects, action.payload.project],
      };
    default:
      throw new Error(`No match for ${action.type}`);
  }
};
