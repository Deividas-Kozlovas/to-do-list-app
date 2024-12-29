import { getFirestore, collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';

const db = getFirestore();

// Sukurti Projektą
export const createProject = async (projectData, userId, name, description, startDate, endDate) => {
  try {
    const projectRef = await addDoc(collection(db, "Projektas"), {
      ...projectData,
      userId: userId,
      Pavadinimas: name,
      Aprašymas: description,
      PradžiosData: startDate,
      PabaigosData: endDate,
      Užduotys: [],
    });
    return { success: true, projectRef };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Gauti Projektą
export const getProject = async (projectId) => {
  try {
    const projectRef = doc(db, "Projektas", projectId);
    const projectDoc = await getDoc(projectRef);
    if (projectDoc.exists()) {
      return { success: true, project: { id: projectDoc.id, ...projectDoc.data() } };
    } else {
      return { success: false, error: "Projektas nerastas" };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Gauti Projektus pagal Vartotoją
export const getProjects = async (userId) => {
  try {
    const q = query(collection(db, "Projektas"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const projects = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { success: true, projects };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Atnaujinti Projektą
export const updateProject = async (projectId, updatedData) => {
  try {
    await updateDoc(doc(db, "Projektas", projectId), updatedData);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Ištrinti Projektą
export const deleteProject = async (projectId) => {
  try {
    await deleteDoc(doc(db, "Projektas", projectId));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Sukurti Užduotį
export const createTask = async (projectId, taskData) => {
  try {
    const taskRef = await addDoc(collection(db, `Projektas/${projectId}/Užduotys`), taskData);
    return { success: true, task: { id: taskRef.id, ...taskData } };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Gauti Užduotis pagal Projektą
export const getTasks = async (projectId) => {
  try {
    const tasksSnapshot = await getDocs(collection(db, `Projektas/${projectId}/Užduotys`));
    const tasks = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, tasks };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Atnaujinti Užduotį
export const updateTask = async (taskId, updates, projectId) => {
  try {
    await updateDoc(doc(db, `Projektas/${projectId}/Užduotys`, taskId), updates);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Ištrinti Užduotį
export const deleteTask = async (taskId, projectId) => {
  try {
    await deleteDoc(doc(db, `Projektas/${projectId}/Užduotys`, taskId));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};