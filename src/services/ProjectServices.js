import { db } from "../firebase";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

export const createProject = async (projectData) => {
  try {
    const projectRef = await addDoc(collection(db, "Projektai"), {
      ...projectData,
      createdAt: new Date(),
    });

    return { success: true, project: { ...projectData, id: projectRef.id } };
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

export const deleteProject = async (projectId) => {
  try {
    await deleteDoc(doc(db, "Projektai", projectId));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
