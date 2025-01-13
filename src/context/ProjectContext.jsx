import React, { useReducer, useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { reducer } from "../reducer/projectReducer";
import {
  CREATE_PROJECT,
  DELETE_PROJECT,
  SET_LOADING,
  SET_ERROR,
  SET_PROJECTS,
  UPDATE_STATUS,
  UPDATE_PROJECT,
} from "../actions/projectActions";
import { db } from "../firebase";
import { auth } from "../services/AuthServices";
import {
  fetchUserProjects,
  updateProjectService,
} from "../services/ProjectServices";

const initialState = {
  projects: [],
  loading: false,
  error: null,
};

const ProjectContext = React.createContext();

const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [user, loading] = useAuthState(auth);

  const createProject = (project) => {
    dispatch({ type: CREATE_PROJECT, payload: { project } });
  };

  const deleteProject = async (id) => {
    dispatch({ type: DELETE_PROJECT, payload: id });
  };

  const updateProject = (projectId, updatedProjectData) => {
    dispatch({
      type: "UPDATE_PROJECT",
      payload: { projectId, updatedProjectData },
    });
  };

  const updateProjectStatus = (projectId, status) => {
    dispatch({
      type: UPDATE_STATUS,
      payload: { projectId, status },
    });
  };

  const setProjects = (projects) => {
    dispatch({ type: SET_PROJECTS, payload: projects });
  };

  const setLoading = (loading) => {
    dispatch({ type: SET_LOADING, payload: loading });
  };

  const setError = (error) => {
    dispatch({ type: SET_ERROR, payload: error });
  };

  useEffect(() => {
    if (loading || !user) return;

    const loadUserProjects = async () => {
      dispatch({ type: SET_LOADING, payload: true });
      try {
        const result = await fetchUserProjects(user.uid);
        if (result.success) {
          setProjects(result.projects);
        } else {
          dispatch({ type: SET_ERROR, payload: result.error });
        }
      } catch (error) {
        dispatch({ type: SET_ERROR, payload: error.message });
      } finally {
        dispatch({ type: SET_LOADING, payload: false });
      }
    };

    loadUserProjects();
  }, [user, loading]);

  return (
    <ProjectContext.Provider
      value={{
        ...state,
        createProject,
        updateProject,
        deleteProject,
        updateProjectStatus,
        setProjects,
        setLoading,
        setError,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  return useContext(ProjectContext);
};

export { ProjectContext, ProjectProvider };
