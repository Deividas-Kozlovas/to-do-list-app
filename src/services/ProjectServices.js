import { db } from "../firebase";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";

export const createProject = async (projectData, userId) => {
  try {
    const projectRef = await addDoc(collection(db, "projects"), {
      ...projectData,
      userId: userId,
      createdAt: new Date(),
    });

    return { success: true, project: { ...projectData, id: projectRef.id } };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const fetchUserProjects = async (userId) => {
  try {
    const q = query(collection(db, "projects"), where("userId", "==", userId));
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
