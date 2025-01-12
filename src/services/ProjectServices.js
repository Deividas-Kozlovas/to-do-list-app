import { db } from "../firebase";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";

export const createProject = async (projectData) => {
  try {
    const today = new Date();
    const endDate = new Date(projectData.endDate);
    const deadlinePassed = today > endDate;

    const projectRef = await addDoc(collection(db, "Projektai"), {
      ...projectData,
      createdAt: new Date(),
      status: false, 
      deadline: deadlinePassed
    });

    return { success: true, project: { ...projectData, id: projectRef.id , deadline: deadlinePassed} };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const fetchUserProjects = async (userName) => {
  try {
    const q = query(
      collection(db, "Projektai"),
      where("userName", "==", userName)
    );
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

export const updateProject = async (projectId, projectData) => {
  try {
    const projectRef = doc(db, "Projektai", projectId);
    await updateDoc(projectRef, {
      ...projectData,
      deadline: new Date() > new Date(projectData.endDate)
    });
    return { success: true, project: { ...projectData, id: projectId } };
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
