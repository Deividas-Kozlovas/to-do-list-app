import { db } from "../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

export const createProject = async (projectData, userId) => {
  try {
    const project = await addDoc(collection(db, "project"), {
      ...projectData,
      userId: userId,
      createdAt: new Date(),
    });
    return { success: true, project };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
