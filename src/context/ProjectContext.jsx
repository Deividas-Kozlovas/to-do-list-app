import React, { useReducer, useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { reducer } from "../reducer/projectReducer";
import {
  CREATE_PROJECT,
  DELETE_PROJECT,
  SET_LOADING,
  SET_ERROR,
  SET_PROJECTS,
} from "../actions/projectActions";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth } from "../services/AuthServices";

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
    try {
      setLoading(true);
      await deleteDoc(doc(db, "Projektai", id));
      dispatch({ type: DELETE_PROJECT, payload: id });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
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
    const fetchUserProjects = async () => {
      if (loading || !user) {
        setProjects([]);
        return;
      }

      setLoading(true);

      try {
        const q = query(
          collection(db, "Projektai"),
          where("userName", "==", user.displayName)
        );
        const querySnapshot = await getDocs(q);

        const projectsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProjects(projectsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProjects();
  }, [user, loading]);

  return (
    <ProjectContext.Provider
      value={{
        ...state,
        createProject,
        deleteProject,
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
