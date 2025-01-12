import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProjectTable.scss";

const ProjectTable = ({
  filteredProjects,
  handleDeleteClick,
  handleToggleStatus,
  projectLoading,
  projectError,
}) => {
  const navigate = useNavigate();

  if (projectLoading) {
    return <p className="home__projects-loading">Kraunama...</p>;
  }

  if (projectError) {
    return <p className="home__projects-error">{projectError}</p>;
  }

  return (
    <div className="home__projects-table-wrapper">
      <table className="home__projects-list">
        <thead>
          <tr>
            <th>Pavadinimas</th>
            <th>Aprašymas</th>
            <th>Pradžios data</th>
            <th>Pabaigos data</th>
            <th>Prioritetas</th>
            <th>Veiksmai</th>
          </tr>
        </thead>
        <tbody>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.description || "Nenurodyta"}</td>
                <td>{project.startDate}</td>
                <td>{project.endDate}</td>
                <td>{project.priority}</td>
                <td>
                  <button
                    onClick={() => navigate(`/edit-project/${project.id}`)}
                  >
                    Keisti
                  </button>
                  <button onClick={() => handleDeleteClick(project.id)}>
                    Ištrinti
                  </button>
                  <button onClick={() => handleToggleStatus(project)}>
                    {project.status ? "Atliktas" : "Neatliktas"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Kol kas projektų nėra.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
