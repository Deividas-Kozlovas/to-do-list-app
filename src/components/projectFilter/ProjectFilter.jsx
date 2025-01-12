import React from "react";
import "./ProjectFilter.scss";

const ProjectFilter = ({ filter, onFilterChange }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div className="project-filter">
      <input
        type="text"
        name="name"
        value={filter.name}
        onChange={handleFilterChange}
        placeholder="Filtruoti pagal pavadinimą"
        className="project-filter__input"
      />
      <select
        name="priority"
        value={filter.priority}
        onChange={handleFilterChange}
        className="project-filter__select"
      >
        <option value="">Filtruoti pagal prioritetą</option>
        <option value="Aukštas">Aukštas</option>
        <option value="Vidutinis">Vidutinis</option>
        <option value="Žemas">Žemas</option>
      </select>
      <select
        name="status"
        value={filter.status}
        onChange={handleFilterChange}
        className="project-filter__select"
      >
        <option value="">Filtruoti pagal statusą</option>
        <option value="true">Atliktas</option>
        <option value="false">Neatliktas</option>
        <option value="all">Visi</option>
      </select>
    </div>
  );
};

export default ProjectFilter;
