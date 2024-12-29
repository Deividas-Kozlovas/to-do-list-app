import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/project/Project.scss';
import '../../styles/project-view/ViewProject.scss';
import { getProject, getTasks, createTask, updateTask, deleteTask } from '../../services/CRUDServices';

const Project = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDeadline, setTaskDeadline] = useState('');
  const [priority, setPriority] = useState('Vidutinis');
  const [filter, setFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectAndTasks = async () => {
      setIsLoading(true);
      try {
        const projectData = await getProject(projectId);
        if (projectData.success) {
          setProject(projectData.project);
        } else {
          throw new Error(projectData.error || 'Projektas nerastas');
        }
        const tasksData = await getTasks(projectId);
        if (tasksData.success) {
          setTasks(tasksData.tasks);
        } else {
          throw new Error(tasksData.error || 'Nepavyko gauti užduočių');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjectAndTasks();
  }, [projectId]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    const newTask = {
      name: taskName,
      description: taskDescription,
      deadline: taskDeadline,
      priority,
      status: 'Neatlikta',
    };
    const result = await createTask(projectId, newTask);
    if (result.success) {
      setTasks([...tasks, result.task]);
      setTaskName('');
      setTaskDescription('');
      setTaskDeadline('');
    }
  };

  const handleDeleteTask = async (taskId) => {
    const confirmDelete = window.confirm("Ar tikrai norite ištrinti šią užduotį?");
    if (confirmDelete) {
      const result = await deleteTask(taskId, projectId);
      if (result.success) {
        setTasks(tasks.filter(task => task.id !== taskId));
      }
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    const result = await updateTask(taskId, updates, projectId);
    if (result.success) {
      setTasks(tasks.map(task => task.id === taskId ? { ...task, ...updates } : task));
    }
  };

  const handleFilterTasks = (filterBy) => {
    setFilter(filterBy);
  };

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'deadline':
        return task.deadline;
      case 'priority':
        return task.priority;
      case 'status':
        return task.status;
      default:
        return true;
    }
  });

  if (isLoading) return <div>Kraunama...</div>;
  if (error) return <div>Klaida: {error}</div>;
  if (!project) return <div>Projektas nerastas</div>;

  return (
    <div className="project-view">
      <h2>Projektas: {project.name}</h2>
      <button onClick={() => navigate(`/edit-project/${projectId}`)}>Redaguoti projektą</button>

      <form onSubmit={handleCreateTask} className="task-creation-form">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Užduoties pavadinimas"
          required
        />
        <input
          type="text"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Užduoties aprašymas"
        />
        <input
          type="date"
          value={taskDeadline}
          onChange={(e) => setTaskDeadline(e.target.value)}
          required
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Žemas">Žemas</option>
          <option value="Vidutinis">Vidutinis</option>
          <option value="Aukštas">Aukštas</option>
        </select>
        <button type="submit">Pridėti naują užduotį</button>
      </form>

      <div className="task-filters">
        <button onClick={() => handleFilterTasks('deadline')}>Pagal terminą</button>
        <button onClick={() => handleFilterTasks('priority')}>Pagal prioritetą</button>
        <button onClick={() => handleFilterTasks('status')}>Pagal būseną</button>
        <button onClick={() => handleFilterTasks('')}>Visos užduotys</button>
      </div>

      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task.id} className="task-item">
            <h3>{task.name}</h3>
            <p>{task.description}</p>
            <p>{task.deadline}</p>
            <p>Prioritetas: {task.priority}</p>
            <p>Būsena: {task.status}</p>
            <button onClick={() => handleUpdateTask(task.id, { status: 'Atlikta' })}>Pažymėti kaip atliktą</button>
            <button onClick={() => handleUpdateTask(task.id, { name: prompt('Naujas pavadinimas:', task.name) })}>Redaguoti</button>
            <button onClick={() => handleDeleteTask(task.id)}>Ištrinti</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Project;