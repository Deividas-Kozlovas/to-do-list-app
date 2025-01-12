import { db } from "../firebase";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export const createProjectService = async (projectData, userId) => {
  if (!userId) {
    return {
      success: false,
      error: "userId is required and cannot be undefined",
    };
  }

  try {
    const projectRef = await addDoc(collection(db, "Projektai"), {
      ...projectData,
      userId,
      createdAt: new Date(),
    });

    return {
      success: true,
      project: { ...projectData, id: projectRef.id, userId },
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const fetchUserProjects = async (userId) => {
  if (!userId) {
    return { success: false, error: "userId is required" };
  }

  try {
    const q = query(collection(db, "Projektai"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const projects = [];
    querySnapshot.forEach((doc) => {
      projects.push({ id: doc.id, ...doc.data() });
    });

    return { success: true, projects };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteProject = async (projectId) => {
  try {
    await deleteDoc(doc(db, "Projektai", projectId));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateProjectService = async (projectId, updatedProjectData) => {
  try {
    await updateDoc(doc(db, "Projektai", projectId), updatedProjectData);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
